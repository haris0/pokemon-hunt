import React from 'react';
import { useParams } from "react-router-dom";
import { GET_POKEMON_DET } from "../../queries";
import { useQuery } from '@apollo/client';
import { Container } from '@chakra-ui/react';

const DetailPage = () => {
  const pokename = useParams().name;
  const { loading, error, data } = useQuery(GET_POKEMON_DET,{
    variables: {
      name : pokename
    },
  })

  return (
    <div>
      {loading && 
        <div>
          Loading...
        </div>
      }
      {error && 
        <div>
          Error Get Data
        </div>
      }
      {!loading && data && 
        <Container {...container_style}> 
          <div>
            Pokemon : {pokename}
          </div>
          <div>
            Height : {data.pokemon.height} and Weight : {data.pokemon.weight}
          </div>
        </Container>
      }
    </div>
  );
};

export default DetailPage;

const container_style = {
  maxW:"960px",
  marginTop:"85px",
  marginBottom:"16px"
}