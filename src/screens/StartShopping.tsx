import React, {useState} from 'react';
import SafeAreaview from '../Components/Layout/SafeAreaview';
import MainTitle from '../Components/Titles/MainTitle';
import SubTitle from '../Components/Titles/SubTitle';
import {StatusBar} from 'react-native';
import AvailableListsList from '../Components/Lists/AvailableListsList';
import ContentView from '../Components/Layout/ContentView';
import HomeBackFromSettingsButton from '../Components/Buttons/HomeBackFromSettingsButton';
import {useBackHandler} from '@react-native-community/hooks';
import ListInterface from '../Interfaces/ListInterface';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import RootStackParamList from '../Interfaces/RootStackParamList';
import StartShoppingButton from '../Components/Buttons/StartShoppingButton';

interface Params {
  params: RootStackParamList['StartShopping']
}
interface NavigationInterface {
  navigation : NativeStackNavigationProp<any>,
  route: NavigatorScreenParams<Params>,
}

export default function StartShopping({navigation,route}: NavigationInterface): React.JSX.Element {

  const lists = route?.params?.lists;
  const [selectedList,setSelectedList] = useState<ListInterface | boolean>(false);

  useBackHandler(() => {
    navigation.goBack();
    return true;
  });

  return (
    <SafeAreaview>
      <ContentView>
        <StatusBar />
        <HomeBackFromSettingsButton navigation={navigation}/>
        <MainTitle title="Courses" />
        <SubTitle subtitle="Choisissez une liste :" />
        {lists && <AvailableListsList lists={lists} selectedList={selectedList} setSelectedList={setSelectedList} />}
        <StartShoppingButton navigation={navigation} selectedList={selectedList} />
      </ContentView>
    </SafeAreaview>
  );
}
