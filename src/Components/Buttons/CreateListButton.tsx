import React, { useContext } from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';
import ThemeContext from '../../Contexts/Theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ShopToAddInterface from '../../Interfaces/ShopToAddInterface';
import DatasInterface from '../../Interfaces/DatasInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShopInterface from '../../Interfaces/ShopInterface';

interface CreateListButtonPropsInterface {
    navigation: NativeStackNavigationProp<any>,
    setDisplay: (value: boolean)=>void,
    newListName: string,
    shopsList: ShopToAddInterface[],
}

function CreateListButton({navigation,newListName,shopsList,setDisplay}: CreateListButtonPropsInterface): React.JSX.Element {

    const {theme} = useContext(ThemeContext);

    const CreateNewList = async ()=> {
        try {
            const datasString = await AsyncStorage.getItem("datas");
            let datas = {} as DatasInterface;
            if(datasString)
                datas = JSON.parse(datasString);

            let newListShops = [] as ShopInterface[];
            shopsList.forEach(item => {
                newListShops.push({
                    id: item.id,
                    title: item.title,
                    products: item.selectedProducts,
                    listsUsingThisShop: [],
                    type: 'shop'
                });
            })
            const newList = {
                id: `list-${datas.lists.length}`,
                title: newListName.toLowerCase(),
                shops: newListShops,
                type: 'list'
            };
            newList.shops.forEach(shop => {
                const shopToModify = datas.shops.find(item => item.id === shop.id);
                shopToModify?.listsUsingThisShop.push(newList);
            });
            datas.lists.push(newList);
            datas.lists.sort((a,b)=> {
                if(b.title > a.title) {
                    return -1;
                } else {
                    return 1;
                }
            });
            
            AsyncStorage.setItem("datas",JSON.stringify(datas));

            navigation.navigate('Home',{datas: datas});

        } catch(error) {
            console.log(error);
        };
    };

    const onPressFunction = ()=> {
        let isEmptyShop = false;
        shopsList.forEach(shop => {
            if(shop.selectedProducts.length === 0) {
                isEmptyShop = true;
            };
        });
        if(isEmptyShop) {
            setDisplay(true)
        } else {
            CreateNewList();
        };
    };

    return(
        <Pressable
            style={[style.button,{backgroundColor: theme}]}
            onPress={()=> onPressFunction()}
        >
            <Text style={style.text}>Créer liste</Text>
        </Pressable>
    );
}

const style = StyleSheet.create({
    button: {
      alignSelf: 'center',
      fontSize: 30,
      color: '#fff',
      padding: 10,
      borderRadius: 20,
      margin: 20,
    },
    text: {
        fontSize: 18,
    }
  });

export default CreateListButton