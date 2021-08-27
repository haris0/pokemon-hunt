import React from 'react';
import { shallow } from 'enzyme';
import Page404 from './Page404';
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

describe('Page 404', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <ApolloProvider client={client}>
        <MyPokemonContexProvider>
          <Page404 />
        </MyPokemonContexProvider>
      </ApolloProvider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  })

  it('Render Page 404 without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
})