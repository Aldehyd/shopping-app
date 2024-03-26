import React, {useContext} from 'react';
import {StyleSheet, Pressable, Text } from 'react-native';
import ThemeContext from '../../Contexts/Theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ShopInterface from '../../Interfaces/ShopInterface';
import DatasInterface from '../../Interfaces/DatasInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ModifyShopButtonPropsInterface {
    navigation: NativeStackNavigationProp<any>,
    shop: ShopInterface | undefined,
    editShopName: string,
    productsList: string[],
    setDisplayEmpty: (value: boolean)=>void,
    setDisplayAlready: (value: boolean)=>void
}

function ModifyShopButton({navigation,shop,editShopName,productsList,setDisplayEmpty,setDisplayAlready}: ModifyShopButtonPropsInterface): React.JSX.Element {

    const {theme} = useContext(ThemeContext);

    const EditShop = async ()=> {
        try {
            const datasString = await AsyncStorage.getItem("datas");
            let datas = {} as DatasInterface;
            if(datasString)
                datas = JSON.parse(datasString);

            let isAlreadySimilarShop = false;

            datas.shops.forEach(item => {
                if(item.title === editShopName && item.id !== shop?.id) {
                    isAlreadySimilarShop = true;
                };
            });

            if(isAlreadySimilarShop) {
                setDisplayAlready(true);
            } else if(shop) {

                let shopToEdit = datas.shops.find(item => item.id === shop.id);
                if(shopToEdit) {
                    shopToEdit.title = editShopName;
                    shopToEdit.products = productsList;
                };
                
                shopToEdit?.listsUsingThisShop.forEach(list => {
                    let listToModify = datas.lists.find(item => item.id === list.id);
                    let shopToModify = listToModify?.shops.find(shop => shop.id === shopToEdit?.id);
                    if(shopToModify && shopToEdit)
                        shopToModify.title = shopToEdit.title;
                });

                AsyncStorage.setItem("datas",JSON.stringify(datas));
                navigation.navigate('Home',{datas: datas});
            };
        } catch(error) {
            console.log(error);
        };
    };

    const onPressFunction = ()=> {
        if(productsList.length === 0 || editShopName.length === 0) {
            setDisplayEmpty(true);
        } else {
            EditShop();
        };
    };

    return(
        <Pressable
            style={[style.button,{backgroundColor: theme}]}
            onPress={()=> onPressFunction()}
        >
            <Text style={style.text}>Modifier le magasin</Text>
        </Pressable>
    );
}

const style = StyleSheet.create({
    button: {
        alignSelf: 'center',
        margin: 20,
        padding: 10,
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
    }
});

export default ModifyShopButton;