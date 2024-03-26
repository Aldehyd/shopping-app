import React, {useContext} from 'react';
import {StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ThemeContext from '../../Contexts/Theme';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ShopInterface from '../../Interfaces/ShopInterface';

interface HomeBackFromEditListButtonPropsInterface {
    navigation: NativeStackNavigationProp<any>,
    editShopName: string,
    productsList: string[],
    currentShop: ShopInterface | undefined,
    setDisplay: (value: boolean)=>void
}

function HomeBackFromEditShopButton({navigation,editShopName,productsList,currentShop,setDisplay}: HomeBackFromEditListButtonPropsInterface): React.JSX.Element {

    const {theme} = useContext(ThemeContext);

    const Close = ()=> {
        if(productsList === currentShop?.products && editShopName === currentShop?.title) {
            navigation.navigate('Home');
        } else {
            setDisplay(true);
        };
    };

    return (
        <Pressable style={style.closeButton} onPress={()=> Close()}>
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

export default HomeBackFromEditShopButton;