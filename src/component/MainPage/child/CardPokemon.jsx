import React from 'react';
import {Box, 
        Image, 
        Tag, 
        Text, 
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Pokeball from '../../../assets/Pokeball.png';
import PokeEgg from '../../../assets/PokeEgg.png';

const CardPokemon = ({ pokemon }) => {
  return (
    <Link to={"/detail/" + pokemon.name} key={pokemon.name}>
      <Box
        {...outer_box}        
        backgroundImage={"url("+Pokeball+")"}>
        <Text {...pokemon_name}>
          {pokemon.name}
        </Text>
        <Image
          {...pokemon_img}
          src={pokemon.image}
          fallbackSrc={PokeEgg}/>
        <Box>
          <Tag {...tag_owned}>
            <Text {...owned_text}>
              {"Owened : -"}
            </Text>
          </Tag>
        </Box>
      </Box>
    </Link>
  )
};

export default CardPokemon;

const tag_owned = {
  width:"100%",
  bgColor:"white",
  borderRadius:"0px 0px 5px 5px"
}

const owned_text = {
  width:"100%",
  textAlign:"center",
  fontWeight:"bold",
  lineHeight:"tight",
  textTransform:"capitalize",
  padding:"10px",
  color:"#2E3131"
}

const outer_box = {
  display:"flex",
  flexDir:"column",
  boxShadow:"base",
  rounded:"md",
  cursor:"pointer",
  bgColor:"#c1c1c1",
  backgroundSize:"80%",
  backgroundPosition:"center",
  backgroundRepeat:"no-repeat",
}

const pokemon_name = {
  fontWeight:"bold",
  lineHeight:"tight",
  textTransform:"capitalize",
  textAlign:"center",
  padding:"12px 12px 0px 12px",
  color:"White"   
}

const pokemon_img = {
  width:"90%",
  display:"block",
  margin:"auto",
  alt:"Pokemon"
}