import React, { lazy } from 'react';
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

const TypeList = lazy(()=> import('./child/TypeList'));
const WeightHeight = lazy(()=> import('./child/WeightHeight'));
const StatList = lazy(()=> import('./child/StatList'));
const MovesTable = lazy(()=> import('./child/MovesTable'));

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
            <Container {...container_inside}>
              <WeightHeight 
                height={data.pokemon.height} 
                weight={data.pokemon.weight}>
              </WeightHeight>
              <Text {...count_text}> {"Owned : -"} </Text>
              <Text {...section_text}> Stats </Text>
              <StatList statList={data.pokemon.stats}></StatList>
              <Text {...section_text}> Moves </Text>
              <MovesTable movesList={data.pokemon.moves}></MovesTable>
            </Container>
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

const container_inside = {
  paddingLeft:"0px",
  paddingRight:"0px",
}

const section_text = {
  fontWeight:"Bold",
  fontSize:"24px",
  margin:"20px 5px 5px"
}

const count_text = {
  textAlign:"center",
  marginTop:"15px",
  fontWeight:"700"
}