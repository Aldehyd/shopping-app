import React, {useContext} from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';
import ThemeContext from '../../Contexts/Theme';

import { NativeStackNavigationProp} from '@react-navigation/native-stack';
import DatasInterface from '../../Interfaces/DatasInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AddShopButtonPropsInterface {
    navigation: NativeStackNavigationProp<any>,
    setDisplayEmpty: (value: boolean)=>void,
    setDisplayAlready: (value: boolean)=>void,
    productsList: string[],
    newShopName: string
}

function AddShopButton({navigation, setDisplayEmpty,setDisplayAlready,productsList,newShopName}: AddShopButtonPropsInterface): React.JSX.Element {

    const {theme} = useContext(ThemeContext);

    const AddShop = async ()=> { 
        try {
            const datasString = await AsyncStorage.getItem("datas");
            let datas = {} as DatasInterface;
            if(datasString)
                datas = JSON.parse(datasString);
            
            let isAlreadySimilarShop = false;
            
            datas.shops.forEach(shop => {
                if(shop.title === newShopName) {
                    isAlreadySimilarShop = true;
                };
            });

            if(isAlreadySimilarShop) {
                setDisplayAlready(true);
            } else {
                const id = `shop-${datas.shops.length}`;

                const newShop = {
                    id: id,
                    title: newShopName,
                    products: productsList,
                    listsUsingThisShop: [],
                    type: 'shop'
                };
        
                datas.shops.push(newShop);
                datas.shops.sort((a,b) => {
                    if(b.title > a.title) {
                        return -1;
                    } else {
                        return 1; //only to avoid typescript error
                    }
                });

                AsyncStorage.setItem("datas",JSON.stringify(datas));
                navigation.navigate('Home',{datas: datas})
            };
        } catch(error) {
            console.log(error);
        };
    };

    const CheckNewShop = ()=> {
        if(productsList.length === 0 || newShopName.length === 0) {
            setDisplayEmpty(true);
        } else {
            AddShop();
        };
    };

    return(
        <Pressable
            style={[style.button,{backgroundColor: theme}]}
            onPress={()=> CheckNewShop()}
        >
            <Text style={style.text}>Créer le magasin</Text>
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

export default AddShopButton;