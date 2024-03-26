import React, {useState, useEffect, useContext} from 'react';
import ThemeContext from '../Contexts/Theme';
import SafeAreaview from '../Components/Layout/SafeAreaview';
import Scrollview from '../Components/Layout/ScrollView';
import MainTitle from '../Components/Titles/MainTitle';
import MainLink from '../Components/Links/MainLink';
import MainListButton from '../Components/Buttons/MainListButton';
import MainList from '../Components/Lists/MainList';
import {StatusBar} from 'react-native';
import MainAddLink from '../Components/Links/MainAddLink';
import NoItemText from '../Components/Texts/NoItemText';
import ExitApplicationModal from '../Components/Modals/ExitApplicationModal';
import RemoveShopModal from '../Components/Modals/RemoveShopModal';
import RemoveListModal from '../Components/Modals/RemoveListModal';
import NoShopModal from '../Components/Modals/NoShopModal';
import CloseAppButton from '../Components/Buttons/CloseAppButton';
import SettingsButton from '../Components/Buttons/SettingsButton';
import HelpButton from '../Components/Buttons/HelpButton';
import HelpModal from '../Components/Modals/HelpModal';
import ContentView from '../Components/Layout/ContentView';
import WarningShopUsedModal from '../Components/Modals/WarningShopUsedModal';
import Loader from '../Components/Loader/Loader';
import {useBackHandler} from '@react-native-community/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigatorScreenParams } from '@react-navigation/native';
import RootStackParamList from '../Interfaces/RootStackParamList';
import ListInterface from '../Interfaces/ListInterface';
import ShopInterface from '../Interfaces/ShopInterface';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DatasInterface from '../Interfaces/DatasInterface';
import DidaHelpModal from '../Components/Modals/DidaHelpModal';

interface Params {
  params: RootStackParamList['Home']
}
interface NavigationInterface {
  navigation : NativeStackNavigationProp<any>,
  route: NavigatorScreenParams<Params>,
}

