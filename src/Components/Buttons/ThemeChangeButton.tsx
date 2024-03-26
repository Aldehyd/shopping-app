import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo'
import DatasInterface from '../../Interfaces/DatasInterface';

interface ThemeChangeButtonPropsInterface {
    title: string,
    theme: string,
    changeTheme: ((value: string)=>void) | undefined,
    color: string
}

function ThemeChangeButton({title,theme,changeTheme,color}: ThemeChangeButtonPropsInterface): React.JSX.Element {
    
    const onPressFunction = async ()=> {
        try {
            const datasString = await AsyncStorage.getItem("datas");
            let datas = {} as DatasInterface;
            if(datasString)
                datas = JSON.parse(datasString);

            changeTheme && changeTheme(color);
            datas.theme = color;
            AsyncStorage.setItem("datas",JSON.stringify(datas));
        } catch(error) {
            console.log(error);
        };
    };
    
    return(
        <Pressable
            style={[style.button, {backgroundColor: color}]}
            onPress={()=> onPressFunction()}
        >
            <Text>{title.toUpperCase()}</Text>
            {theme === color && <EntypoIcon name="check" size={20} color="#fff" />}
        </Pressable>
    );
};

const style = StyleSheet.create({
    button: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        margin: 10,
        padding: 10,
        borderRadius: 5,
    }
});

export default ThemeChangeButton;