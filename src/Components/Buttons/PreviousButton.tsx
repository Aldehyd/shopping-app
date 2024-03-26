import React, {useContext} from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';
import ThemeContext from '../../Contexts/Theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface PreviousButtonPropsInterface {
    navigation: NativeStackNavigationProp<any>
}

function PreviousButton({navigation}: PreviousButtonPropsInterface): React.JSX.Element {

    const {theme} = useContext(ThemeContext);

    return(
        <Pressable style={[style.button, {backgroundColor: theme}]} onPress={()=> navigation.goBack()}>
            <Text style={style.buttonText}>Précédent</Text>
        </Pressable>
    );
}

const style = StyleSheet.create({
    button: {
        alignSelf: 'center',
        padding: 10,
        borderRadius: 20,
    },
    buttonText: {
        fontSize: 18
    }
});

export default PreviousButton;