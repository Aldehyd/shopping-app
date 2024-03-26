import React, {useContext} from 'react';
import SafeAreaview from '../Components/Layout/SafeAreaview';
import { StatusBar} from 'react-native';
import HomeBackFromSettingsButton from '../Components/Buttons/HomeBackFromSettingsButton';
import MainTitle from '../Components/Titles/MainTitle';
import SubTitle from '../Components/Titles/SubTitle';
import ThemeContext from '../Contexts/Theme';
import ThemeChangeButton from '../Components/Buttons/ThemeChangeButton';
import ContentView from '../Components/Layout/ContentView';
import {useBackHandler} from '@react-native-community/hooks';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface NavigationInterface {
  navigation : NativeStackNavigationProp<any>,
}

export default function Settings({navigation}: NavigationInterface): React.JSX.Element {
    
    const {theme,changeTheme} = useContext(ThemeContext);
    
    useBackHandler(() => {
        navigation.navigate('Home');
        return true;
    });

    return(
        <SafeAreaview>
            <ContentView>
                <StatusBar />
                <HomeBackFromSettingsButton navigation={navigation} />
                <MainTitle title="Réglages" />
                <SubTitle subtitle="Thème : " />
                <ThemeChangeButton title="violet" theme={theme} changeTheme={changeTheme} color="#CD13C6" />
                <ThemeChangeButton title="vert" theme={theme} changeTheme={changeTheme} color="#4BE807" />
                <ThemeChangeButton title="turquoise" theme={theme} changeTheme={changeTheme} color="#61FAFF" />
                <ThemeChangeButton title="jaune" theme={theme} changeTheme={changeTheme} color="#FFD000" />
                <ThemeChangeButton title="orange" theme={theme} changeTheme={changeTheme} color="#F1562B" />
                <ThemeChangeButton title="rouge" theme={theme} changeTheme={changeTheme} color="#FF0000" />
            </ContentView>
        </SafeAreaview>
    );
}