export default function Home({navigation,route}: NavigationInterface): React.JSX.Element {
  
  const CheckStorage = async ()=> {
    try {
      let datasString = await AsyncStorage.getItem("datas");
      let newDatas = {} as DatasInterface;
      if(datasString) {
        newDatas = JSON.parse(datasString);
        changeTheme && changeTheme(newDatas.theme);
        setDatas(newDatas);
      };
     
      if(datasString && JSON.parse(datasString).lists.length !== 0) {
        setHelpModalDisplayed(false);
      } else if(datasString && !JSON.parse(datasString).displayHelp){
        setHelpModalDisplayed(false);
      } else {
        setHelpModalDisplayed(true);
      }
      // setTimeout(()=>setLoading(false),300);
    } catch(error) {
      console.log(error);
    }
  };

  const {theme,changeTheme} = useContext(ThemeContext);

  // const [loading,setLoading] = useState(true);
  const [displayLists, setDisplayLists] = useState<boolean>(false);
  const [displayShops, setDisplayShops] = useState<boolean>(false);
  const [datas,setDatas] = useState<DatasInterface>({theme: '#CD13C6', displayHelp: true, lists: [], shops: []});
  const [itemToRemove, setItemToRemove] = useState({} as ShopInterface | ListInterface);
  
  const [removeListModalDisplayed, setRemoveListModalDisplayed] = useState<boolean>(false);
  const [removeShopModalDisplayed, setRemoveShopModalDisplayed] = useState<boolean>(false);
  const [noShopModalDisplayed, setNoShopModalDisplayed] = useState<boolean>(false);
  const [exitApplicationModalDisplayed, setExitApplicationModalDisplayed] = useState<boolean>(false);
  const [helpModalDisplayed, setHelpModalDisplayed] = useState<boolean>(false);
  const [warningShopUsedDisplayed,setWarningShopUsedDisplayed] = useState<boolean>(false);
  const [displayDidaHelp,setDisplayDidaHelp] = useState<boolean>(false);

  useEffect(()=> {
    // AsyncStorage.clear();
    CheckStorage();
  },[]);
  
  useEffect(()=> {
    if(route.params?.datas) {
      setDatas(route.params.datas);
    };
  },[route.params?.datas]);

  useBackHandler(() => {
    if(noShopModalDisplayed || removeListModalDisplayed || removeShopModalDisplayed || exitApplicationModalDisplayed || helpModalDisplayed || warningShopUsedDisplayed) {
      setNoShopModalDisplayed(false);
      setRemoveListModalDisplayed(false);
      setRemoveShopModalDisplayed(false);
      setExitApplicationModalDisplayed(false);
      setHelpModalDisplayed(false);
      setWarningShopUsedDisplayed(false);
    } else {
      setExitApplicationModalDisplayed(true);
    };
    return true;
  });

  return (
    // <>
    /* {loading && <Loader />}
    {!loading &&  */
    <SafeAreaview 
      modalDisplayed={noShopModalDisplayed || removeListModalDisplayed || removeShopModalDisplayed || exitApplicationModalDisplayed || helpModalDisplayed || warningShopUsedDisplayed}
    >
      <ContentView>
        <StatusBar />
        <CloseAppButton setDisplay={setExitApplicationModalDisplayed} />
        <SettingsButton navigation={navigation} />
        <HelpButton setDisplay={setHelpModalDisplayed} />
        <MainTitle title="Accueil" />
        <MainLink
          link='StartShopping'
          title="Commencer courses"
          navigation={navigation}
          params={{lists: datas.lists}}
          disabled={datas.lists.length === 0 ? true : false}
        />
        <Scrollview>
          <MainListButton title="Listes" display={displayLists} setDisplay={setDisplayLists} />
          {datas.lists.length > 0 ?
            displayLists && <MainList data={datas.lists} datas={datas} navigation={navigation} setItemToRemove={setItemToRemove} setDisplayed={setRemoveListModalDisplayed} setWarningDisplayed={setWarningShopUsedDisplayed} />
          : 
            displayLists && <NoItemText>Aucune liste</NoItemText>
          }
          {displayLists && <MainAddLink navigation={navigation} link="list" shops={datas.shops} setDisplay={setNoShopModalDisplayed} />}
          <MainListButton title="Magasins" display={displayShops} setDisplay={setDisplayShops} />
          {datas.shops.length > 0 ?
            displayShops &&<MainList data={datas.shops} datas={datas} navigation={navigation} setItemToRemove={setItemToRemove} setDisplayed={setRemoveShopModalDisplayed} setWarningDisplayed={setWarningShopUsedDisplayed} />
          : 
            displayShops && <NoItemText>Aucun magasin</NoItemText>
          }
          {displayShops && <MainAddLink navigation={navigation} link="shop" setDisplay={setNoShopModalDisplayed} />}
        </Scrollview>
      </ContentView>
      {removeListModalDisplayed && <RemoveListModal itemToRemove={itemToRemove}
                                          setDisplay={setRemoveListModalDisplayed}
                                          datas={datas} setDatas={setDatas} />}
      {removeShopModalDisplayed && <RemoveShopModal itemToRemove={itemToRemove} 
                                      setDisplay={setRemoveShopModalDisplayed} 
                                      datas={datas} />}
      {noShopModalDisplayed && <NoShopModal setDisplay={setNoShopModalDisplayed} />}
      {exitApplicationModalDisplayed && <ExitApplicationModal setDisplay={setExitApplicationModalDisplayed} />}
      {helpModalDisplayed && <HelpModal datas={datas} setDatas={setDatas} setDisplay={setHelpModalDisplayed} setDisplayDidaHelp={setDisplayDidaHelp} />}
      {warningShopUsedDisplayed && <WarningShopUsedModal itemToRemove={itemToRemove} setDisplay={setWarningShopUsedDisplayed} datas={datas} setDatas={setDatas} />}
      {displayDidaHelp && <DidaHelpModal setDisplayDidaHelp={setDisplayDidaHelp}/>}
    </SafeAreaview>
    /* } */
    // </>
  );
}
