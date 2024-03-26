import React, {useContext} from 'react';
import { Pressable, StyleSheet, Text} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import ThemeContext from '../../Contexts/Theme';
import ListInterface from '../../Interfaces/ListInterface';

interface AvailableListItemPropsInterface {
    list: ListInterface,
    selectedList: ListInterface | boolean,
    setSelectedList: (value: ListInterface | boolean)=>void
}

function AvailableListItem({list,selectedList,setSelectedList}: AvailableListItemPropsInterface): React.JSX.Element {

    const {theme} = useContext(ThemeContext);

    const onPressFunction = ()=> {
        if(selectedList === list) {
            setSelectedList(false);
        } else {
            setSelectedList(list);
        };
    };

    return (
        <Pressable 
            style={[style.availableList, {backgroundColor: theme, borderColor: theme}, list === selectedList && style.selectedList]} 
            onPress={()=> onPressFunction()}
        >
            <Text style={style.text}>{list.title.toUpperCase()}</Text>
            {list === selectedList && <EntypoIcon name="check" size={25} color={theme} />}
        </Pressable>
    );
}

const style = StyleSheet.create({
    availableList: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 10,
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
    },
    selectedList: {
        opacity: 0.5,
        backgroundColor: '#000',
    },
    text: {
        fontSize: 18,
    }
});

export default AvailableListItem;