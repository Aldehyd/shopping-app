import React, { useContext } from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';
import ThemeContext from '../../Contexts/Theme';
import ListInterface from '../../Interfaces/ListInterface';
import ShopToAddInterface from '../../Interfaces/ShopToAddInterface';
import DatasInterface from '../../Interfaces/DatasInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface NewListNextButtonInterface {
    page: string,
    navigation: any,
    newListName?: string,
    editListName?: string,
    shopsList: ShopToAddInterface[],
    setDisplay: (value: boolean)=>void,
    setDisplayAlready: (value: boolean)=>void,
    currentList?: ListInterface
}
function NewListNextButton({page,navigation,newListName,editListName,shopsList,setDisplay,setDisplayAlready,currentList}: NewListNextButtonInterface): React.JSX.Element {
    
    const {theme} = useContext(ThemeContext);

    const CreateNewList = async ()=> {
        try {
            const datasString = await AsyncStorage.getItem("datas");
            let datas = {} as DatasInterface;
            if(datasString)
                datas = JSON.parse(datasString);

            let isAlreadySimilarList = false;

            datas.lists.forEach(list => {
                if(list.title === newListName?.toLowerCase()) {
                    isAlreadySimilarList = true;
                };
            });

            if(isAlreadySimilarList) {
                setDisplayAlready(true);
            } else {
                navigation.navigate('NewList_SelectProducts',{newListName: newListName, shopsList: shopsList.sort((a: ShopToAddInterface,b: ShopToAddInterface)=> {if(b.id > a.id) {return -1} else {return 1}})});
            };
        } catch(error) {
            console.log(error);
        };
    };

    const ModifyList = async ()=> {
        try {
            const datasString = await AsyncStorage.getItem("datas");
            let datas = {} as DatasInterface;
            if(datasString)
                datas = JSON.parse(datasString);

            let isAlreadySimilarList = false;

            datas.lists.forEach(list => {
                if(list.title === editListName?.toLowerCase() && list.id !== currentList?.id) {
                    isAlreadySimilarList = true;
                };
            });

            if(isAlreadySimilarList) {
                setDisplayAlready(true);
            } else {
                navigation.navigate('EditList_SelectProducts',{currentList: currentList, editListName: editListName, shopsList: shopsList.sort((a: ShopToAddInterface,b: ShopToAddInterface)=> {if(b.id > a.id) {return -1} else {return 1}})});
            };
        } catch(error) {
            console.log(error);
        };
    };

    const onPressFunction = ()=> {
        if(page === "new") {
            if(newListName?.length === 0 || shopsList.length === 0) {
                setDisplay(true);
            } else {
                CreateNewList();
            };
        } else {
            if(editListName?.length === 0 || shopsList.length === 0) {
                setDisplay(true);
            } else {
                ModifyList();
            };
        };
    };

    return (
        <Pressable
            style={[style.mainLink,{backgroundColor: theme}]}
            onPress={() => onPressFunction()}>
            <Text style={style.buttonText}>Suivant</Text>
        </Pressable>
    );
}

const style = StyleSheet.create({
    mainLink: {
      alignSelf: 'center',
      fontSize: 30,
      color: '#fff',
      padding: 10,
      borderRadius: 20,
      margin: 20,
    },
    buttonText: {
        fontSize: 16,
    }
  });

export default NewListNextButton;