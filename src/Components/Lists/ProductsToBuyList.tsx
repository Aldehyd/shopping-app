import React from 'react';
import {View} from 'react-native';
import ShopWithProductsToBuy from '../Sections/ShopWithProductsToBuy';
import ShoppingListInterface from '../../Interfaces/ShoppingListInterface';

interface ProductsToBuyListInterface {
    list: ShoppingListInterface
}

function ProductsToBuyList({list}: ProductsToBuyListInterface): React.JSX.Element {
    return(
        <View>
            {list.shops.map(item => <ShopWithProductsToBuy shop={item} />)}
        </View>
    );
}

export default ProductsToBuyList;