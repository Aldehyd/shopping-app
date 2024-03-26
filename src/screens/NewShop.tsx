import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import SafeAreaview from "../Components/Layout/SafeAreaview";
import MainTitle from '../Components/Titles/MainTitle';
import ProductsContainer from '../Components/Containers/ProductsContainer';
import AddProductButton from '../Components/Buttons/AddProductButton';
import AddProductModal from '../Components/Modals/AddProductModal';
import LabelledField from '../Components/Layout/LabelledField';
import ProductsNewShop from '../Components/Lists/ProductsNewShop';
import AddShopButton from '../Components/Buttons/AddShopButton';
import WarningNewShopModal from '../Components/Modals/WarningNewShopModal';
import HomeBackFromNewShopButton from '../Components/Buttons/HomeBackFromNewShopButton';
import ExitFromNewShopModal from '../Components/Modals/ExitFromNewShopModal';
import WarningAlreadyNewShopModal from '../Components/Modals/WarningAlreadyNewShopModal';
import WarningAlreadySimilarProductModal from '../Components/Modals/WarningAlreadySimilarProductModal';
import SubTitle from '../Components/Titles/SubTitle';
import ContentView from '../Components/Layout/ContentView';
import {useBackHandler} from '@react-native-community/hooks';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface NavigationInterface {
  navigation : NativeStackNavigationProp<any>,
}

export default function NewShop({navigation}: NavigationInterface): React.JSX.Element {

  const [newShopName,setNewShopName] = useState<string>("");
  const [productsList,setProductsList] = useState<string[]>([]);

  const [addProductModalDisplayed,setAddProductModalDisplayed] = useState<boolean>(false);
  const [warningNewShopModalDisplayed,setWarningNewShopModalDisplayed] = useState<boolean>(false);
  const [warningAlreadyNewShopModalDisplayed,setWarningAlreadyNewShopModalDisplayed] = useState<boolean>(false);
  const [warningAlreadySimilarProductModalDisplayed,setWarningAlreadySimilarProductModalDisplayed] = useState<boolean>(false);
  const [exitModalDislayed,setExitModalDisplayed] = useState<boolean>(false);

  const updateShopName: (text: string)=>void = (text)=> {
    setNewShopName(text);
  };

  useBackHandler(() => {
    if((addProductModalDisplayed || warningNewShopModalDisplayed || warningAlreadyNewShopModalDisplayed || exitModalDislayed) && !warningAlreadySimilarProductModalDisplayed) {
      setAddProductModalDisplayed(false);
      setWarningNewShopModalDisplayed(false);
      setWarningAlreadyNewShopModalDisplayed(false);
      setExitModalDisplayed(false);
    } else if(warningAlreadySimilarProductModalDisplayed) {
      setWarningAlreadySimilarProductModalDisplayed(false);
    } else {
      if(productsList.length === 0 && newShopName.length === 0) {
        navigation.navigate('Home');
      } else {
        setExitModalDisplayed(true);
      };
    }
    return true;
  });

  return(
    <SafeAreaview modalDisplayed={addProductModalDisplayed || warningNewShopModalDisplayed || warningAlreadyNewShopModalDisplayed || exitModalDislayed}>
      <ContentView>
        <StatusBar />
        <HomeBackFromNewShopButton navigation={navigation} productsList={productsList} newShopName={newShopName} setDisplay={setExitModalDisplayed} />
        <MainTitle title="Nouveau Magasin" />
        <LabelledField title="Nom" autoFocus={true} onChangeFunction={updateShopName} />
        <SubTitle subtitle="Ajouter les articles que vous achetez régulièrement dans ce magasin :" />
        <ProductsContainer>
          <ProductsNewShop page="new" productsList={productsList} setProductsList={setProductsList} />
          <AddProductButton setDisplay={setAddProductModalDisplayed} />
        </ProductsContainer>
        <AddShopButton navigation={navigation} setDisplayEmpty={setWarningNewShopModalDisplayed} setDisplayAlready={setWarningAlreadyNewShopModalDisplayed} productsList={productsList} newShopName={newShopName} />
      </ContentView>
      {addProductModalDisplayed && <AddProductModal page="new" productsList={productsList} setProductsList={setProductsList} 
                            setDisplayAlready={setWarningAlreadySimilarProductModalDisplayed} setDisplay={setAddProductModalDisplayed} />}
      {warningNewShopModalDisplayed && <WarningNewShopModal page="new" newShopName={newShopName} productsList={productsList} setDisplay={setWarningNewShopModalDisplayed} />}
      {warningAlreadyNewShopModalDisplayed && <WarningAlreadyNewShopModal setDisplay={setWarningAlreadyNewShopModalDisplayed} />}
      {warningAlreadySimilarProductModalDisplayed && <WarningAlreadySimilarProductModal setDisplay={setWarningAlreadySimilarProductModalDisplayed} />}
      {exitModalDislayed && <ExitFromNewShopModal navigation={navigation} setDisplay={setExitModalDisplayed} />}
    </SafeAreaview>
  );
}
