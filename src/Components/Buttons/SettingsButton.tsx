import React,{useContext} from 'react';
import ThemeContext from '../../Contexts/Theme';
import {StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface SettingsButtonPropsInterface {
  navigation: NativeStackNavigationProp<any>
}

function SettingsButton({navigation}: SettingsButtonPropsInterface): React.JSX.Element {

  const {theme} = useContext(ThemeContext);

  return (
    <Pressable style={style.settingsButton} onPress={()=> navigation.navigate('Settings')}>
     <Icon name="settings-sharp" size={40} color={theme} />
    </Pressable>
  );
}

const style = StyleSheet.create({
  settingsButton: {
    position: 'absolute',
    top: 15,
    left: 20,
  },
});

export default SettingsButton;
