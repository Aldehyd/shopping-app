import React, {useContext} from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import ThemeContext from '../../Contexts/Theme';

interface MainListButtonPropsInterface {
    title: string,
    display: boolean,
    setDisplay: (value: boolean)=>void
}

function MainListButton({title,display,setDisplay}: MainListButtonPropsInterface): React.JSX.Element {

  const {theme} = useContext(ThemeContext);

  const switchFunction = () => setDisplay(!display);

  return (
    <Pressable 
      style={[style.mainListButton,{borderColor: theme}]} 
      onPress={switchFunction}
    >
      <Text style={style.text}>{title}</Text>
      {display ? 
        <EntypoIcon name="triangle-up" size={30} color="#fff" />
      :
        <EntypoIcon name="triangle-down" size={30} color="#fff" /> 
      }
    </Pressable>
  );
}

const style = StyleSheet.create({
  mainListButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingBottom: 10,
    fontSize: 20,
    borderBottomWidth: 2,
  },
  text: {
    fontSize: 18,
  }
});

export default MainListButton;
