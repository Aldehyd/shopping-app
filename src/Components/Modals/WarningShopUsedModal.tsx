import React, { useContext } from 'react';
import {StyleSheet, Text, Pressable, FlatList} from 'react-native';
import Modalview from '../Layout/Modalview';
import CloseButton from '../Buttons/CloseButton';
import ThemeContext from '../../Contexts/Theme';
import BasicListItem from '../Items/BasicListItem';
import PreviousAndNext from '../Layout/PreviousAndNext';
import ShopInterface from '../../Interfaces/ShopInterface';
import ListInterface from '../../Interfaces/ListInterface';
import DatasInterface from '../../Interfaces/DatasInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WarningShopUsedModalPropsInterface {
  setDisplay: (value: boolean)=> void,
  itemToRemove: ShopInterface | ListInterface,
  datas: DatasInterface,
  setDatas: (value: DatasInterface)=>void,
}

function WarningShopUsedModal({setDisplay,itemToRemove,datas,setDatas}: WarningShopUsedModalPropsInterface): React.JSX.Element {

  const {theme} = useContext(ThemeContext);

  function isShop(item: ShopInterface | ListInterface): item is ShopInterface {
    return true;
  };

  const RemoveShopFunction = ()=> {
    const newList = datas.shops.filter((shop)=> shop.id !== itemToRemove.id);
    datas.shops = newList;

    if(isShop(itemToRemove))
      itemToRemove.listsUsingThisShop.forEach(list => {
          const listToModify = datas.lists.find(item => item.id === list.id);
          const newShopsList = listToModify?.shops.filter(item => item.id !== itemToRemove.id);

          if(newShopsList?.length === 0) {
              const newListsList = datas.lists.filter(item => {return(item.id !== list.id)});
              datas.lists = newListsList;
              setDatas(datas);
          } else if (newShopsList) {
              list.shops = newShopsList;
          };
      });
    
    datas.shops = newList;
    setDatas(datas);
    AsyncStorage.setItem("datas",JSON.stringify(datas));
    setDisplay(false);
    };

  return (
    <Modalview marginTop="300">
        <CloseButton setDisplay={()=> setDisplay(false)} />
        {isShop(itemToRemove) &&
        <Text style={style.text}>{'Ce magasin est utilisé dans ' + (itemToRemove.listsUsingThisShop.length === 1 ? 'la liste suivante :' : 'les listes suivantes :')}</Text>
        }
        {isShop(itemToRemove) &&
        <FlatList 
            data={itemToRemove.listsUsingThisShop} 
            renderItem={({item})=> <BasicListItem title={item.title} />}
        />}
        {isShop(itemToRemove) &&
        <Text style={style.text}>{'Si vous supprimez ce magasin, il sera retiré de ' + (itemToRemove.listsUsingThisShop.length === 1 ? 'cette liste.' : 'ces listes.')}</Text>
        }
        <Text style={style.text}>Si une liste ne contient que ce magasin, elle sera elle-même supprimée.</Text>
        <Text style={style.text}>Supprimer le magasin ?</Text>
        <PreviousAndNext>
            <Pressable 
                    style={[style.button,{backgroundColor: theme}]}
                    onPress= {()=> RemoveShopFunction()}
                >
                    <Text style={style.buttonText}>Oui</Text>
            </Pressable>
            <Pressable style={[style.button,{backgroundColor: theme}]} onPress={()=> setDisplay(false)}>
                <Text style={style.buttonText}>Non</Text>
            </Pressable>
        </PreviousAndNext>
        
    </Modalview>
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
      fontSize: 18
    },
    buttonText: {
      fontSize: 18
    }
});

export default WarningShopUsedModal;