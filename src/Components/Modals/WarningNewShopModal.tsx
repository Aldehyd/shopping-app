import React, { useContext } from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';
import Modalview from '../Layout/Modalview';
import CloseButton from '../Buttons/CloseButton';
import ThemeContext from '../../Contexts/Theme';

interface WarningNewShopModalPropsInterface {
  page: string,
  setDisplay: (value: boolean)=> void,
  newShopName?: string,
  editShopName?:string,
  productsList: string[]
}

function WarningNewShopModal({page,newShopName,editShopName,productsList,setDisplay}: WarningNewShopModalPropsInterface): React.JSX.Element {

  const {theme} = useContext(ThemeContext);

  return (
    <Modalview marginTop="150">
        <CloseButton setDisplay={()=> setDisplay(false)} />
        {page==="new" && newShopName?.length === 0 && <Text style={style.text}>Le magasin doit avoir un nom.</Text>}
        {page==="new" && newShopName && newShopName.length > 0 && productsList.length === 0 && <Text style={style.text}>Le magasin doit contenir au moins un article.</Text>}
        {page==="edit" && editShopName?.length === 0 && <Text style={style.text}>Le magasin doit avoir un nom.</Text>}
        {page==="edit" && editShopName && editShopName.length > 0 && productsList.length === 0 && <Text style={style.text}>Le magasin doit contenir au moins un article.</Text>}
        <Pressable style={[style.button,{backgroundColor: theme}]} onPress={()=> setDisplay(false)}>
            <Text style={style.buttonText}>OK</Text>
        </Pressable>
    </Modalview>
  );
}

const style = StyleSheet.create({
    button: {
        alignSelf: 'center',
        margin: 20,
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
      fontSize: 16,
    },
    text: {
      fontSize: 16
    }
});

export default WarningNewShopModal;