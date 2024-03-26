import React, { useContext } from 'react';
import {StyleSheet,Pressable,Text} from 'react-native';
import ThemeContext from '../../Contexts/Theme';
import ShoppingListInterface from '../../Interfaces/ShoppingListInterface';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface EndShoppingButtonPropsInterface {
    navigation: NativeStackNavigationProp<any>,
    setDisplay: (value: boolean)=>void,
    list: ShoppingListInterface
}

function EndShoppingButton({navigation,list,setDisplay}: EndShoppingButtonPropsInterface): React.JSX.Element {

    const {theme} = useContext(ThemeContext);
    
    const onPressFunction = ()=> {
        let isProductLeftToBuy = false;
        list.shops.forEach(shop => {
            shop.products.forEach(product => {
                if(product.bought === false) {
                    isProductLeftToBuy = true;
                };
            });
        });

        if(isProductLeftToBuy) {
            setDisplay(true);
        } else {
            navigation.navigate('Home');
        };
    };

    return (
        <Pressable style={[style.button,{backgroundColor: theme}]} onPress={()=> onPressFunction()}>
            <Text style={style.buttonText}>Terminé</Text>
        </Pressable>
    );
}

const style = StyleSheet.create({
    button: {
        alignSelf: 'center',
        marginBottom: 20,
        marginTop: 50,
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 18,
    }
});

export default EndShoppingButton