import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';

function Scrollview({children}: any): React.JSX.Element {
  return <ScrollView contentContainerStyle={style.scrollView}>{children}</ScrollView>;
}

const style = StyleSheet.create({
  scrollView: {
    flex: 1,
    color: 'white',
  },
});

export default Scrollview;
