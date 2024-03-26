import React, { useContext } from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';
import Modalview from '../Layout/Modalview';
import CloseButton from '../Buttons/CloseButton';
import ThemeContext from '../../Contexts/Theme';

interface WarningAlreadySimilarProductModalPropsInterface {
  setDisplay: (value: boolean)=> void,
}

function WarningAlreadySimilarProductModal({setDisplay}: WarningAlreadySimilarProductModalPropsInterface): React.JSX.Element {

  const {theme} = useContext(ThemeContext);

  return (
    <Modalview priority={true} marginTop="90">
        <CloseButton setDisplay={()=> setDisplay(false)} />
        <Text style={style.text}>Cet article existe déjà.</Text>
        <Pressable style={[style.button,{backgroundColor: theme}]} onPress={()=> setDisplay(false)}>
            <Text style={style.buttonText}>OK</Text>
        </Pressable>
    </Modalview>
  );
}

const style = StyleSheet.create({
    button: {
        alignSelf: 'center',
        margin: 20,
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
      fontSize: 16,
    },
    text: {
      fontSize: 18,
    }
});

export default WarningAlreadySimilarProductModal;