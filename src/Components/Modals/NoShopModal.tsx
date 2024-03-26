import React, { useContext } from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';
import Modalview from '../Layout/Modalview';
import CloseButton from '../Buttons/CloseButton';
import ThemeContext from '../../Contexts/Theme';

interface NoShopModalPropsInterface {
    setDisplay: (value: boolean)=> void,
}

function NoShopModal({setDisplay}: NoShopModalPropsInterface): React.JSX.Element {

  const {theme} = useContext(ThemeContext);

  return (
    <Modalview marginTop="150">
        <CloseButton setDisplay={()=> setDisplay(false)} />
        <Text style={style.text}>Vous devez créer au moins un magasin avant de créer une liste.</Text>
        <Pressable style={[style.button, {backgroundColor: theme}]} onPress={()=> setDisplay(false)}>
            <Text>OK</Text>
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
      fontSize: 18,
    }
});

export default NoShopModal;