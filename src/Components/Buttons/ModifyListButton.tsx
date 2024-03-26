import React, { useContext } from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';
import ThemeContext from '../../Contexts/Theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ListInterface from '../../Interfaces/ListInterface';
import DatasInterface from '../../Interfaces/DatasInterface';
import ShopToAddInterface from '../../Interfaces/ShopToAddInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ModifyListButtonPropsInterface {
    navigation: NativeStackNavigationProp<any>,
    list: ListInterface | undefined,
    shopsList: ShopToAddInterface[],
    editListName: string,
    setDisplay: (value: boolean)=>void
}

function ModifyListButton({navigation,list,shopsList,editListName,setDisplay}: ModifyListButtonPropsInterface): React.JSX.Element {
   
    const {theme} = useContext(ThemeContext);

    const ModifyList = async ()=> {
        console.log(list)
        try {
            const datasString = await AsyncStorage.getItem("datas");
            let datas = {} as DatasInterface;
            if(datasString)
                datas = JSON.parse(datasString);
            
            if(list) {
                let listToModify = datas.lists.find(item => item.id === list.id)
                if(listToModify) {
                    listToModify.title = editListName.toLowerCase();

                    let shopsId: string[] = [];
                    shopsList.forEach(item => {
                        let shopToModify = listToModify?.shops.find(shop => shop.id === item.id)
                        if(shopToModify) {
                            shopToModify.products = item.selectedProducts.sort();
                        } else {
                            listToModify?.shops.push({
                                id: item.id,
                                title: item.title,
                                products: item.selectedProducts.sort(),
                                listsUsingThisShop: [],
                                type: 'shops'
                            });
                        };
                        shopsId.push(item.id);
                    });
                    listToModify.shops.forEach(item=> {
                        if(!shopsId.includes(item.id) && listToModify) {
                            listToModify.shops = listToModify?.shops.filter(shop => shop.id !== item.id);
                        };
                    });
                    
                };
                if(listToModify) 
                    listToModify.shops.forEach(shop => {
                        const shopToModify = datas.shops.find(item => item.id === shop.id);
                        let isListAlreadyInListsUsingThisShop = false;
                        shopToModify?.listsUsingThisShop.forEach(item => {
                            if(item.id === list.id) {
                                isListAlreadyInListsUsingThisShop = true;
                            };
                        });
                        if(!isListAlreadyInListsUsingThisShop && listToModify) {
                            shopToModify?.listsUsingThisShop.push(listToModify);
                        };
                    });
             
                datas.shops.forEach(shop => {
                    shop.listsUsingThisShop.forEach(item => {
                        if(item.id === listToModify?.id) {
                            let isShopStillInThisList = false;
                            listToModify.shops.forEach(item => {
                                if(item.id === shop.id) {
                                    isShopStillInThisList = true;
                                };
                            });
                            if(!isShopStillInThisList) {
                                const newList = shop.listsUsingThisShop.filter(item => {return(item.id !== listToModify?.id)});
                                shop.listsUsingThisShop = newList;
                            } else {
                                //modifier nom liste dans listsusingthisshop
                                item.title = listToModify.title;
                            };
                        };
                    });
                });
            };

            datas.lists.sort((a,b)=> {
                if(b.title > a.title) {
                    return -1; 
                } else {
                    return 1;
                };
            });
            
            AsyncStorage.setItem("datas",JSON.stringify(datas));
            navigation.navigate('Home',{datas: datas});
        } catch(error) {
            console.log(error);
        }
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
        } else if(list) {
            ModifyList();
        };
    };
    
    return(
        <Pressable
            style={[style.button,{backgroundColor: theme}]}
            onPress={()=> onPressFunction()}
        >
            <Text style={style.text}>Modifier la liste</Text>
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

export default ModifyListButton