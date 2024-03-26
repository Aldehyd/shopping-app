import React, { useContext } from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';
import Modalview from '../Layout/Modalview';
import CloseButton from '../Buttons/CloseButton';
import ThemeContext from '../../Contexts/Theme';

interface WarningAlreadyNewListModalPropsInterface {
    setDisplay: (value: boolean)=> void,
}

function WarningAlreadyNewListModal({setDisplay}: WarningAlreadyNewListModalPropsInterface): React.JSX.Element {

  const {theme} = useContext(ThemeContext);

  return (
    <Modalview marginTop="150">
        <CloseButton setDisplay={()=> setDisplay(false)} />
        <Text style={style.text}>Ce nom de liste est déjà utilisé.</Text>
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
    text: {
      fontSize: 18
    },
    buttonText: {
      fontSize: 18
    }
});

export default WarningAlreadyNewListModal;