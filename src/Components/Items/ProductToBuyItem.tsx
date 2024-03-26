import React, { useContext, useState } from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import ThemeContext from '../../Contexts/Theme';
import ShoppingListProductInterface from '../../Interfaces/ShoppingListProductInterface';

interface ProductToBuyItemPropsInterface {
    item: ShoppingListProductInterface,
    count: number,
    setCount: (value: number)=>void
  }

function ProductToBuyItem({item,count,setCount}: ProductToBuyItemPropsInterface): React.JSX.Element {

    const {theme} = useContext(ThemeContext);
    
    const [bought, setBought] = useState(item.bought);

    const onPressFunction = ()=> {
        let newCount = count;
        if(bought) {
            newCount = newCount + 1; 
            item.bought = false;
        } else {
            newCount = newCount - 1; 
            item.bought = true;
        };
        setCount(newCount);
        setBought(!bought);

    };

    return(
        <Pressable style={[style.productToBuy,{backgroundColor: theme, borderColor: theme},bought && style.bought]} onPress={()=> onPressFunction()}>
            <Text style={style.text}>{item.title}</Text>
            {bought && <EntypoIcon name="check" size={20} color={theme} />}
        </Pressable>
    );
}

const style = StyleSheet.create({
    productToBuy: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        margin: 5,
        padding: 5,
        borderWidth: 2,
        borderRadius: 10
    },
    bought: {
        backgroundColor: '#000',
        opacity: 0.5,
    },
    text: {
        fontSize: 18,
    }
});

export default ProductToBuyItem;