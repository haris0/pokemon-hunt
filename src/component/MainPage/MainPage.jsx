import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_POKEMONS } from '../../queries';
import { Container } from '@chakra-ui/react';

const MainPage = () => {
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
        <Container {...container_style} >
          {data.pokemons.results.map(pokemon => (
            <Link to={"/detail/" + pokemon.name} key={pokemon.name}>
              <div> {pokemon.name} </div>
            </Link>
          ))}
        </Container>
      }
    </div>
  );
};

export default MainPage;

const container_style = {
  maxW:"960px",
  marginTop:"85px",
  marginBottom:"16px"
}