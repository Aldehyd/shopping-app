import React, {useContext} from 'react';
import ThemeContext from '../../Contexts/Theme';
import {StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface CloseButtonPropsInterface {
  setDisplay: (value: boolean)=> void
}

function CloseButton({setDisplay}: CloseButtonPropsInterface): React.JSX.Element {

  const {theme} = useContext(ThemeContext);

  return (
    <Pressable style={style.closeButton} onPress={()=> setDisplay(false)}>
     <Icon name="close" size={35} color={theme} />
    </Pressable>
  );
}

const style = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 10,
  },
});

export default CloseButton;
