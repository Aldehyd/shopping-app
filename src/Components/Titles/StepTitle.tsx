import React, { useContext } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ThemeContext from '../../Contexts/Theme';

interface StepTitlePropsInterface {
  title: string,
  stepCount: string
}

function StepTitle({stepCount,title}: StepTitlePropsInterface): React.JSX.Element {

  const {theme} = useContext(ThemeContext);

  return (
    <View style={style.view}>
        <Text style={[style.subTitle,{color: theme}]}>{'Etape ' + stepCount + ' :  '}</Text>
        <Text style={style.subTitle}>{title}</Text>
    </View>
  );
}

const style = StyleSheet.create({
    view: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default StepTitle;
