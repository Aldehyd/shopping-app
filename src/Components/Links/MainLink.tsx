import React, { useContext } from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';
import ThemeContext from '../../Contexts/Theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface MainLinkPropsInterface {
  title: string,
  navigation: NativeStackNavigationProp<any>,
  link: string,
  disabled?: boolean
  params?: any
}

function MainLink({link,title,navigation,disabled=false,params}: MainLinkPropsInterface): React.JSX.Element {

  const {theme} = useContext(ThemeContext);

  return (
    <Pressable
      style={[style.mainLink,disabled && style.disabled,{backgroundColor: theme}]}
      onPress={() => navigation.navigate(link,params)}
      disabled={disabled}
    >
      <Text style={style.text}>{title}</Text>
    </Pressable>
  );
}

const style = StyleSheet.create({
  mainLink: {
    alignSelf: 'center',
    padding: 10,
    borderRadius: 20,
    margin: 20,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 18,
  }
});

export default MainLink;
