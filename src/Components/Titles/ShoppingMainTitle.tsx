import React, {useContext} from 'react';
import ThemeContext from '../../Contexts/Theme';
import {StyleSheet, Text, View} from 'react-native';

interface ShoppingMainTitlePropsInterface {
  title: string
}

function ShoppingMainTitle({title}: ShoppingMainTitlePropsInterface): React.JSX.Element {

  const {theme} = useContext(ThemeContext);

  return (
    <View>
        <Text style={[style.mainTitle,{color: theme}]}>Courses en cours :</Text>
        <Text style={[style.listName,{color: theme}]}>{title.toUpperCase()}</Text>
    </View>
    
  );
}

const style = StyleSheet.create({
  mainTitle: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '600',
    marginTop: 20,
  },
  listName: {
    alignSelf: 'center',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
});

export default ShoppingMainTitle;
