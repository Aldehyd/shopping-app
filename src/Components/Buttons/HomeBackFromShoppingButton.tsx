import React, { useContext } from 'react';
import {StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ThemeContext from '../../Contexts/Theme';

interface HomeBackFromShoppingButtonPropsInterface {
    setDisplay: (value: boolean)=>void
}

function HomeBackFromShoppingButton({setDisplay}: HomeBackFromShoppingButtonPropsInterface): React.JSX.Element {

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
      top: 10,
      right: 20,
    },
  });

export default HomeBackFromShoppingButton;