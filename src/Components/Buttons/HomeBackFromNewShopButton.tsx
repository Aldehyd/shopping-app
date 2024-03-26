import React, { useContext } from 'react';
import {StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ThemeContext from '../../Contexts/Theme';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface HomeBackFromNewShopButtonPropsInterface {
    navigation: NativeStackNavigationProp<any>,
    productsList: string[],
    newShopName: string,
    setDisplay: (value: boolean)=>void
}

function HomeBackFromNewShopButton({navigation,productsList,newShopName,setDisplay}: HomeBackFromNewShopButtonPropsInterface): React.JSX.Element {
    
    const {theme} = useContext(ThemeContext);
    
    const Close = ()=> {
        if(productsList.length === 0 && newShopName.length === 0) {
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

export default HomeBackFromNewShopButton;