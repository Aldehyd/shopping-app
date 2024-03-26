import React, {useState, useEffect, useContext} from 'react';
import { Pressable, StyleSheet, Text} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import ThemeContext from '../../Contexts/Theme';
import ShopInterface from '../../Interfaces/ShopInterface';
import ShopToAddInterface from '../../Interfaces/ShopToAddInterface';

interface AvailableShopItemPropsInterface {
    page: string,
    shop: ShopInterface,
    shopsList: ShopToAddInterface[],
    setShopsList: (value: ShopToAddInterface[])=>void
}

function AvailableShopItem({page,shop,shopsList,setShopsList}: AvailableShopItemPropsInterface): React.JSX.Element {
    
    const {theme} = useContext(ThemeContext);

    const [included,setIncluded] = useState<boolean>(false);

    useEffect( ()=> {
        if(page === "edit") {
            shopsList.forEach(item => {
                if(item.id === shop.id) {
                    setIncluded(true);
                };
            });
        };
    }, []);

    const onPressFunction = ()=> {
        setIncluded(!included);
        if(!included) {
            const newShop = {
                id: shop.id,
                title: shop.title,
                products: shop.products,
                selectedProducts: []
            };
            const newShopsList = shopsList;
            newShopsList.push(newShop);
            setShopsList(newShopsList);
        } else {
            const newShopsList = shopsList.filter((item) => item.id !== shop.id);
            setShopsList(newShopsList);
        };
    };

    return (
        <Pressable 
            style={[style.availableShop, included ? style.includedShop : {backgroundColor: theme}, {borderColor: theme}]} 
            onPress={()=> onPressFunction()}
        >
            <Text>{shop.title.toUpperCase()}</Text>
            {included && <EntypoIcon name="check" size={20} color={theme} />}
        </Pressable>
    );
}

const style = StyleSheet.create({
    availableShop: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 10,
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
    },
    includedShop: {
        opacity: 0.5,
    }
});

export default AvailableShopItem;