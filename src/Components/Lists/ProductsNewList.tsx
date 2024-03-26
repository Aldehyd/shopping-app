import React from 'react';
import {View} from 'react-native';
import ShopWithProductsToAdd from '../Sections/ShopWithProductsToAdd';
import ShopToAddInterface from '../../Interfaces/ShopToAddInterface';

interface ProductsNewListPropsInterface {
    page: string,
    shopsList: ShopToAddInterface[],
    setShopsList: (value: ShopToAddInterface[])=>void
}

function ProductsNewList({page,shopsList,setShopsList}: ProductsNewListPropsInterface): React.JSX.Element {
    return (
        <View>
            {
                shopsList.map(item => <ShopWithProductsToAdd item={item} page={page} shopsList={shopsList} setShopsList={setShopsList} />)
            }
        </View>
    );
}

export default ProductsNewList;