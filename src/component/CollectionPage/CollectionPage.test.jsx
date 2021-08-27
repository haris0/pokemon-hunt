import React from 'react';
import { shallow } from 'enzyme';
import CollectionPage from './CollectionPage';
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

describe('Collection Page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <ApolloProvider client={client}>
        <MyPokemonContexProvider>
          <CollectionPage />
        </MyPokemonContexProvider>
      </ApolloProvider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  })

  it('Render Collection Page without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
})