import React, { lazy, useEffect } from 'react';
import { 
  Container,
  Heading,
  Box,
  Text,
  Image,
  SimpleGrid,
} from '@chakra-ui/react';
import { useMyPokemonList } from '../../context';
import PokeballBlue from '../../assets/PokeballBlue.png'

const CardPokemon = lazy(()=> import('./child/CardPokemon'));

const CollectionPage = () => {
  const myPokemonList = useMyPokemonList();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [myPokemonList]);

  return (
    <Container {...container_style}>
      <Heading {...heading_style}>My Pokemon</Heading>
      {myPokemonList.length>0 &&
        <SimpleGrid columns={{sm: 2, md: 5}} {...grid_style}>
          {myPokemonList.map(pokemon => (
            <CardPokemon key={pokemon.nickName} pokemon={pokemon}></CardPokemon>
          ))}
        </SimpleGrid>
      }
      {myPokemonList.length<=0 &&
        <>
        <Box textAlign="center" marginTop="30px">
          <Text {...no_pokemon_text}> You Don't Have any Pokemon!
          <Image {...no_pokemon_img} src={PokeballBlue}></Image>
          </Text>
          <Text fontWeight="bold"> Let's catch the Wild Pokemon!</Text>
        </Box>
        </>
      }
    </Container>
  );
};

export default CollectionPage;

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

const no_pokemon_text = {
  fontSize:"40px",
  color:"lightgray",
  lineHeight:"50px",
  fontWeight:"Bold",
}

const no_pokemon_img = {
  maxW:"240px",
  padding:"50px",
  display:"block",
  margin:"auto",
  alt:"No Pokemon"
}