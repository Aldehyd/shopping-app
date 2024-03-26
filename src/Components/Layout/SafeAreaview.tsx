import React from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';

interface SafeAreaViewPropsInterface {
  modalDisplayed?: boolean,
  children: any,
}

function SafeAreaview({modalDisplayed,children}: SafeAreaViewPropsInterface): React.JSX.Element {
  return (
    <SafeAreaView style={style.safeAreaView}>
      {modalDisplayed && <View style={style.darkLayer}></View>}
      {children}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  safeAreaView: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#000',
    color: '#fff'
  },
  darkLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    translateX: 10,
    flex: 1,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
  }
});

export default SafeAreaview;
