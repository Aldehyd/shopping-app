import React, { useContext } from 'react';
import {StyleSheet, Pressable} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import ThemeContext from '../../Contexts/Theme';
import ShopInterface from '../../Interfaces/ShopInterface';
import ListInterface from '../../Interfaces/ListInterface';

interface RemoveMainListsItemButtonPropsInterface {
  item: ShopInterface | ListInterface,
  setItemToRemove: (value: ShopInterface | ListInterface)=>void,
  setDisplayed: (value: boolean)=>void,
  setWarningDisplayed: (value: boolean)=>void
}

function RemoveMainListsItemButton({item, setItemToRemove, setDisplayed, setWarningDisplayed}: RemoveMainListsItemButtonPropsInterface): React.JSX.Element {

  const {theme} = useContext(ThemeContext);

  const RemoveItem = ()=> {
    if(item.type === "list") {
      function isListInterface(item: ListInterface | ShopInterface): item is ListInterface {
        return true;
      };
      if(isListInterface(item))
        setItemToRemove(item);
        
      setDisplayed(true);
    } else {
      function isShopInterface(item: ListInterface | ShopInterface): item is ShopInterface {
        return true;
      };
      if(isShopInterface(item))
        if(item.listsUsingThisShop.length > 0) {
          setItemToRemove(item);
          setWarningDisplayed(true);
        } else {
          setItemToRemove(item);
  
          setDisplayed(true);
        };
    };
  };

  return (
    <Pressable
        style={style.removeButton}
        onPress={()=> RemoveItem()}
    >
        <Icon name="remove" size={25} color={theme} />
    </Pressable>
  );
}

const style = StyleSheet.create({
    removeButton: {
        borderRadius: 2,
    }
});

export default RemoveMainListsItemButton;