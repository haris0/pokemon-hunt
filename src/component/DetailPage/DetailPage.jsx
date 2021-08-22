import React from 'react';
import { useParams } from "react-router-dom";
import { GET_POKEMON_DET } from "../../queries";
import { useQuery } from '@apollo/client';

function DetailPage() {

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
        <>
          <div>
            Pokemon : {pokename}
          </div>
          <div>
            Height : {data.pokemon.height} and Weight : {data.pokemon.weight}
          </div>
        </>
      }
    </div>
  );
}

export default DetailPage;