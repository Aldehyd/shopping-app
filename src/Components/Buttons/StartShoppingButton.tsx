import React, { useContext } from 'react';
import {StyleSheet,Pressable, Text} from 'react-native';
import ThemeContext from '../../Contexts/Theme';    
import ListInterface from '../../Interfaces/ListInterface';
import ShoppingListInterface from '../../Interfaces/ShoppingListInterface';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ShoppingListShopInterface from '../../Interfaces/ShoppingListShopsInterface';

interface StartShoppingButtonInterface {
    navigation : NativeStackNavigationProp<any>,
    selectedList: ListInterface |boolean
}

function StartShoppingButton({navigation,selectedList}: StartShoppingButtonInterface): React.JSX.Element {

    const {theme} = useContext(ThemeContext);

    const onPressFunction = ()=> {
        function isListInterface(item: any): item is ListInterface {
            return true;
        };
        if(isListInterface(selectedList)) {
            let shoppingList: ShoppingListInterface = {
                id: selectedList.id,
                title: selectedList.title,
                shops: [] as ShoppingListShopInterface[],
            };
    
            selectedList.shops.forEach(shop => {
                let newShoppingListShop = {} as ShoppingListShopInterface;
                let newProductsList: {title: string, bought: boolean}[]= [];
                shop.products.forEach(product => {
                    newProductsList.push({
                        title: product,
                        bought: false
                    });
                });
                newShoppingListShop = {
                    id: shop.id,
                    title: shop.title,
                    products: newProductsList
                };
                shoppingList.shops.push(newShoppingListShop);
            });
            navigation.navigate('Shopping',{list: shoppingList})
        };
    };


    return(
        <Pressable 
            style={[style.button,{backgroundColor: theme},selectedList === false && style.disabled]}
            onPress={()=> onPressFunction()}
            disabled={selectedList === false ? true : false}
        >
            <Text style={style.text}>Commencer</Text>
        </Pressable>
    );
}

const style = StyleSheet.create({
    button: {
        alignSelf: 'center',
        padding: 10,
        borderRadius: 10
    },
    disabled: {
        opacity: 0.5
    },
    text: {
        fontSize: 18
    }
});

export default StartShoppingButton;