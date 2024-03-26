import React, { useContext } from 'react';
import {StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ThemeContext from '../../Contexts/Theme';

interface HelpButtonPropsInterface {
  setDisplay: (value: boolean)=> void
}

function HelpButton({setDisplay}: HelpButtonPropsInterface): React.JSX.Element {

  const {theme} = useContext(ThemeContext);

  return (
    <Pressable style={style.settingsButton} onPress={()=> setDisplay(true)}>
     <Icon name="question-circle-o" size={40} color={theme} />
    </Pressable>
  );
}

const style = StyleSheet.create({
  settingsButton: {
    position: 'absolute',
    top: 15,
    left: 90,
  },
});

export default HelpButton;
