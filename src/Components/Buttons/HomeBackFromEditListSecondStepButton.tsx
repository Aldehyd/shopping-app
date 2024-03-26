import React, {useContext} from 'react';
import {StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ThemeContext from '../../Contexts/Theme';
import ListInterface from '../../Interfaces/ListInterface';
import ShopToAddInterface from '../../Interfaces/ShopToAddInterface';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface HomeBackFromEditListSecondStepButtonPropsInterface {
    setDisplay: (value: boolean)=>void
    editListName: string| undefined,
    shopsList: ShopToAddInterface[] | undefined,
    currentList: ListInterface | undefined,
    navigation : NativeStackNavigationProp<any>,
}

function HomeBackFromEditListSecondStepButton({setDisplay,editListName,shopsList,currentList,navigation}: HomeBackFromEditListSecondStepButtonPropsInterface): React.JSX.Element {

    const {theme} = useContext(ThemeContext);

    const closeFunction = ()=> {
        let isAnyModification: boolean = false;
        if(editListName !== currentList?.title) {
            isAnyModification = true;
        } else {
            shopsList?.forEach(shop => {
                let currentListSameShop = currentList?.shops.find(item => item.id === shop.id);
                // console.log(shop,currentListSameShop)
                shop.selectedProducts.forEach(product => {
                    if(!currentListSameShop?.products.includes(product) || currentListSameShop?.products.length !== shop.selectedProducts.length) {
                        isAnyModification = true;
                        // console.log('new product')
                    };
                });
            });
            if(!isAnyModification) {
                currentList?.shops.forEach(shop => {
                    let shopsListSameShop = shopsList?.find(item => item.id === shop.id);
                    shop.products.forEach(product => {
                        if(!shopsListSameShop?.selectedProducts.includes(product) || shopsListSameShop?.selectedProducts.length !== shop.products.length) {
                            isAnyModification = true;
                        };
                    });
                });
            };
        };

        if(!isAnyModification) {
            console.log('no modification')
            navigation.navigate('Home');
        } else {
            setDisplay(true);
        };
    };

    return (
        <Pressable style={style.closeButton} onPress={()=> closeFunction()}>
            <Icon name="close" size={40} color={theme} />
        </Pressable>
    );
}

const style = StyleSheet.create({
    closeButton: {
      position: 'absolute',
      top: 10,
      right: 20,
    },
  });

export default HomeBackFromEditListSecondStepButton;