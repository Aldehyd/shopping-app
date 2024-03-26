import React, {useState, useEffect, useRef, useContext} from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';
import Modalview from "../Layout/Modalview";
import CloseButton from '../Buttons/CloseButton';
import ConfirmAddProductButton from '../Buttons/ConfirmAddProductButton';
import ThemeContext from '../../Contexts/Theme';

interface AddProductModalPropsInterface {
  page: string,
  productsList: string[],
  setProductsList: (value: string[])=> void,
  setDisplay: (value: boolean)=> void,
  setDisplayAlready: (value: boolean)=> void,
}

function AddProductModal({page,productsList,setProductsList,setDisplayAlready,setDisplay} : AddProductModalPropsInterface): React.JSX.Element {
  
  const {theme} = useContext(ThemeContext);

  const [productName,setProductName] = useState("");
  const input: any = useRef(null);

  useEffect(()=> {
    input.current.focus();
  },[]);

  return(
    <Modalview marginTop="100">
        <CloseButton setDisplay={() => setDisplay(false)} />
        <Text style={style.text}>Nouvel article :</Text>
        <TextInput 
          style={[style.input,{borderColor: theme}]} 
          ref={input}
          maxLength={20}
          onChangeText={(newName: string)=>setProductName(newName)} 
        />
        <ConfirmAddProductButton page={page} productsList={productsList} setProductsList={setProductsList} 
          inputValue={productName} setDisplayAlready={setDisplayAlready} setDisplay={setDisplay} />
    </Modalview>
  );
}

const style = StyleSheet.create({
  input: {
    flexWrap: 'wrap',
    marginTop: 5,
    marginBottom: 10,
    padding: 5,
    fontSize: 18,
    borderWidth: 2,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
  }
});

export default AddProductModal;