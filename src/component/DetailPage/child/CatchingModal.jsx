import React, { useState } from 'react';
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

const CatchingModal = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [catching, setCatching] = useState(false);
  const [firsTry, setFirsTry] = useState(true);
  const [success, setSuccess] = useState(false);
  const [nickName, setNickNaem] = useState("");
  const [nickNameError, setNickNameError] = useState(false);
  const [nickNameMsg, setNickNameMsg] = useState("");
  const [nickNameExsist, setNickNameExsist] = useState(false);
  const handleChange = (event) => setNickNaem(event.target.value);

  const catchingPokemon = async() =>{
    setCatching(true)
    setTimeout(() => {
      setCatching(false)
      setFirsTry(false)
      setSuccess(!!getRandomItem())
    }, 4000)
  }

  const setDefault =()=> {
    setFirsTry(true)
    setSuccess(false)
    setNickNaem("")
    setNickNameError(false)
    setNickNameMsg("")
  }

  const closeCatching=()=> {
    onClose()
    setDefault()
  }

  const setFalseNickName = () => {
    setNickNameError(false)
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

  const savePokemon =()=> {
    if (nickName === "") {
      setNickNameError(true)
      setNickNameMsg("Nickname must be filled")
    } else if(nickNameExsist){
      setNickNameError(true)
      setNickNameMsg("Nickname must be Unique")
    }else{
      setDefault()
      const pekemonCaught = generateCaught(nickName, data)
      console.log(pekemonCaught)
      onClose()
      saveToast(nickName)
    }
  }

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
          {!catching && firsTry &&
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
          {!catching && !firsTry &&
            <>
              {success &&
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
                      value={nickName}
                      onClick={setFalseNickName}
                      onChange={handleChange} />
                    {nickNameError &&
                      <FormHelperText color="red !important" textAlign="left">
                        {nickNameMsg}
                      </FormHelperText>
                    }
                  </FormControl>
                  </ModalBody>
                  <ModalFooter {...modal_footer}>
                    <Button {...yes_button} onClick={savePokemon}>Collect</Button>
                    <Button {...no_button} onClick={closeCatching}>Release</Button>
                  </ModalFooter>
                </>
              }
              {!success &&
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
          {catching &&
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