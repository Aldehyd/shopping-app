import React from 'react';
import {StyleSheet, View} from 'react-native';

function PreviousAndNext({children}: any): React.JSX.Element {
    return (
        <View style={style.layout}>
            {children}
        </View>
    );
}

const style = StyleSheet.create({
    layout: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    }
});

export default PreviousAndNext;