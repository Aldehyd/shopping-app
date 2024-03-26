import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import SafeAreaview from "../Components/Layout/SafeAreaview";
import MainTitle from '../Components/Titles/MainTitle';
import LabelledField from '../Components/Layout/LabelledField';
import ShopToAddList from '../Components/Lists/ShopToAddList';
import ContentView from '../Components/Layout/ContentView';
import SubTitle from '../Components/Titles/SubTitle';
import HomeBackFromEditListButton from '../Components/Buttons/HomeBackFromEditList';
import ExitFromEditListModal from '../Components/Modals/ExitFromEditListModal';
import WarningNewListFirstStepModal from '../Components/Modals/WarningNewListFirstStepModal';
import NewListNextButton from '../Components/Buttons/NewListNextButton';
import WarningAlreadyNewListModal from '../Components/Modals/WarningAlreadyNewListModal';
import {useBackHandler} from '@react-native-community/hooks';
import { NavigatorScreenParams } from '@react-navigation/native';
import RootStackParamList from '../Interfaces/RootStackParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ShopToAddInterface from '../Interfaces/ShopToAddInterface';

interface Params {
  params: RootStackParamList['EditList']
}
interface NavigationInterface {
  navigation : NativeStackNavigationProp<any>,
  route: NavigatorScreenParams<Params>,
}

export default function EditList({navigation,route}: NavigationInterface): React.JSX.Element {
  
  let currentList = route?.params?.currentList;
  const availableShopsList = route.params?.shops;

  const [editListName,setEditListName] = useState(currentList?.title);
  let initialShopsList = [] as ShopToAddInterface[];
  currentList?.shops.forEach(item => {
    const shopProducts = availableShopsList?.find(shop => shop.id === item.id)?.products;
    if(shopProducts) {
      initialShopsList.push({
        id: item.id,
        title: item.title,
        products : shopProducts,
        selectedProducts: item.products
      });
    }
  });

  const [shopsList,setShopsList] = useState(initialShopsList);
  const [exitModalDisplayed,setExitModalDisplayed] = useState<boolean>(false);
  const [warningNewListModalDisplayed,setWarningNewListModalDisplayed] = useState<boolean>(false);
  const [warningAlreadyNewListModalDisplayed,setWarningAlreadyNewListModalDisplayed] = useState<boolean>(false);

  const updateShopName: (text: string)=>void = (text)=> {
    setEditListName(text);
  };

  useBackHandler(() => {
    if(exitModalDisplayed || warningNewListModalDisplayed || warningAlreadyNewListModalDisplayed) {
      setExitModalDisplayed(false);
      setWarningNewListModalDisplayed(false);
      setWarningAlreadyNewListModalDisplayed(false);
    } else {
      let currentListShopsIds = currentList?.shops.map(shop => {return shop.id});
      let shopsListIds = shopsList.map(shop => {return shop.id});
      if(currentListShopsIds?.length === shopsListIds?.length && currentListShopsIds?.every((id,i)=>{ return id === shopsListIds[i]}) && editListName === currentList?.title) {
        navigation.navigate('Home');
      } else {
        setExitModalDisplayed(true);
      };
    };
    return true;
  });

  return(
    <SafeAreaview
      modalDisplayed={exitModalDisplayed || warningNewListModalDisplayed || warningAlreadyNewListModalDisplayed}
    >
      <ContentView>
        <StatusBar />
        <HomeBackFromEditListButton navigation={navigation} editListName={editListName} shopsList={shopsList} currentList={currentList} setDisplay={setExitModalDisplayed} />
        <MainTitle title={"Edition liste : "+ currentList?.title } />
        <LabelledField title="Nom" defaultValue={currentList?.title} onChangeFunction={updateShopName} />
        <SubTitle subtitle="Ajoutez des magasins à cette liste :" />
        {availableShopsList && <ShopToAddList page="edit" data={availableShopsList} shopsList={shopsList} setShopsList={setShopsList} />}
        <NewListNextButton page="edit" currentList={currentList} navigation={navigation} editListName={editListName} shopsList={shopsList} setDisplay={setWarningNewListModalDisplayed} setDisplayAlready={setWarningAlreadyNewListModalDisplayed} />
      </ContentView>
      {warningAlreadyNewListModalDisplayed && <WarningAlreadyNewListModal setDisplay={setWarningAlreadyNewListModalDisplayed} />}
      {warningNewListModalDisplayed && <WarningNewListFirstStepModal page="edit" editListName={editListName} shopsList={shopsList} setDisplay={setWarningNewListModalDisplayed} />}
      {exitModalDisplayed && <ExitFromEditListModal navigation={navigation} setDisplay={setExitModalDisplayed} />}
    </SafeAreaview>
  );
}
