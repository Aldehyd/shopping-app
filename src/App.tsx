import React, {useState} from 'react';
import ThemeContext from './Contexts/Theme';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Shopping from './screens/Shopping';
import Home from './screens/Home';
import StartShopping from './screens/StartShopping';
import NewShop from './screens/NewShop';
import EditShop from './screens/EditShop';
import NewList from './screens/NewList';
import NewList_SelectProducts from './screens/NewList_SelectProduct';
import EditList from './screens/EditList';
import EditList_SelectProducts from './screens/EditList_SelectProducts';
import Settings from './screens/Settings';

import RootStackParamList from './Interfaces/RootStackParamList';

function App(): React.JSX.Element {

  const RootStack = createNativeStackNavigator<RootStackParamList>();

  const [theme,setTheme] = useState('#CD13C6');

  const changeTheme : (color: string) => void = (color)=> {
    setTheme(color);
  };
  
  return (
    <ThemeContext.Provider value ={{theme,changeTheme}}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Home">
          <RootStack.Screen name="Home" component={Home} />
          <RootStack.Screen name="Settings" component={Settings} />
          <RootStack.Screen name="NewShop" component={NewShop} />
          <RootStack.Screen name="EditShop" component={EditShop} />
          <RootStack.Screen name="NewList" component={NewList} />
          <RootStack.Screen name="NewList_SelectProducts" component={NewList_SelectProducts} />
          <RootStack.Screen name="EditList" component={EditList} />
          <RootStack.Screen name="EditList_SelectProducts" component={EditList_SelectProducts} />
          <RootStack.Screen name="StartShopping" component={StartShopping} />
          <RootStack.Screen name="Shopping" component={Shopping} />
        </RootStack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

export default App;

