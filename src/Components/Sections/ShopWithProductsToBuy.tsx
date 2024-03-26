import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import CurrentShopButton from '../Buttons/CurrentShopButton';
import ProductsContainer from '../Containers/ProductsContainer';
import ProductToBuyItem from '../Items/ProductToBuyItem';
import ShoppingListShopInterface from '../../Interfaces/ShoppingListShopsInterface';

interface ShopWithProductsToBuyPropsInterface {
    shop: ShoppingListShopInterface
  }

function ShopWithProductsToBuy({shop}: ShopWithProductsToBuyPropsInterface): React.JSX.Element {

    const remainingAmount = shop.products.filter(product => product.bought === false).length;
    const [remainingCount, setRemainingCount] = useState(remainingAmount);
    const [display,setDisplay] = useState(false);

    return(
        <>
            <CurrentShopButton display={display} setDisplay={setDisplay} shop={shop} count={remainingCount} />
            {display && 
            <ProductsContainer>
                <View style={style.list}>
                    {shop.products.map(item => <ProductToBuyItem count={remainingCount} setCount={setRemainingCount} 
                                                                 item={item} />)}
                </View>
            </ProductsContainer>}
        </>
    );
}

const style = StyleSheet.create({
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
});

export default ShopWithProductsToBuy;