import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import SafeAreaview from '../Components/Layout/SafeAreaview';
import MainTitle from '../Components/Titles/MainTitle';
import ProductsNewList from '../Components/Lists/ProductsNewList';
import PreviousAndNext from '../Components/Layout/PreviousAndNext';
import HomeBackFromNewListButton from '../Components/Buttons/HomeBackFromNewListButton';
import ExitFromNewListModal from '../Components/Modals/ExitFromNewListModal';
import CreateListButton from '../Components/Buttons/CreateListButton';
import WarningCreateNewListModal from '../Components/Modals/WarningCreateNewListModal';
import ContentView from '../Components/Layout/ContentView';
import SubTitle from '../Components/Titles/SubTitle';
import {useBackHandler} from '@react-native-community/hooks';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import RootStackParamList from '../Interfaces/RootStackParamList';
import PreviousButton from '../Components/Buttons/PreviousButton';

interface Params {
    params: RootStackParamList['NewList_SelectProducts']
  }
interface NavigationInterface {
    navigation : NativeStackNavigationProp<any>,
    route: NavigatorScreenParams<Params>,
}

export default function NewList_SelectProducts({navigation,route}: NavigationInterface): React.JSX.Element {

    const newListName = route?.params?.newListName;
    const [shopsList,setShopsList] = useState(route?.params?.shopsList);

    const [exitModalDisplay, setExitModalDisplay] = useState<boolean>(false);
    const [warningModalDisplay, setWarningModalDisplay] =useState<boolean>(false);

    useBackHandler(() => {
        if(exitModalDisplay || warningModalDisplay) {
            setExitModalDisplay(false);
            setWarningModalDisplay(false);
        } else {
            navigation.goBack();
        };
        return true;
    });

    return (
        <SafeAreaview
            modalDisplayed={exitModalDisplay || warningModalDisplay}
        >
            <ContentView>
                <StatusBar />
                <HomeBackFromNewListButton navigation={navigation} newListName={newListName} setDisplay={setExitModalDisplay} />
                <MainTitle title={"Nouvelle liste : "+ newListName} />
                <SubTitle subtitle="Choisissez pour chaque magasin les articles à ajouter à la liste :" />
                {shopsList && <ProductsNewList page="new" shopsList={shopsList} setShopsList={setShopsList} />}
                <PreviousAndNext>
                    <PreviousButton navigation={navigation} />
                    {newListName && shopsList &&<CreateListButton navigation={navigation} newListName={newListName} shopsList={shopsList} setDisplay={setWarningModalDisplay} />}
                </PreviousAndNext>
            </ContentView>
            {exitModalDisplay && <ExitFromNewListModal navigation={navigation} setDisplay={setExitModalDisplay} />}
            {warningModalDisplay && <WarningCreateNewListModal setDisplay={setWarningModalDisplay} />}
        </SafeAreaview>
    );
}