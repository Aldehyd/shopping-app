import React, {useContext} from 'react';
import {StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ThemeContext from '../../Contexts/Theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ListInterface from '../../Interfaces/ListInterface';
import ShopToAddInterface from '../../Interfaces/ShopToAddInterface';

interface HomeBackFromEditListButtonPropsInterface {
    navigation: NativeStackNavigationProp<any>,
    currentList: ListInterface | undefined,
    editListName: string | undefined,
    shopsList: ShopToAddInterface[],
    setDisplay: (value: boolean)=>void
}

function HomeBackFromEditListButton({navigation,editListName,shopsList,currentList,setDisplay}: HomeBackFromEditListButtonPropsInterface): React.JSX.Element {

    const {theme} = useContext(ThemeContext);

    const Close = ()=> {
        let isAnyModification: boolean = false;
        if(editListName !== currentList?.title) {
            isAnyModification = true;
        } else {
            let currentListShopsIds = currentList?.shops.map(shop => {return shop.id});
            let shopsListIds = shopsList.map(shop => {return shop.id});
            if(currentListShopsIds?.length !== shopsListIds?.length || currentListShopsIds?.every((id,i)=>{ return id !== shopsListIds[i]})) {
                isAnyModification = true;
            };
        };
        
        if(!isAnyModification) {
            navigation.navigate('Home');
        } else {
            setDisplay(true);
        };
    };

    return (
        <Pressable style={style.closeButton} onPress={()=> Close()}>
            <Icon name="close" size={40} color={theme} />
        </Pressable>
    );
}

const style = StyleSheet.create({
    closeButton: {
      position: 'absolute',
      top: 10,
      right: 20,
    },
  });

export default HomeBackFromEditListButton;