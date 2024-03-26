import React, {useRef, useEffect, useContext} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import ThemeContext from '../../Contexts/Theme';

interface LabelledFieldPropsInterface {
    title: string,
    onChangeFunction: (value: string)=> void,
    autoFocus?: boolean,
    defaultValue?: string
  }

function LabelledField({title, onChangeFunction,autoFocus=false,defaultValue}: LabelledFieldPropsInterface): React.JSX.Element {

    const {theme} = useContext(ThemeContext);
    
    const input = useRef<TextInput>(null); 

    useEffect(()=> {
        if(autoFocus) {
            input.current?.focus();
        };
    },[]);

    return (
        <View style={style.layout}>
            <Text style={style.text}>{title + " : "}</Text>
            <TextInput 
                ref={input} 
                style={[style.field,{borderColor: theme}]} 
                onChangeText={onChangeFunction} 
                defaultValue={defaultValue} 
                maxLength={18}
            />
        </View>
    );
}

const style = StyleSheet.create({
    layout: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: 10,
        marginBottom: 10,
    },
    field: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 18,
        borderWidth: 2,
        borderRadius: 5,
    },
    text: {
        fontSize: 18,
    }
});

export default LabelledField;