import React, { 
  createContext, 
  useContext, 
  useState,
  useEffect
} from 'react';

export const MyPokemonContex = createContext();

const MyPokemonContexProvider = (props) => {
  
  let initState = []
  if(localStorage.hasOwnProperty("myPokemon")){
    initState = JSON.parse(localStorage.getItem("myPokemon"));
  }
  const [myPokemonList, setMyPokemonList] = useState(initState);

  useEffect(() => {
    localStorage.setItem('myPokemon', JSON.stringify(myPokemonList));
  }, [myPokemonList]);

  return (
    <MyPokemonContex.Provider value={{
      myPokemonList,
      setMyPokemonList
    }}>
      {props.children}
    </MyPokemonContex.Provider>
  );
};

export const useMyPokemonList = () => {
  const {myPokemonList} = useContext(MyPokemonContex);

  return myPokemonList;
}

export const useAddMyPokemonList = () => {
  const {setMyPokemonList} = useContext(MyPokemonContex);

  return (pokemon) => {
    setMyPokemonList((prev) => [...prev, pokemon]);
  };
}

export const useRemoveMyPokemonList = () => {
  const {setMyPokemonList} = useContext(MyPokemonContex);

  return (nickName) => {
    setMyPokemonList((list) => list.filter((item) => item.nickName !== nickName));
  };
}

export const useCountOwnPokemon = (name) => {
  const {myPokemonList} = useContext(MyPokemonContex);
  return myPokemonList.filter(pokemon => pokemon.name === name).length;
}

export default MyPokemonContexProvider;
