import React, { useContext } from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';
import ThemeContext from '../../Contexts/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatasInterface from '../../Interfaces/DatasInterface';

interface ConfirmAddProductButtonPropsInterface {
  page: string,
  productsList: string[],
  setProductsList: (value: string[])=> void,
  inputValue: string,
  setDisplay:(value:boolean)=>void,
  setDisplayAlready: (value:boolean)=>void
}

function ConfirmAddProductButton({productsList,setProductsList,inputValue,setDisplayAlready,setDisplay}: ConfirmAddProductButtonPropsInterface): React.JSX.Element {

  const {theme} = useContext(ThemeContext);

  const confirmAddProduct = async ()=> {

    let isAlreadySimilarProduct = false;

    try {
      const datasString = await AsyncStorage.getItem("datas");
      let datas = {} as DatasInterface;
      if(datasString)
        datas = JSON.parse(datasString);

        productsList.forEach(product => {
          if(product === inputValue.toLowerCase()) {
            isAlreadySimilarProduct = true;
          };
        });
        if(isAlreadySimilarProduct) {
          setDisplayAlready(true);
        } else {
          setProductsList([...productsList,inputValue.toLowerCase()].sort());
          setDisplay(false);
        };
    } catch(error) {
      console.log(error);
    };
  };

  return (
    <Pressable 
      style={[style.confirmButton,{backgroundColor: theme}, inputValue.length == 0 && style.confirmButtonDisabled]} 
      onPress={() => confirmAddProduct()}
      disabled={inputValue.length == 0 ? true : false}
    >
        <Text style={style.text}>Ajouter</Text>
    </Pressable>
  );
}

const style = StyleSheet.create({
    confirmButton: {
      alignSelf: 'center',
      margin: 10,
      padding: 10,
      borderRadius: 10,
    },
    confirmButtonDisabled: {
      opacity: 0.5,
    },
    text: {
      fontSize: 16,
    }
});

export default ConfirmAddProductButton;