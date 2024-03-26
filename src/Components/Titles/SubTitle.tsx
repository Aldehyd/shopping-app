import React from 'react';
import {StyleSheet, Text} from 'react-native';

interface SubTitlePropsInterface {
  subtitle: string,
}

function SubTitle({subtitle}: SubTitlePropsInterface): React.JSX.Element {
  return <Text style={style.subTitle}>{subtitle}</Text>;
}

const style = StyleSheet.create({
  subTitle: {
    fontSize: 18,
  },
});

export default SubTitle;
