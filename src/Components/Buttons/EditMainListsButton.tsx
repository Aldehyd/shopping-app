import React, {useContext} from 'react';
import {Pressable} from "react-native";
import EntypoIcon from 'react-native-vector-icons/Entypo';
import ThemeContext from '../../Contexts/Theme';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ShopInterface from '../../Interfaces/ShopInterface';
import ListInterface from '../../Interfaces/ListInterface';
import DatasInterface from '../../Interfaces/DatasInterface';

interface EditMainListButtonPropsInterface {
    navigation: NativeStackNavigationProp<any>,
    item: ShopInterface | ListInterface,
    datas?: DatasInterface
}

function EditMainListsButton({navigation,item,datas}: EditMainListButtonPropsInterface): React.JSX.Element {

    const {theme} = useContext(ThemeContext);

  return (
    <Pressable
        onPress={()=> {
            if(item.type === 'list') {
                function isListInterface(item: ListInterface | ShopInterface): item is ListInterface {
                    return true;
                };
                if(isListInterface(item))
                    navigation.navigate('EditList',{currentList: item,shops: datas?.shops});
            } else {
                function isShopInterface(item: ListInterface | ShopInterface): item is ShopInterface {
                    return true;
                };
                if(isShopInterface(item))
                    navigation.navigate('EditShop',{currentShop: item});
            };
        }
    }>
        <EntypoIcon name="edit" size={25} color={theme} />
    </Pressable>
  );
}

export default EditMainListsButton;