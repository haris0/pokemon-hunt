import React from 'react';
import Pokeball from '../../../assets/Pokeball.png';
import PokeEgg from '../../../assets/PokeEgg.png';
import { PokemonColors } from "../../../colors";
import { Link } from "react-router-dom";
import {
  Text,
  Box,
  Tag,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useRemoveMyPokemonList } from '../../../context';

const CardPokemon = ({pokemon}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const removeMyPokemon = useRemoveMyPokemonList();

  return (
    <div data-testid="myPokemonCard">
      <Box
        {...outer_box}
        bgColor={PokemonColors[pokemon.type[0]]}
        backgroundImage={"url("+Pokeball+")"}
        key={pokemon.nickName}>
        <Link to={"/detail/" + pokemon.name}>
          <Box>
            <Text {...pokemon_nickname}>
              {pokemon.nickName}
            </Text>
          <Text {...pokemon_name}>
            {"("+pokemon.name+")"}
          </Text>
          <Image {...pokemon_img}
            src={pokemon.img}
            fallbackSrc={PokeEgg}/>
          </Box>
        </Link>
        <Box cursor="pointer" onClick={onOpen}>
          <Tag {...tag_release}>
            <Text {...release_text}>
              Release
            </Text>
          </Tag>
        </Box>
      </Box>
      <Modal 
        blockScrollOnMount={false} 
        onClose={onClose} 
        size="xs"
        isOpen={isOpen} 
        isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader {...modal_header}>
            {"Do You Want Release " + pokemon.nickName + " ?"}
          </ModalHeader>
          <ModalFooter {...modal_footer}>
            <Button {...yes_button}
              onClick={()=>{
                removeMyPokemon(pokemon.nickName)}}>
              Yes
            </Button>
            <Button {...no_button} onClick={onClose}>No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
};

export default CardPokemon;

const outer_box = {
  display:"flex",
  flexDir:"column",
  boxShadow:"base",
  rounded:"md",
  backgroundSize:"80%",
  backgroundPosition:"center",
  backgroundRepeat:"no-repeat",
}

const pokemon_nickname = {
  fontWeight:"bold",
  lineHeight:"tight",
  textTransform:"capitalize",
  textAlign:"center",
  padding:"12px 12px 0px 12px",
  color:"White"
}

const pokemon_name = {
  textAlign:"center",
  color:"white",
  marginTop:"-5px",
  textTransform:"capitalize",
  fontSize:"14px"    
}

const pokemon_img = {
  width:"90%",
  display:"block",
  margin:"auto",
  alt:"Pokemon"
}

const tag_release = {
  width:"100%",
  bgColor:"white",
  borderRadius:"0px 0px 5px 5px"
}

const release_text = {
  width:"100%",
  textAlign:"center",
  fontWeight:"bold",
  lineHeight:"tight",
  textTransform:"capitalize",
  padding:"10px",
  color:"#2E3131"
}

const modal_header = {
  fontSize:"medium", 
  textAlign:"center",
  marginTop:"2rem",
  textTransform:"capitalize"
}

const modal_footer = {
  display:"initial",
  textAlign:"center",
  padding:0
}

const yes_button = {
  margin:"10px",
  width:"100px",
  color:"white",
  colorScheme:"blue"
}

const no_button = {
  margin:"20px 10px",
  width:"100px",
  color:"white",
  colorScheme:"red"
}
