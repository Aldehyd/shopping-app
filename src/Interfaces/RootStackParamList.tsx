import ShopInterface from "./ShopInterface";
import ListInterface from "./ListInterface";
import ShopToAddInterface from "./ShopToAddInterface";
import ShoppingListInterface from "./ShoppingListInterface";
import DatasInterface from "./DatasInterface";

type RootStackParamList = {
    Home: {datas: DatasInterface} | undefined;
    Settings: undefined;
    NewShop: undefined;
    EditShop: {currentShop: ShopInterface};
    NewList: {shops: ShopInterface[]};
    NewList_SelectProducts: {newListName: string, shopsList: ShopToAddInterface[]}
    EditList: {currentList: ListInterface, shops: ShopInterface[]};
    EditList_SelectProducts: {currentList: ListInterface, editListName: string, shopsList: ShopToAddInterface[]};
    StartShopping: {lists: ListInterface[]},
    Shopping: {list: ShoppingListInterface}
};

export default RootStackParamList;