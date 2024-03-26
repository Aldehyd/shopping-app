import React, {useContext} from 'react';
import ThemeContext from '../../Contexts/Theme';
import {StyleSheet, Text, Pressable} from 'react-native';
import Modalview from '../Layout/Modalview';
import CloseButton from '../Buttons/CloseButton';
import PreviousAndNext from '../Layout/PreviousAndNext';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface ExitFromNewListModalPropsInterface {
    navigation: NativeStackNavigationProp<any>,
    setDisplay: (value: boolean)=> void,
}

function ExitFromNewListModal({navigation, setDisplay}: ExitFromNewListModalPropsInterface): React.JSX.Element {
  
    const {theme} = useContext(ThemeContext);

  const BackToHome = ()=> {
    navigation.navigate('Home');
  };

  return (
    <Modalview marginTop="150">
        <CloseButton setDisplay={setDisplay} />
        <Text style={style.text}>Etes-vous sûr de vouloir interrompre la création de la liste ?</Text>
        <Text style={style.text}>Les données de cette liste seront perdues.</Text>
        <PreviousAndNext>
            <Pressable style={[style.buttons,{backgroundColor: theme}]} onPress={()=> BackToHome()}>
                <Text style={style.buttonText}>Oui</Text>
            </Pressable>
            <Pressable style={[style.buttons,{backgroundColor: theme}]} onPress={()=> setDisplay(false)}>
                <Text style={style.buttonText}>Non</Text>
            </Pressable>
        </PreviousAndNext>
    </Modalview>
  );
}

const style = StyleSheet.create({
    buttons: {
        padding: 10,
        borderRadius: 20,
    },
    text: {
        fontSize: 18,
    },
    buttonText: {
        fontSize: 18,
    }
});

export default ExitFromNewListModal;