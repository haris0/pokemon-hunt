import React from 'react';
import { shallow } from 'enzyme';
import DetailPage from './DetailPage';
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

describe('Detail Page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <ApolloProvider client={client}>
        <MyPokemonContexProvider>
          <DetailPage />
        </MyPokemonContexProvider>
      </ApolloProvider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  })

  it('Render Detail Page without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
})