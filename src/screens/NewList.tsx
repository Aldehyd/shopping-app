import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import SafeAreaview from '../Components/Layout/SafeAreaview';
import MainTitle from '../Components/Titles/MainTitle';
import ShopToAddList from '../Components/Lists/ShopToAddList';
import LabelledField from '../Components/Layout/LabelledField';
import WarningNewListFirstStepModal from '../Components/Modals/WarningNewListFirstStepModal';
import NewListNextButton from '../Components/Buttons/NewListNextButton';
import HomeBackFromNewListButton from '../Components/Buttons/HomeBackFromNewListButton';
import ExitFromNewListModal from '../Components/Modals/ExitFromNewListModal';
import ContentView from '../Components/Layout/ContentView';
import SubTitle from '../Components/Titles/SubTitle';
import WarningAlreadyNewListModal from '../Components/Modals/WarningAlreadyNewListModal';
import {useBackHandler} from '@react-native-community/hooks';
import ShopToAddInterface from '../Interfaces/ShopToAddInterface';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import RootStackParamList from '../Interfaces/RootStackParamList';

interface Params {
  params: RootStackParamList['NewList']
}
interface NavigationInterface {
  navigation : NativeStackNavigationProp<any>,
  route: NavigatorScreenParams<Params>,
}

export default function NewList({navigation,route}: NavigationInterface): React.JSX.Element {

  const availableShopsList = route.params?.shops;

  const [newListName,setNewListName] = useState<string>("");
  const [shopsList,setShopsList] = useState([] as ShopToAddInterface[]);

  const [warningModalDisplay, setWarningModalDisplay] = useState<boolean>(false);
  const [exitModalDisplay, setExitModalDisplay] = useState<boolean>(false);
  const [warningAlreadyNewListModalDisplayed,setWarningAlreadyNewListModalDisplayed] = useState<boolean>(false);

  const updateListName: (text: string)=>void = (text)=> {
    setNewListName(text);
  };

  useBackHandler(() => {
    if(warningModalDisplay || exitModalDisplay || warningAlreadyNewListModalDisplayed) {
      setWarningModalDisplay(false);
      setExitModalDisplay(false);
      setWarningAlreadyNewListModalDisplayed(false);
    } else if(newListName.length === 0) {
      navigation.navigate('Home');
    } else {
      setExitModalDisplay(true);
    };
    return true;
  });

  return (
    <SafeAreaview
     modalDisplayed={warningModalDisplay || exitModalDisplay || warningAlreadyNewListModalDisplayed}
    >
      <ContentView>
        <StatusBar />
        <HomeBackFromNewListButton navigation={navigation} newListName={newListName} setDisplay={setExitModalDisplay} />
        <MainTitle title="Nouvelle liste" />
        <LabelledField title="Nom" onChangeFunction={updateListName} autoFocus={true} />
        <SubTitle subtitle="Ajoutez des magasins à votre liste :" />
        {availableShopsList && <ShopToAddList page="new" data={availableShopsList} shopsList={shopsList} setShopsList={setShopsList} />}
        <NewListNextButton page="new" navigation={navigation} newListName={newListName} shopsList={shopsList} setDisplay={setWarningModalDisplay} setDisplayAlready={setWarningAlreadyNewListModalDisplayed} />
      </ContentView>
      {warningAlreadyNewListModalDisplayed && <WarningAlreadyNewListModal setDisplay={setWarningAlreadyNewListModalDisplayed} />}
      {warningModalDisplay && <WarningNewListFirstStepModal page="new" newListName={newListName} shopsList={shopsList} setDisplay={setWarningModalDisplay} />}
      {exitModalDisplay && <ExitFromNewListModal navigation={navigation} setDisplay={setExitModalDisplay} />}
    </SafeAreaview>
  );
}