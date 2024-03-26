import React, { useContext, useState } from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ThemeContext from '../../Contexts/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatasInterface from '../../Interfaces/DatasInterface';

interface DisplayChoiceHelpModalButtonInterface {
    datas: DatasInterface,
    setDatas: (value: DatasInterface)=>void
    setDisplayDidaHelp: (value: boolean)=>void
};

function DisplayChoiceHelpModalButton({datas,setDatas,setDisplayDidaHelp}: DisplayChoiceHelpModalButtonInterface): React.JSX.Element {

    const {theme} = useContext(ThemeContext);

    const [checked,setChecked] = useState<boolean>(!datas.displayHelp);

    const onCheckPressFunction = ()=> {
        setChecked(!checked);
        !checked ? datas.displayHelp = false : datas.displayHelp = true;
        setDatas(datas);
        AsyncStorage.setItem("datas",JSON.stringify(datas));
    };

    const onHelpPressFunction = ()=> {
        setDisplayDidaHelp(true);
    };

    return(
        <View style={style.view}>
            <Pressable
                style={style.button}
                onPress={()=> onCheckPressFunction()}
            >
                {!checked && <Icon name="square-o" size={30} color={theme} />}
                {checked && <Icon name="check-square-o" size={30} color={theme} />}
                <Text style={style.text}>Ne plus afficher le didacticiel</Text>
            </Pressable>
            <Pressable
                onPress={()=> onHelpPressFunction()}
            >
                <Icon name="question-circle-o" size={25} color={theme} />
            </Pressable>
        </View>
    );
}

const style = StyleSheet.create({
    view: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    text: {
        fontSize: 16
    }
});

export default DisplayChoiceHelpModalButton;