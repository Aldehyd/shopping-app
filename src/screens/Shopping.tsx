import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import SafeAreaview from '../Components/Layout/SafeAreaview';
import HomeBackFromShoppingButton from '../Components/Buttons/HomeBackFromShoppingButton';
import ExitFromEndShoppingModal from '../Components/Modals/ExitFromShoppingModal';
import EndShoppingButton from '../Components/Buttons/EndShoppingButton';
import ProductsToBuyList from '../Components/Lists/ProductsToBuyList';
import ShoppingMainTitle from '../Components/Titles/ShoppingMainTitle';
import ContentView from '../Components/Layout/ContentView';
import {useBackHandler} from '@react-native-community/hooks';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RootStackParamList from '../Interfaces/RootStackParamList';
import { NavigatorScreenParams } from '@react-navigation/native';

interface Params {
    params: RootStackParamList['Shopping']
  }
interface NavigationInterface {
  navigation : NativeStackNavigationProp<any>,
  route: NavigatorScreenParams<Params>,
}

export default function Shopping({navigation,route}: NavigationInterface): React.JSX.Element {

    const list = route?.params?.list;
    console.log(list)
    const [endShoppingModalDisplay,setEndShoppingModalDisplay] = useState<boolean>(false);

    useBackHandler(() => {
        if(endShoppingModalDisplay) {
            setEndShoppingModalDisplay(false);
        } else {
            let isProductLeftToBuy = false;
            list?.shops.forEach(shop => {
                shop.products.forEach(product => {
                    if(product.bought === false) {
                        isProductLeftToBuy = true;
                    };
                });
            });
    
            if(isProductLeftToBuy) {
                setEndShoppingModalDisplay(true);
            } else {
                navigation.navigate('Home');
            };
        };
        return true;
    });

    return (
        <SafeAreaview 
            modalDisplayed={endShoppingModalDisplay }
        >
            <ContentView>
                <StatusBar />
                <HomeBackFromShoppingButton setDisplay={setEndShoppingModalDisplay} />
                {list && <ShoppingMainTitle title={list?.title} />}
                {list && <ProductsToBuyList list={list} />}
                {list && <EndShoppingButton navigation={navigation} list={list} setDisplay={setEndShoppingModalDisplay} />}
            </ContentView>
            {endShoppingModalDisplay && <ExitFromEndShoppingModal navigation={navigation} setDisplay={setEndShoppingModalDisplay} />}
        </SafeAreaview>
    );
}