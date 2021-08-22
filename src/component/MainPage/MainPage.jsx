import React from 'react';
import { useQuery } from '@apollo/client';

import {GET_POKEMONS} from '../../queries'

function MainPage() {
  
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: {
        limit: 20,
        offset: 1,
      },
  });

  return (
    <div>
      {loading && 
        <div>Loading...</div>
      }
      {error && 
        <div>
          Error Load Data
        </div>
      }
      {!loading && data && 
        data.pokemons.results.map(pokemon => (
          <div key={pokemon.name}> {pokemon.name} </div>
        ))
      }

    </div>
  );
}

export default MainPage;