import {StyleSheet, Pressable, Text, View} from 'react-native';
import React, {useContext} from 'react';
import RemoveMainListsItemButton from '../Buttons/RemoveMainListsItemButton';
import EditMainListsButton from '../Buttons/EditMainListsButton';
import ThemeContext from '../../Contexts/Theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ShopInterface from '../../Interfaces/ShopInterface';
import ListInterface from '../../Interfaces/ListInterface';
import DatasInterface from '../../Interfaces/DatasInterface';

interface MainListsItemPropsInterface {
  navigation: NativeStackNavigationProp<any>,
  item: ShopInterface | ListInterface,
  datas: DatasInterface,
  setItemToRemove: (value: ShopInterface | ListInterface)=> void,
  setDisplayed: (value: boolean)=>void,
  setWarningDisplayed: (value: boolean)=>void
}

function MainListsItem({navigation,item,datas,setItemToRemove,setDisplayed,setWarningDisplayed}: MainListsItemPropsInterface): React.JSX.Element {

  const {theme} = useContext(ThemeContext);
  
  return (
    <Pressable style={[style.mainListsItem,{borderColor: theme}]}>
      <Text style={style.text}>{item.title.toUpperCase()}</Text>
      <View style={style.buttonsContainer}>
        <EditMainListsButton navigation={navigation} item={item} datas={datas} />
        <RemoveMainListsItemButton item={item} setItemToRemove={setItemToRemove} setDisplayed={setDisplayed} setWarningDisplayed={setWarningDisplayed} />
      </View>
    </Pressable>
  );
}

const style = StyleSheet.create({
  mainListsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 2,
    borderRadius: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 30,
  },
  text: {
    fontSize: 16,
  }
});

export default MainListsItem;
