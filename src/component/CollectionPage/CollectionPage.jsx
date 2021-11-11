import React, { lazy, useState, useEffect } from 'react';
import { 
  Container,
  Heading,
  Box,
  Text,
  Image,
  SimpleGrid,
  InputGroup,
  InputRightElement,
  Input,
} from '@chakra-ui/react';
import { useMyPokemonList } from '../../context';
import { Search2Icon } from '@chakra-ui/icons';
import PokeballBlue from '../../assets/PokeballGreen.png'

const CardPokemon = lazy(()=> import('./child/CardPokemon'));

const CollectionPage = () => {
  const myPokemonList = useMyPokemonList();

  const [keywords, setKeywords] = useState("");
  const [filterdMyPokemon, setFilterdMyPokemon] = useState(myPokemonList);

  const handleKeywordsChange = (event) => {
    let val = event.target.value
    setKeywords(val);
    if (val === "") {
      setFilterdMyPokemon(myPokemonList);
    } else {
      setFilterdMyPokemon(
        myPokemonList.filter(
          (pokemon) => pokemon.name.toLowerCase().includes(val.toLowerCase()) 
                    || pokemon.nickName.toLowerCase().includes(val.toLowerCase())
        ))
    }
  };

  useEffect(() => {
    setFilterdMyPokemon(myPokemonList)
  }, [myPokemonList]);

  return (
    <Container {...container_style}>
      <Heading {...heading_style}>My Pokemon</Heading>
      {myPokemonList.length>0 &&
        <>
          <InputGroup {...input_style}>
            <InputRightElement
              pointerEvents="none"
              paddingRight="2rem"
              children={<Search2Icon color="gray.300" />}
            />
            <Input 
              type="tel" 
              placeholder="Search By Name or Nickname"
              value={keywords}
              onChange={handleKeywordsChange} />
          </InputGroup>
          <SimpleGrid columns={{sm: 2, md: 5}} {...grid_style}>
            {filterdMyPokemon.map(pokemon => (
                <CardPokemon key={pokemon.nickName} pokemon={pokemon}></CardPokemon>
            ))}
          </SimpleGrid>
        </>
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
  fontSize:"35px",
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

const input_style = {
  marginTop:"2rem",
  paddingLeft:"1rem",
  paddingRight:"1rem",
}