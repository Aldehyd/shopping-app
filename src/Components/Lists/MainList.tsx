import React from 'react';
import {StyleSheet, View} from 'react-native';
import MainListsItem from '../Items/MainListsItem';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ListInterface from '../../Interfaces/ListInterface';
import ShopInterface from '../../Interfaces/ShopInterface';
import DatasInterface from '../../Interfaces/DatasInterface';

interface MainListPropsInterface {
    navigation: NativeStackNavigationProp<any>,
    data: ListInterface[] | ShopInterface[],
    datas?: DatasInterface,
    setItemToRemove: (value: ShopInterface | ListInterface)=>void,
    setDisplayed: (value:boolean)=>void,
    setWarningDisplayed: (value:boolean)=>void,
}

function MainList({navigation,data,datas,setItemToRemove,setDisplayed,setWarningDisplayed}: MainListPropsInterface): React.JSX.Element {
    return (
        <View style={style.mainList}>
            {datas && data.map((item) => <MainListsItem navigation={navigation} item={item} datas={datas} setItemToRemove={setItemToRemove} setDisplayed={setDisplayed} setWarningDisplayed={setWarningDisplayed} />)}
        </View>
    );
}

const style = StyleSheet.create({
    mainList: {
        padding: 10,
        paddingBottom: 0,
        marginBottom: 10,
    }
});

export default MainList;