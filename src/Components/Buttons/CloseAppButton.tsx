import React, { useContext } from 'react';
import {StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ThemeContext from '../../Contexts/Theme';

interface CloseAppButtonPropsInterface {
  setDisplay: (value: boolean)=> void
}

function CloseAppButton({setDisplay}: CloseAppButtonPropsInterface): React.JSX.Element {

  const {theme} = useContext(ThemeContext);
  
  return (
    <Pressable style={style.closeButton} onPress={()=> setDisplay(true)}>
     <Icon name="close" size={40} color={theme} />
    </Pressable>
  );
}

const style = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 20,
  },
});

export default CloseAppButton;
