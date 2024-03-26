import React from 'react';
import {StyleSheet, View} from 'react-native';
import ProductToAddItem from '../Items/ProductToAddItem';
import ListShopInterface from '../../Interfaces/ListShopInterface';
import ShopToAddInterface from '../../Interfaces/ShopToAddInterface';

interface ProductsToAddNewListPropsInterface {
    shop: ListShopInterface,
    page: string,
    shopsList: ShopToAddInterface[],
    setShopsList: (value: ShopToAddInterface[])=>void
}

function ProductsToAddNewList({shop,page,shopsList,setShopsList}: ProductsToAddNewListPropsInterface): React.JSX.Element {
    return(
        <View style={style.list}>
            {shop.products.map(item => <ProductToAddItem page={page} shop={shop} title={item} shopsList={shopsList} setShopsList={setShopsList} />)}
        </View>
    );
}

const style = StyleSheet.create({
    list: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

export default ProductsToAddNewList;