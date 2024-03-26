import React, {useContext} from 'react';
import ThemeContext from '../../Contexts/Theme';
import {StyleSheet, Text} from 'react-native';

interface MainTitlePropsInterface {
  title: string
}

function MainTitle({title}: MainTitlePropsInterface): React.JSX.Element {

  const {theme} = useContext(ThemeContext);

  return <Text style={[style.mainTitle,{color: theme}]}>{title}</Text>;
}

const style = StyleSheet.create({
  mainTitle: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 20,
  },
});

export default MainTitle;
