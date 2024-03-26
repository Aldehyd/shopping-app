import React from 'react';
import { StyleSheet, View } from 'react-native';
import AvailableListItem from '../Items/AvailableListItem';
import ListInterface from '../../Interfaces/ListInterface';

interface AvailableListsListPropsInterface {
  lists: ListInterface[],
  selectedList: ListInterface | boolean,
  setSelectedList: (value: ListInterface | boolean)=>void
}

function AvailableListsList({lists,selectedList,setSelectedList}: AvailableListsListPropsInterface): React.JSX.Element {
    return(
        <View style={style.list}>
            {lists.map(item => <AvailableListItem list={item} selectedList={selectedList} setSelectedList={setSelectedList} />)}
        </View>
    );
}

const style = StyleSheet.create({
    list: {
        padding: 20,
    }
});

export default AvailableListsList;