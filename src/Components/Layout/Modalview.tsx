import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import ThemeContext from '../../Contexts/Theme';

interface ModalViewPropsInterface {
  children: any,
  priority?: boolean,
  marginTop: string
}

function Modalview({children,priority=false,marginTop}: ModalViewPropsInterface): React.JSX.Element {

  const {theme} = useContext(ThemeContext);
  
  return (
    <View 
      style={[style.modalLayout,priority && style.priority,{borderColor: theme, transform: `translateY(-${marginTop}px)`}]}
    >
    {children}
    </View>
  );
}

const style = StyleSheet.create({
    modalLayout: {
      position: 'absolute',
      zIndex: 1,
      alignSelf: 'center',
      top: '50%',
      justifyContent: 'center',
      minWidth: '60%',
      padding: 15,
      paddingTop: 50,
      backgroundColor: '#000',
      borderRadius: 10,
      borderWidth: 2,
    },
    priority: {
      zIndex: 3,
    }
});

export default Modalview;