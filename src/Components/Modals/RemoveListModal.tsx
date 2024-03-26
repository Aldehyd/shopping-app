import React, {useContext} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import Modalview from '../Layout/Modalview';
import CloseButton from '../Buttons/CloseButton';
import PreviousAndNext from '../Layout/PreviousAndNext';
import ThemeContext from '../../Contexts/Theme';
import ListInterface from '../../Interfaces/ListInterface';
import ShopInterface from '../../Interfaces/ShopInterface';
import DatasInterface from '../../Interfaces/DatasInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RemoveListModalPropsInterface {
    itemToRemove: ShopInterface | ListInterface,
    datas: DatasInterface,
    setDisplay: (value: boolean)=> void,
    setDatas: (value: DatasInterface)=>void
}

function RemoveListModal({itemToRemove,setDisplay,datas,setDatas}: RemoveListModalPropsInterface): React.JSX.Element {

    const {theme} = useContext(ThemeContext);

    const RemoveList = async ()=> {
        const newList = datas.lists.filter((list)=> list.id !== itemToRemove.id);
        datas.lists = newList;
        datas.shops.forEach(shop => {
            shop.listsUsingThisShop.forEach(item => {
                if(item.id === itemToRemove.id) {
                    const newList = shop.listsUsingThisShop.filter(item => {return(item.id !== itemToRemove.id)});
                    shop.listsUsingThisShop = newList;
                };
            });
        });
        datas.lists = newList;
        AsyncStorage.setItem("datas",JSON.stringify(datas));
        setDatas(datas);
        setDisplay(false);
    };

    return (
        <Modalview marginTop="150">
            <CloseButton setDisplay={setDisplay} />
            <Text style={style.text}>{'Supprimer la liste "' + itemToRemove.title + '" ?'}</Text>
            <PreviousAndNext>
                <Pressable 
                    style={[style.buttons,{backgroundColor: theme}]}
                    onPress= {()=> RemoveList()}
                >
                    <Text style={style.buttonText}>Oui</Text>
                </Pressable>
                <Pressable 
                    style={[style.buttons,{backgroundColor: theme}]}
                    onPress={()=> setDisplay(false)}
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

export default RemoveListModal;