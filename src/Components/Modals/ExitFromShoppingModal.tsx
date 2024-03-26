import React, { useContext } from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';
import Modalview from '../Layout/Modalview';
import CloseButton from '../Buttons/CloseButton';
import PreviousAndNext from '../Layout/PreviousAndNext';
import ThemeContext from '../../Contexts/Theme';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface ExitFromEndShoppingModalPropsInterface {
    navigation: NativeStackNavigationProp<any>,
    setDisplay: (value: boolean)=> void,
}

function ExitFromEndShoppingModal({navigation, setDisplay}: ExitFromEndShoppingModalPropsInterface): React.JSX.Element {

    const {theme} = useContext(ThemeContext);
    
    const onPressFunction = ()=> {
        navigation.navigate('Home');
    };

  return (
    <Modalview marginTop="150">
        <CloseButton setDisplay={setDisplay} />
        <Text style={style.text}>Avez-vous terminé vos courses ?</Text>
        <PreviousAndNext>
            <Pressable style={[style.buttons,{backgroundColor: theme}]} onPress={()=> onPressFunction()}>
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

export default ExitFromEndShoppingModal;