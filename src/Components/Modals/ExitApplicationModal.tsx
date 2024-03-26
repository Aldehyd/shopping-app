import React, {useContext} from 'react';
import {Pressable, StyleSheet, Text, BackHandler} from 'react-native';
import Modalview from '../Layout/Modalview';
import CloseButton from '../Buttons/CloseButton';
import PreviousAndNext from '../Layout/PreviousAndNext';
import ThemeContext from '../../Contexts/Theme';

interface ExitApplicationModalPropsInterface {
    setDisplay: (value: boolean)=> void,
}

function ExitApplicationModal({setDisplay}: ExitApplicationModalPropsInterface): React.JSX.Element {

    const {theme} = useContext(ThemeContext);

    return (
        <Modalview marginTop="150">
            <CloseButton setDisplay={setDisplay} />
            <Text style={style.text}>Fermer l'application ?</Text>
            <PreviousAndNext>
                <Pressable style={[style.buttons,{backgroundColor: theme}]} onPress={BackHandler.exitApp}>
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
    buttonText: {
        fontSize: 16,
    },
    text: {
        alignSelf: 'center',
        fontSize: 18,
    }
});

export default ExitApplicationModal;