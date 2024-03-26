import React from 'react';
import {StyleSheet, View} from 'react-native';
import AddedProductItem from '../Items/AddedProductItem';

interface ProductsNewShopPropsInterface {
    page: string,
    productsList: string[],
    setProductsList: (value: string[])=>void,
}

function ProductsNewShop({page,productsList, setProductsList}: ProductsNewShopPropsInterface): React.JSX.Element {

    return (
        <View style={style.list}>
        {productsList.map((item)=> <AddedProductItem page={page} title={item} 
                                        productsList={productsList} setProductsList={setProductsList} />)}
        </View>
    );
}

const style = StyleSheet.create({
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
});

export default ProductsNewShop;