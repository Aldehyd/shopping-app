import React, { useContext } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modalview from '../Layout/Modalview';
import CloseButton from '../Buttons/CloseButton';
import ThemeContext from '../../Contexts/Theme';
import Icon from 'react-native-vector-icons/FontAwesome';

interface DidaHelpModalPropsInterface {
    setDisplayDidaHelp: (value: boolean)=>void
}

function DidaHelpModal({setDisplayDidaHelp}: DidaHelpModalPropsInterface): React.JSX.Element {

    const {theme} = useContext(ThemeContext);

    return(
        <Modalview priority={true} marginTop="130">
            <CloseButton setDisplay={setDisplayDidaHelp} />
            <Text style={style.text}>Par défault, le didacticiel s'affiche à l'ouverture de l'application lorsqu'aucune liste n'a encore été créée.</Text>
            <Text style={style.paragraph}>
                <Text style={style.text}>Il est possible d'afficher le didacticiel via le bouton </Text>
                <Icon style={style.icon} name="question-circle-o" size={25} color={theme} />
                <Text style={style.text}> en haut à gauche de la page d'accueil.</Text>
            </Text>
        </Modalview>
    );
}

const style = StyleSheet.create({
    text: {
        fontSize: 16,
    },
    paragraph: {
        maxWidth: '100%',
        marginTop: 5,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
   icon: {
    marginLeft: 5,
    marginRight: 5,
   }
});

export default DidaHelpModal;