import React, { lazy } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from '../../queries';
import { 
  Container,
  SimpleGrid,
  Heading,
  Skeleton,
  Flex,
  Box,
  IconButton,
  Spacer,
} from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpIcon} from '@chakra-ui/icons';
import { useMyPokemonList } from '../../context';

const CardPokemon = lazy(()=> import('./child/CardPokemon'));
const CollectionButton = lazy(()=> import('./child/CollectionButton'));

const scrollTop = () =>{
  window.scrollTo({top: 0, behavior: 'smooth'});
};

const MainPage = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_POKEMONS, {
    variables: {
        limit: 20,
        offset: 1,
      },
  });

  const handleLoadMore =()=>{
    fetchMore({
      variables: { 
        limit: 20,
        offset: data.pokemons.nextOffset,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        console.log(previousResult)
        console.log(fetchMoreResult)
        fetchMoreResult.pokemons.results = [
          ...previousResult.pokemons.results,
          ...fetchMoreResult.pokemons.results
        ];
        return fetchMoreResult;
      },
    })
  }

  const myPokemonList = useMyPokemonList();

  return (
    <Container {...container_style} >
      <Heading {...heading_style}>Wild Pokemon</Heading>
      {loading &&
        <SimpleGrid columns={{sm: 2, md: 5}} marginTop="30px" spacing="20px">
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
          <SimpleGrid columns={{sm: 2, md: 5}} {...grid_style}>
            {data.pokemons.results.map(pokemon => (
              <CardPokemon key={pokemon.name} pokemon={pokemon}></CardPokemon>
            ))}
            <CollectionButton count={myPokemonList.length}/>
          </SimpleGrid>
        </div>
      }
      {!loading && data &&
        <Flex>
          <Box>
            <IconButton {...icon_style} 
              marginLeft="10px"
              aria-label="Down"
              icon={<ArrowDownIcon w={6} h={6}/>}
              onClick={handleLoadMore}></IconButton>
          </Box>
          <Spacer />
          <Box>
            <IconButton {...icon_style}
              marginRight="10px"
              aria-label="Up"
              icon={<ArrowUpIcon w={6} h={6}/>}
              onClick={scrollTop}></IconButton>
          </Box>
        </Flex>
      }
    </Container>
  );
};

export default MainPage;

const container_style = {
  maxW:"960px",
  marginTop:"83px",
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

const icon_style = {
  bg:"#23CBA7",
  boxShadow:"base",
  colorScheme:"teal",
  borderRadius:"full",
  width:"50px",
  height:"50px",
}