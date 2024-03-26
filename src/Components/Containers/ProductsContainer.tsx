import React, { useContext } from 'react';
import {StyleSheet, ScrollView} from "react-native";
import ThemeContext from '../../Contexts/Theme';

function ProductsContainer({children}: any): React.JSX.Element {
  
  const {theme} = useContext(ThemeContext);

  return (
    <ScrollView style={[style.productsContainer,{borderColor: theme}]} contentContainerStyle={style.contentContainer}>
        {children}
    </ScrollView>
  );
}

const style = StyleSheet.create({
    productsContainer: {
      marginTop: 10,
      padding: 10,
      borderRadius: 10,
      borderWidth: 2,
    },
    contentContainer: {
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 10,
    }
});

export default ProductsContainer;