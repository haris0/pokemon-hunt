import React from 'react';
import { shallow } from 'enzyme';
import MainPage from './MainPage';
import MyPokemonContexProvider from '../../context'
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri:'https://graphql-pokeapi.vercel.app/api/graphql'
  })
});

describe('Main Page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <ApolloProvider client={client}>
        <MyPokemonContexProvider>
          <MainPage />
        </MyPokemonContexProvider>
      </ApolloProvider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  })

  it('Render Main Page without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
})