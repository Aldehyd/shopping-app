import React from 'react';
import {StyleSheet, View} from 'react-native';
import AvailableShopItem from '../Items/AvailableShopItem';
import ShopInterface from '../../Interfaces/ShopInterface';
import ShopToAddInterface from '../../Interfaces/ShopToAddInterface';

interface ShopToAddListPropsInterface {
    page: string,
    data: ShopInterface[],
    shopsList: ShopToAddInterface[],
    setShopsList: (value: ShopToAddInterface[])=>void
}

function ShopToAddList({page,data,shopsList,setShopsList}: ShopToAddListPropsInterface): React.JSX.Element {
    return (
        <View style={style.list}>
            {data.map(item => <AvailableShopItem page={page} shop={item} shopsList={shopsList} setShopsList={setShopsList} />)}
        </View>
    );
}

const style = StyleSheet.create({
    list: {
        padding: 20,
    }
});

export default ShopToAddList;