import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

function ContentView({children}: any): React.JSX.Element {
    return(
        <ScrollView contentContainerStyle={style.view}>
            {children}
        </ScrollView>
    );
}

const style = StyleSheet.create({
    view: {
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 30,
    }
});

export default ContentView;