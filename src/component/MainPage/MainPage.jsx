import React, {lazy} from 'react';
import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from '../../queries';
import { Container,
         SimpleGrid,
         Heading,
         Skeleton,
} from '@chakra-ui/react';

const CardPokemon = lazy(()=> import('./child/CardPokemon'));

const MainPage = () => {
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: {
        limit: 20,
        offset: 1,
      },
  });

  return (
    <Container {...container_style} >
      <Heading {...heading_style}>Wild Pokemon</Heading>
      {loading &&
        <SimpleGrid columns={[2, null, 5]} marginTop="30px" spacing="20px">
          <Skeleton height="100px" />
          <Skeleton height="100px" />
          <Skeleton height="100px" />
          <Skeleton height="100px" />
          <Skeleton height="100px" />
        </SimpleGrid>
      }
      {error && 
        <div>
          Error Load Data
        </div>
      }
      {!loading && data &&
        <div>
          <SimpleGrid columns={[2, null, 5]} {...grid_style}>
            {data.pokemons.results.map(pokemon => (
              <CardPokemon key={pokemon.name} pokemon={pokemon}></CardPokemon>
            ))}
          </SimpleGrid>
        </div>
      }
    </Container>
  );
};

export default MainPage;

const container_style = {
  maxW:"960px",
  marginTop:"85px",
  marginBottom:"16px"
}

const heading_style = {
  as:"h2",
  color:"#2E3131",
  textAlign:"center"
}

const grid_style = {
  padding:"15px",
  marginTop:"20px",
  spacing:"20px"
}
