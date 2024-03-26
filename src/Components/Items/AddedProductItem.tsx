import React, {useContext} from 'react';
import ThemeContext from '../../Contexts/Theme';
import {StyleSheet, View, Text, Pressable} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'

interface AddedProductItemPropsInterface {
    page: string,
    title: string,
    productsList: string[],
    setProductsList: (value: string[])=>void
}

function AddedProductItem({page,title,productsList,setProductsList}: AddedProductItemPropsInterface): React.JSX.Element {

    const {theme} = useContext(ThemeContext);

    const Remove = ()=> {
        const newList = productsList.filter((item) => item !== title);
        setProductsList(newList);
    };

    return(
        <View style={[style.addedProduct,{backgroundColor: theme}]}>
            <Text style={style.text}>{title}</Text>
            <Pressable onPress={() => Remove()}>
                <Icon name="remove" size={25} />
            </Pressable>
        </View>
    );
}

const style = StyleSheet.create({
    addedProduct: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        gap: 10,
        margin: 5,
        padding: 10,
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
    }
});

export default AddedProductItem;