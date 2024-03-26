import React from 'react';
import {StyleSheet, Text} from "react-native";

function NoItemText({children}: any): React.JSX.Element {
    return(
        <Text style={style.text}>{children}</Text>
    );
}

const style = StyleSheet.create({
    text: {
        alignSelf: 'center',
        margin: 20,
        fontSize: 16
    }
});

export default NoItemText;