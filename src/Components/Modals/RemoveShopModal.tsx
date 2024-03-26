import React, {useContext} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import Modalview from '../Layout/Modalview';
import CloseButton from '../Buttons/CloseButton';
import PreviousAndNext from '../Layout/PreviousAndNext';
import ThemeContext from '../../Contexts/Theme';
import ShopInterface from '../../Interfaces/ShopInterface';
import DatasInterface from '../../Interfaces/DatasInterface';
import ListInterface from '../../Interfaces/ListInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RemoveShopModalPropsInterface {
    itemToRemove: ShopInterface | ListInterface,
    setDisplay: (value: boolean)=> void,
    datas: DatasInterface,
}

function RemoveShopModal({itemToRemove,setDisplay,datas}: RemoveShopModalPropsInterface): React.JSX.Element {

    const {theme} = useContext(ThemeContext);
    
    const RemoveShopFunction = ()=> {
        function isShopInterface(item: any): item is ShopInterface {
            return true;
        };
        if(isShopInterface(itemToRemove))
            itemToRemove.listsUsingThisShop.forEach(item => {
                let listUsingThisShop = datas.lists.find(list => list.id === item.id);
                if(listUsingThisShop)
                    listUsingThisShop.shops = listUsingThisShop.shops.filter(shop => shop.id !== itemToRemove.id);
            });

        const newList = datas.shops.filter((shop)=> shop.id !== itemToRemove.id);
        datas.shops = newList;
        AsyncStorage.setItem("datas",JSON.stringify(datas));
        setDisplay(false);
    };

    const CancelRemoveShopFunction = ()=> {
        setDisplay(false);
    }

    return (
        <Modalview marginTop="150">
            <CloseButton setDisplay={setDisplay} />
            <Text style={style.text}>{'Supprimer le magasin "' + itemToRemove.title + '" ?'}</Text>
            <PreviousAndNext>
                <Pressable 
                    style={[style.buttons,{backgroundColor: theme}]}
                    onPress= {()=> RemoveShopFunction()}
                >
                    <Text style={style.buttonText}>Oui</Text>
                </Pressable>
                <Pressable 
                    style={[style.buttons,{backgroundColor: theme}]}
                    onPress={()=> CancelRemoveShopFunction()}
                >
                    <Text style={style.buttonText}>Non</Text>
                </Pressable>
            </PreviousAndNext>
        </Modalview>
    );
}

const style = StyleSheet.create({
    buttons: {
        padding: 10,
        borderRadius: 20,
    },
    buttonText: {
        fontSize: 16,
    },
    text: {
        fontSize: 18,
    }
});

export default RemoveShopModal;