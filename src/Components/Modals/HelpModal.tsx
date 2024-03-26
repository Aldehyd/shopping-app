import React,{useContext, useState} from 'react';
import {StyleSheet, Text, Pressable, View} from 'react-native';
import Modalview from '../Layout/Modalview';
import CloseButton from '../Buttons/CloseButton';
import StepTitle from '../Titles/StepTitle';
import MainTitle from '../Titles/MainTitle';
import PreviousAndNext from '../Layout/PreviousAndNext';
import ThemeContext from '../../Contexts/Theme';
import DisplayChoiceHelpModalButton from '../Buttons/DisplayChoiceHelpModalButton';
import DatasInterface from '../../Interfaces/DatasInterface';

interface HelpModalPropsInterface {
    setDisplay: (value: boolean)=> void,
    datas: DatasInterface,
    setDatas: (value: DatasInterface)=>void
    setDisplayDidaHelp: (value: boolean)=>void
}

function HelpModal({setDisplay,datas,setDatas,setDisplayDidaHelp}: HelpModalPropsInterface): React.JSX.Element {

    const {theme} = useContext(ThemeContext);
    const [page,setPage] = useState(1);

    const handlePreviousButtonFunction = ()=> {
        setPage(page-1);
    };

    const handleNextButtonFunction = ()=> {
        setPage(page+1);
    };

    return(
        <Modalview marginTop="200">
            <CloseButton setDisplay={setDisplay} />
            <MainTitle title="Didacticiel" />
            {page === 1 && <View>
                <StepTitle stepCount="1" title="créez un magasin" />
                <Text style={style.text}>Créez un magasin et ajoutez les articles que vous achetez régulièrement dans cette enseigne.</Text>
            </View>}
            {page === 2 && <View>
                <StepTitle stepCount="2" title="créez une liste" />
                <Text style={style.text}>Créez une liste, ajoutez-y un ou plusieurs magasin(s) parmi ceux que vous avez créés, puis sélectionnez pour chacun les articles que vous souhaitez incorporer à votre liste.</Text>
            </View>}
            {page === 3 && <View>
                <StepTitle stepCount="3" title="commencez vos courses" />
                <Text style={style.text}>Cliquer sur 'Commencer courses' puis sélectionner la liste que vous souhaitez utiliser. C'est parti !</Text>
                <DisplayChoiceHelpModalButton datas={datas} setDatas={setDatas} setDisplayDidaHelp={setDisplayDidaHelp} />
            </View>}
            <PreviousAndNext>
                {page !== 1 && <Pressable
                    style={[style.button,{backgroundColor: theme}]}
                    onPress={()=> handlePreviousButtonFunction()}
                >
                    <Text style={style.buttonText}>Précédent</Text>
                </Pressable>}
                {page !== 3 && <Pressable
                    style={[style.button,{backgroundColor: theme}]}
                    onPress={()=> handleNextButtonFunction()}
                >
                    <Text style={style.buttonText}>Suivant</Text>
                </Pressable>}
                {page === 3 && <Pressable
                    style={[style.button,{backgroundColor: theme}]}
                    onPress={()=> setDisplay(false)}
                >
                    <Text style={style.buttonText}>J'ai compris</Text>
                </Pressable>}
            </PreviousAndNext>
        </Modalview>
    );
}

const style = StyleSheet.create({
    text: {
        marginTop: 20,
        fontSize: 16,
    },
    button: {
        alignSelf: 'center',
        margin: 10,
        marginTop: 20,
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 16,
    }
});

export default HelpModal;