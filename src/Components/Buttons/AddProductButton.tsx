import React, { useContext } from 'react';
import ThemeContext from '../../Contexts/Theme';
import {StyleSheet, Pressable} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo'

interface AddProductButtonPropsInterface {
  setDisplay: (value: boolean)=>void
}

function AddProductButton({setDisplay}: AddProductButtonPropsInterface): React.JSX.Element {

  const {theme} = useContext(ThemeContext);

  return (
    <Pressable style={[style.addProductButton,{backgroundColor: theme}]} onPress={()=>setDisplay(true)}>
      <EntypoIcon name="plus" size={50} />
    </Pressable>
  );
}

const style = StyleSheet.create({
  addProductButton: {
    height: 50,
    width: 50,
    fontWeight: 'bold',
    color: '#fff',
    borderRadius: 25,
  },
});

export default AddProductButton;