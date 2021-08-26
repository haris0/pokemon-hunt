import React from 'react';
import { Flex, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import PokeLogo from '../../assets/PokeLogo.png';

const Header = () => {
  return (
    <Flex {...header_flex}>
      <Flex align="center" mr={5}>
        <Link to="/">
          <Image
            alt="Poketop"
            height="1.25rem"
            src={PokeLogo}/>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Header;

const header_flex = {
  as:"nav",
  align:"center",
  justify:"space-between",
  overflow:"hidden",
  position:"fixed",
  top:"0",
  width:"100%",
  wrap:"wrap",
  padding:"1rem",
  bg:"white",
  boxShadow:"lg",
  marginBottom:"15px"
}