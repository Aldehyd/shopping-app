import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import SafeAreaview from "../Components/Layout/SafeAreaview";
import MainTitle from '../Components/Titles/MainTitle';
import ProductsContainer from '../Components/Containers/ProductsContainer';
import AddProductButton from '../Components/Buttons/AddProductButton';
import AddProductModal from '../Components/Modals/AddProductModal';
import LabelledField from '../Components/Layout/LabelledField';
import ProductsNewShop from '../Components/Lists/ProductsNewShop';
import ModifyShopButton from '../Components/Buttons/ModifyShopButton';
import WarningAlreadySimilarProductModal from '../Components/Modals/WarningAlreadySimilarProductModal';
import WarningAlreadyNewShopModal from '../Components/Modals/WarningAlreadyNewShopModal';
import WarningNewShopModal from '../Components/Modals/WarningNewShopModal';
import HomeBackFromEditShopButton from '../Components/Buttons/HomeBackFromEditShop';
import ExitFromEditShopModal from '../Components/Modals/ExitFromEditShopModal';
import ContentView from '../Components/Layout/ContentView';
import SubTitle from '../Components/Titles/SubTitle';
import {useBackHandler} from '@react-native-community/hooks';
import { NavigatorScreenParams } from '@react-navigation/native';
import RootStackParamList from '../Interfaces/RootStackParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Params {
  params: RootStackParamList['EditShop']
}
interface NavigationInterface {
  navigation : NativeStackNavigationProp<any>,
  route: NavigatorScreenParams<Params>,
}

export default function EditShop({navigation,route}: NavigationInterface): React.JSX.Element {

  const currentShop = route.params?.currentShop;

  const [editShopName, setEditShopName] = useState<string | undefined>(currentShop?.title);
  const [productsList,setProductsList] = useState<string[] | undefined>(currentShop?.products);

  const [addProductModalDisplayed,setAddProductModalDisplayed] = useState<boolean>(false);
  const [warningNewShopModalDisplayed,setWarningNewShopModalDisplayed] = useState<boolean>(false);
  const [warningAlreadyNewShopModalDisplayed,setWarningAlreadyNewShopModalDisplayed] = useState<boolean>(false);
  const [warningAlreadySimilarProductModalDisplayed,setWarningAlreadySimilarProductModalDisplayed] = useState<boolean>(false);
  const [exitModalDisplayed,setExitModalDisplayed] = useState<boolean>(false);
  
  const updateShopName: (text: string)=>void = (text)=> {
    setEditShopName(text);
  };

  useBackHandler(() => {
    if(!warningAlreadySimilarProductModalDisplayed && addProductModalDisplayed || warningNewShopModalDisplayed || warningAlreadyNewShopModalDisplayed || exitModalDisplayed) {
      setAddProductModalDisplayed(false);
      setWarningNewShopModalDisplayed(false);
      setWarningAlreadyNewShopModalDisplayed(false);
      setExitModalDisplayed(false);
    } else if(warningAlreadySimilarProductModalDisplayed) {
      setWarningAlreadySimilarProductModalDisplayed(false);
    } else if(productsList === currentShop?.products && editShopName === currentShop?.title) {
      navigation.navigate('Home');
    } else {
      setExitModalDisplayed(true);
    };
    return true;
  });

  return(
    <SafeAreaview
      modalDisplayed={addProductModalDisplayed || warningNewShopModalDisplayed || warningAlreadyNewShopModalDisplayed || warningAlreadySimilarProductModalDisplayed || exitModalDisplayed}
    >
      <ContentView>
        <StatusBar />
        {editShopName && productsList && <HomeBackFromEditShopButton editShopName={editShopName} productsList={productsList} currentShop={currentShop} navigation={navigation} setDisplay={setExitModalDisplayed} />}
        <MainTitle title={"Magasin : "+ currentShop?.title } />
        <LabelledField title="Nom" defaultValue={editShopName} onChangeFunction={updateShopName} />
        <SubTitle subtitle="Ajoutez les articles que vous achetez régulièrement dans ce magasin :" />
        <ProductsContainer>
          {productsList && <ProductsNewShop page="edit" productsList={productsList} setProductsList={setProductsList} />}
          <AddProductButton setDisplay={setAddProductModalDisplayed} />
        </ProductsContainer>
        {productsList && editShopName && <ModifyShopButton navigation={navigation} shop={currentShop} editShopName={editShopName} productsList={productsList} setDisplayEmpty={setWarningNewShopModalDisplayed} setDisplayAlready={setWarningAlreadyNewShopModalDisplayed} />}
      </ContentView>
      {addProductModalDisplayed && productsList && <AddProductModal page="edit" productsList={productsList} setProductsList={setProductsList} 
                              setDisplayAlready={setWarningAlreadySimilarProductModalDisplayed} setDisplay={setAddProductModalDisplayed} />}
      {warningNewShopModalDisplayed && productsList && <WarningNewShopModal page="edit" editShopName={editShopName} productsList={productsList} setDisplay={setWarningNewShopModalDisplayed} />}
      {warningAlreadyNewShopModalDisplayed && <WarningAlreadyNewShopModal setDisplay={setWarningAlreadyNewShopModalDisplayed} />}
      {warningAlreadySimilarProductModalDisplayed && <WarningAlreadySimilarProductModal setDisplay={setWarningAlreadySimilarProductModalDisplayed} />}
      {exitModalDisplayed && <ExitFromEditShopModal navigation={navigation} setDisplay={setExitModalDisplayed} />}
    </SafeAreaview>
  );
}
