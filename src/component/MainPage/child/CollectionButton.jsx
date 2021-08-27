import React from 'react';
import {
  Box, 
  Button, 
  Image,
  Flex,
  
} from '@chakra-ui/react';
import { Link } from "react-router-dom";
import Pokeball from '../../../assets/Pokeball.png';

const CollectionButton = ({count}) => {
  return (
    <Flex {...footer_flex}>
    <Box margin="auto">
      <Flex align="center">
          <Link to="/collection">
          <Button {...pokemon_button}
            leftIcon={<Image alt="Poke Ball" src={Pokeball} height="23px" width="23px"/>}>
            My Pokemon
            <Box {...count_box}>
              {count}
            </Box>
          </Button>
        </Link>
      </Flex>
    </Box>
    </Flex>
    
  );
};

export default CollectionButton;

const footer_flex = {
  justify:"space-between",
  overflow:"hidden",
  position:"fixed",
  bottom:"0",
  width:"100%",
  left:"0",
  wrap:"wrap",
  padding:"1rem 0"
}

const pokemon_button = {
  bg:"#3DB2FF",
  boxShadow:"base",
  colorScheme:"blue",
  borderRadius:"full",
  height: "unset",
  padding: "13px 16px"
}

const count_box = {
  marginLeft:"10px",
  lineHeight:"1.6rem",
  width:"25px",
  height:"25px",
  bgColor:"#2E3131",
  borderRadius:"full"
}