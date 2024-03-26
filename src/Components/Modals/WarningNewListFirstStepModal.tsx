import React, { useContext } from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';
import Modalview from '../Layout/Modalview';
import CloseButton from '../Buttons/CloseButton';
import ThemeContext from '../../Contexts/Theme';
import ShopToAddInterface from '../../Interfaces/ShopToAddInterface';

interface WarningNewListFirstStepModalPropsInterface {
  page: string,
  newListName?: string,
  editListName?: string,
  shopsList: ShopToAddInterface[],
  setDisplay: (value: boolean)=> void,
}

function WarningNewListFirstStepModal({page,newListName,editListName,shopsList,setDisplay}: WarningNewListFirstStepModalPropsInterface): React.JSX.Element {

  const {theme} = useContext(ThemeContext);
  
  return (
    <Modalview marginTop="150">
        <CloseButton setDisplay={()=> setDisplay(false)} />
        {page ==="new" && newListName?.length === 0 && <Text style={style.text}>La liste doit avoir un nom.</Text>}
        {page ==="edit" && editListName?.length === 0 && <Text style={style.text}>La liste doit avoir un nom.</Text>}
        {page ==="new" && newListName && newListName.length > 0 && shopsList.length === 0 && <Text style={style.text}>Veuillez ajouter au moins un magasin.</Text>}
        {page ==="edit" && editListName && editListName.length > 0 && shopsList.length === 0 && <Text style={style.text}>Veuillez ajouter au moins un magasin.</Text>}
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
      fontSize: 18,
    },
    text: {
      fontSize: 18,
    }
});

export default WarningNewListFirstStepModal;