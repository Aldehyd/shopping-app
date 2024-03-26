import React from 'react';
import {StyleSheet, Text } from 'react-native';

interface BasicListItemPropsInterface {
    title: string
}

function BasicListItem({title}: BasicListItemPropsInterface): React.JSX.Element {
    return(
        <Text style={style.text}>{'- ' + title}</Text>
    );
}

const style = StyleSheet.create({
    text: {
        fontSize: 18,
    }
});

export default BasicListItem;