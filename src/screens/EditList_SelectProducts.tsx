import React,{useState} from 'react';
import {StatusBar} from 'react-native';
import SafeAreaview from '../Components/Layout/SafeAreaview';
import MainTitle from '../Components/Titles/MainTitle';
import PreviousAndNext from '../Components/Layout/PreviousAndNext';
import ProductsNewList from '../Components/Lists/ProductsNewList';
import ContentView from '../Components/Layout/ContentView';
import ExitFromEditListModal from '../Components/Modals/ExitFromEditListModal';
import HomeBackFromEditListSecondStepButton from '../Components/Buttons/HomeBackFromEditListSecondStepButton';
import PreviousButton from '../Components/Buttons/PreviousButton';
import ModifyListButton from '../Components/Buttons/ModifyListButton';
import WarningCreateNewListModal from '../Components/Modals/WarningCreateNewListModal';
import {useBackHandler} from '@react-native-community/hooks';
import { NavigatorScreenParams } from '@react-navigation/native';
import RootStackParamList from '../Interfaces/RootStackParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Params {
  params: RootStackParamList['EditList_SelectProducts']
}
interface NavigationInterface {
  navigation : NativeStackNavigationProp<any>,
  route: NavigatorScreenParams<Params>,
}

export default function EditList_SelectProducts({navigation,route}: NavigationInterface): React.JSX.Element {

    const currentList = route?.params?.currentList;
    const editListName = route?.params?.editListName;
    const [shopsList,setShopsList] = useState(route?.params?.shopsList);
    
    const [exitModalDisplayed,setExitModalDisplayed] = useState(false);
    const [warningModalDisplay,setWarningModalDisplay] = useState(false);
    
    useBackHandler(() => {
        if(exitModalDisplayed || warningModalDisplay) {
            setExitModalDisplayed(false);
            setWarningModalDisplay(false);
        } else {
            navigation.goBack();
        };
        return true;
    });

    return (
        <SafeAreaview
         modalDisplayed={exitModalDisplayed || warningModalDisplay}
        >
            <ContentView>
                <StatusBar />
                <HomeBackFromEditListSecondStepButton setDisplay={setExitModalDisplayed} editListName={editListName} shopsList={shopsList} currentList={currentList} navigation={navigation} />
                <MainTitle title={"Edition liste : "+ editListName} />
                {shopsList && <ProductsNewList page="edit" shopsList={shopsList} setShopsList={setShopsList} />}
                <PreviousAndNext>
                    <PreviousButton navigation={navigation} />
                    {editListName && shopsList && <ModifyListButton navigation={navigation} list={currentList} editListName={editListName} shopsList={shopsList} setDisplay={setWarningModalDisplay} />}
                </PreviousAndNext>
            </ContentView>
            {warningModalDisplay && <WarningCreateNewListModal setDisplay={setWarningModalDisplay} />}
            {exitModalDisplayed && <ExitFromEditListModal navigation={navigation} setDisplay={setExitModalDisplayed} />}
        </SafeAreaview>
    );
}