import React from 'react';
import {Box, Button, Image} from '@chakra-ui/react';
import { Link } from "react-router-dom";
import Pokeball from '../../../assets/Pokeball.png';

const CollectionButton = ({count}) => {
  return (
    <Link to="/collection">
      <Button {...pokemon_button}
        leftIcon={<Image alt="Poke Ball" src={Pokeball} height="23px" width="23px"/>}>
        My Pokemon
        <Box {...count_box}>
          {count}
        </Box>
      </Button>
    </Link>
  );
};

export default CollectionButton;

const pokemon_button = {
  bg:"#3DB2FF",
  boxShadow:"base",
  colorScheme:"blue",
  borderRadius:"full",
  height: "unset",
  padding: "13px 16px",
  position: "fixed",
  bottom: "0px",
  left: "50%",
  transform: "translate(-50%, 0%)",
  marginBottom: "16px",  
}

const count_box = {
  marginLeft:"10px",
  lineHeight:"23px",
  width:"25px",
  height:"25px",
  bgColor:"#2E3131",
  borderRadius:"full"
}
