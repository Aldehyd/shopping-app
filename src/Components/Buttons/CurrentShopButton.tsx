import React, { useContext, useState } from 'react';
import {StyleSheet, Pressable, View, Text} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import ThemeContext from '../../Contexts/Theme';
import ShoppingListShopInterface from '../../Interfaces/ShoppingListShopsInterface';

interface CurrentShopButtonPropsInterface {
  display: boolean,
  setDisplay: (value: boolean)=>void
  shop: ShoppingListShopInterface,
  count: number,
}

function CurrentShopButton({display,setDisplay,shop,count}: CurrentShopButtonPropsInterface): React.JSX.Element {

  const {theme} = useContext(ThemeContext);

    const [displayIcon,setDisplayIcon] = useState<boolean>(false);

    const onPressFunction = ()=> {
      setDisplay(!display);
      setDisplayIcon(!displayIcon);
    };

    return (
        <Pressable style={[style.currentShopButton,{borderColor:theme}]} onPress={()=> onPressFunction()}>
          <View style={style.titleAndAmountContainer}>
            <Text style={style.buttonText}>{shop.title.toUpperCase()}</Text>
            {
              count === 0 ?
              <EntypoIcon name="check" size={20} color={theme} />
              :
              <Text style={[style.amount,{backgroundColor: theme}]}>{count}</Text>
            } 
          </View>
          {displayIcon ? 
            <EntypoIcon name="triangle-up" size={30} color="#fff" />
            :
            <EntypoIcon name="triangle-down" size={30} color="#fff" /> 
          }
        </Pressable>
    );
}

const style = StyleSheet.create({
  currentShopButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingBottom: 10,
    fontSize: 20,
    borderBottomWidth: 2,
  },
  titleAndAmountContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  amount: {
    padding: 5,
    fontSize: 16,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
  }
});

export default CurrentShopButton;