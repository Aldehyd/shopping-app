import React, { useContext } from 'react';
import {StyleSheet, Pressable} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import ThemeContext from '../../Contexts/Theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ShopInterface from '../../Interfaces/ShopInterface';

interface MainAddLinkPropsInterface {
  navigation: NativeStackNavigationProp<any>,
  link: string,
  shops?: ShopInterface[],
  setDisplay: (value: boolean)=>void
}

function MainAddLink({navigation,link,shops,setDisplay}: MainAddLinkPropsInterface): React.JSX.Element {

  const {theme} = useContext(ThemeContext);

  const onPressFunction = ()=> {
    if(link === 'list') {
      if(shops?.length === 0) {
        setDisplay(true);
      } else {
        navigation.navigate('NewList',{shops: shops});
      };
    } else {
      navigation.navigate('NewShop');
    };
  };

  return (
    <Pressable 
      style={[style.mainAddButton,{backgroundColor: theme}]}
      onPress={()=> onPressFunction()}
      >
      <EntypoIcon name="plus" size={50} color="#000" />
    </Pressable>
  );
}

const style = StyleSheet.create({
  mainAddButton: {
    alignSelf: 'center',
    height: 50,
    width: 50,
    fontWeight: 'bold',
    color: '#fff',
    borderRadius: 25,
  },
});

export default MainAddLink;
