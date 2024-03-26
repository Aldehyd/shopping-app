import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

function Loader(): React.JSX.Element {
    return(
        <View style={style.loader}>
            <Text style={style.text}>Chargement...</Text>
        </View>
    );
}

const style = StyleSheet.create({
    loader: {
        position: 'absolute',
        zIndex: 5,
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
    },
    text: {
        position: 'absolute',
        top: '40%',
        alignSelf: 'center',
        fontSize: 20,
        color: '#CD13C6'
    }
});

export default Loader;