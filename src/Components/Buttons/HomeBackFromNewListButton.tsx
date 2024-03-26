import React, { useContext } from 'react';
import {StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ThemeContext from '../../Contexts/Theme';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface HomeBackFromNewListButtonPropsInterface {
    navigation: NativeStackNavigationProp<any>,
    newListName: string | undefined,
    setDisplay: (value: boolean)=>void
}

function HomeBackFromNewListButton({navigation,newListName,setDisplay}: HomeBackFromNewListButtonPropsInterface): React.JSX.Element {

    const {theme} = useContext(ThemeContext);
    
    const Close = ()=> {
        if(newListName?.length === 0) {
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

export default HomeBackFromNewListButton;