import React, { useReducer, useEffect } from 'react';
import {
  Box,
  Image,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  CircularProgress,
  Text,
  useDisclosure,
  useToast,
  ModalBody,
  Button,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from '@chakra-ui/react';
import PokeballBlue from '../../../assets/PokeballBlue.png';
import { useMyPokemonList, useAddMyPokemonList} from '../../../context';

const getRandomItem = () => {
  const arr = [1, 0]
  const randomIndex = Math.floor(Math.random() * arr.length);
  const item = arr[randomIndex];
  return item;
}

const generateCaught = (nickName, data) => {
  const pekemonCaught = {
    nickName: nickName,
    name: data.pokemon.name,
    img: data.pokemon.sprites.front_default,
    type: data.pokemon.types.map(type => (type.type.name))
  }
  return pekemonCaught;
}

const catchingReducer = (state, action) => {
  switch (action.type) {
    case 'setState': {
      return {
        ...state,
        [action.stateName]: action.payload,
      };
    }
    case 'setDefault': {
      return {
        ...state,
        firsTry: true,
        success: false,
        nickName: '',
        nickNameError: false,
        nickNameMsg: '',
      };
    }
    case 'nicknameEmpty': {
      return {
        ...state,
        nickNameError: true,
        nickNameMsg: "Nickname must be filled",
      };
    }
    case 'nicknameExsist': {
      return {
        ...state,
        nickNameError: true,
        nickNameMsg: "Nickname must be Unique",
      };
    }
    case 'catchingPokemon': {
      return {
        ...state,
        catching: false,
        firsTry: false,
        success: !!getRandomItem(),
      };
    }
    default:
      return state;
  }
}

const initialState = {
  catching: false,
  firsTry: true,
  success: false,
  nickName: '',
  nickNameError: false,
  nickNameMsg: '',
  nickNameExsist: false,
};

const CatchingModal = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, dispatch] = useReducer(catchingReducer, initialState);

  const myPokemonList = useMyPokemonList();
  const addMyPokemon = useAddMyPokemonList();

  const catchingPokemon = async() =>{
    dispatch({ 
      type: 'setState', 
      stateName: 'catching', 
      payload: true 
    });
    setTimeout(() => {
      dispatch({ type: 'catchingPokemon' });
    }, 4000)
  }

  const closeCatching=()=> {
    onClose()
    dispatch({ type: 'setDefault' });
  }

  const nickNameChange = (even) => {
    dispatch({ 
      type: 'setState', 
      stateName: 'nickName', 
      payload: even.currentTarget.value,
    });
  }

  const setFalseNickName = () => {
    dispatch({ 
      type: 'setState', 
      stateName: 'nickNameError', 
      payload: false, 
    });
  }
  
  const toast = useToast()
  const saveToast =(nickName)=> {
    toast({
      position: "top-right",
      title: nickName + " Saved",
      status: "info",
      duration: 3000,
    })
  }

  const collectPokemon =()=> {
    if (state.nickName === "") {
      dispatch({type: "nicknameEmpty"});
    } else if(state.nickNameExsist){
      dispatch({type: "nicknameExsist"});
    }else{
      dispatch({ type: 'setDefault' });
      const pekemonCaught = generateCaught(state.nickName, data);
      addMyPokemon(pekemonCaught);
      console.log(pekemonCaught);
      onClose();
      saveToast(state.nickName);
    }
  }

  useEffect(() => {
    dispatch({
      type: 'setState',
      stateName: 'nickNameExsist',
      payload: myPokemonList.some(el => el.nickName === state.nickName),
    });
  }, [myPokemonList, state.nickName]);

  return (
    <div>
      <Flex {...flex_button}>
        <Box margin="auto">
          <Flex align="center">
            <Image
              {...img_button}
              src={PokeballBlue}
              onClick={onOpen}
            ></Image>
          </Flex>
        </Box>
      </Flex>
      <Modal 
        blockScrollOnMount={false} 
        onClose={onClose} 
        size="sm" 
        isOpen={isOpen} 
        isCentered>
        <ModalOverlay />
        <ModalContent>
          {!state.catching && state.firsTry &&
            <>
              <ModalHeader {...modal_header}>
                {"Do You Want ​Catch " + data.pokemon.name + " ?"}
              </ModalHeader>
              <ModalFooter {...modal_footer}>
                <Button {...yes_button} onClick={catchingPokemon}>Yes</Button>
                <Button {...no_button} onClick={onClose}>No</Button>
              </ModalFooter>
            </>
          }
          {!state.catching && !state.firsTry &&
            <>
              {state.success &&
                <>
                  <ModalHeader {...modal_header}>
                    {"Yeey Success to ​Catch " + data.pokemon.name + "!!"}
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                  <FormControl id="email" isRequired>
                    <FormLabel>Give Nickname</FormLabel>
                    <Input
                      placeholder="Input Nickname"
                      value={state.nickName}
                      onClick={setFalseNickName}
                      onChange={nickNameChange} />
                    {state.nickNameError &&
                      <FormHelperText color="red !important" textAlign="left">
                        {state.nickNameMsg}
                      </FormHelperText>
                    }
                  </FormControl>
                  </ModalBody>
                  <ModalFooter {...modal_footer}>
                    <Button {...yes_button} onClick={collectPokemon}>Collect</Button>
                    <Button {...no_button} onClick={closeCatching}>Release</Button>
                  </ModalFooter>
                </>
              }
              {!state.success &&
                <>
                  <ModalHeader {...modal_header}>
                    {data.pokemon.name + " ran away!! Try again ?"}
                  </ModalHeader>
                  <ModalFooter {...modal_footer}>
                    <Button {...yes_button} onClick={catchingPokemon}>Yes</Button>
                    <Button {...no_button} onClick={closeCatching}>No</Button>
                  </ModalFooter>
                </>
              }
            </>
          }
          {state.catching &&
            <>
              <ModalHeader {...modal_header}>
                {"​Catching " + data.pokemon.name + " !!"}
              </ModalHeader>
              <ModalBody {...modal_body}>
                <CircularProgress 
                  marginTop="15px" 
                  isIndeterminate 
                  color="blue.300" />
                <Text marginTop="2rem">
                  Please Wait!!
                </Text>
              </ModalBody>
            </>
          }
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CatchingModal;

const flex_button = {
  justify:"space-between",
  overflow:"hidden",
  position:"fixed",
  bottom:"0",
  width:"100%",
  left:"0",
  wrap:"wrap",
  padding:"1rem 0"
}

const img_button = {
  boxShadow:"xl",
  borderRadius:"full",
  bgColor:"white",
  cursor:"pointer",
  height:"60px",
  alt:"Catch Pokemon"
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

const modal_body = {
  textAlign:"center",
  paddingTop:"0",
  paddingBottom:"2rem"
}