import React from 'react';
import { useParams } from 'react-router-dom';
import { GET_POKEMON_DET } from "../../queries";
import { useQuery } from '@apollo/client';
import { Container,
         Skeleton,
         SkeletonText,
         Box,
         Image,
         Text,
} from '@chakra-ui/react';
import { PokemonColors } from '../../colors';
import Pokeball from '../../assets/Pokeball.png';
import PokeEgg from '../../assets/PokeEgg.png';
import TypeList from './child/TypeList'

const DetailPage = () => {
  const pokename = useParams().name;
  const { loading, error, data } = useQuery(GET_POKEMON_DET,{
    variables: {
      name : pokename
    },
  });  

  return (
    <div>
      {loading &&
        <Container {...container_style} marginTop="85px">
          <Container>
            <Skeleton height="100px" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Container>
        </Container>
      }
      {error && 
        <div>
          Error Get Data
        </div>
      }
      {!loading && data && 
        <Box>
          <Box
            {...box_header}
            bgColor={PokemonColors[data.pokemon.types[0].type.name]}
            backgroundImage={"url("+Pokeball+")"}/>
          <Container {...container_style}>
            <Image
              {...pokemon_img}
              src={data.pokemon.sprites.front_default}
              fallbackSrc={PokeEgg}/> 
            <Text {...pokemon_name}>
              {data.pokemon.name}
            </Text>
            <TypeList typeList={data.pokemon.types}></TypeList>
          </Container>
        </Box>
      }
    </div>
  );
};

export default DetailPage;

const box_header = {
  marginTop:"57px",
  right:"0",
  width:"100%",
  height:"150px",
  backgroundSize:"160px",
  backgroundPosition:"right",
  backgroundRepeat:"no-repeat"
}

const pokemon_img = {
  display:"block",
  marginTop:"-150px",
  marginRight:"auto",
  marginLeft:"auto",
  height:"250px",
  padding:"10px",
  alt:"Pokemon"
}
const pokemon_name = {
  textAlign:"center",
  textTransform:"capitalize",
  fontWeight:"Bold",
  marginTop:"-50px",
  fontSize:"32px",
}

const container_style = {
  maxW:"960px",
  marginBottom:"100px"
}