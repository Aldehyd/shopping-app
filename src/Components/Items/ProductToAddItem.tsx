import React, {useState,useEffect, useContext } from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo'
import ThemeContext from '../../Contexts/Theme';
import ListShopInterface from '../../Interfaces/ListShopInterface';
import ShopToAddInterface from '../../Interfaces/ShopToAddInterface';

interface ProductToAddItemPropsInterface {
    page: string,
    shop: ListShopInterface,
    title: string,
    shopsList: ShopToAddInterface[],
    setShopsList: (value: ShopToAddInterface[])=>void
  }

function ProductToAddItem({page,shop,title,shopsList,setShopsList}: ProductToAddItemPropsInterface): React.JSX.Element {

    const {theme} = useContext(ThemeContext);

    const [added,setAdded] = useState<boolean>(false);

    useEffect(()=> {
        if(page === "edit") {
            if(shop?.selectedProducts?.includes(title)) {
                setAdded(true);
            };
        };
    },[]);

    useEffect(()=> {
        if(added) { 
            shop.selectedProducts.push(title);
        } else {
            shop.selectedProducts = shop.selectedProducts.filter(item => item !== title);
        };
        setShopsList(shopsList);
    },[added])

    return(
        <Pressable 
            style={[style.productToAdd,{backgroundColor: theme},added && style.addedProduct,{borderColor: theme}]}
            onPress={()=> setAdded(added => !added)}
        >
            <Text>{title}</Text>
            {added && <EntypoIcon name="check" size={20} color={theme} />}
        </Pressable>
    );
}

const style = StyleSheet.create({
    productToAdd: {
        alignSelf: 'center',
        flexDirection: 'row',
        gap: 5,
        margin: 5,
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
    },
    addedProduct: {
        backgroundColor: '#000',
        opacity: 0.5,
    }
});

export default ProductToAddItem;