import ListInterface from "./ListInterface"

interface ShopInterface {
    id: string,
    title: string,
    products: string[],
    listsUsingThisShop: ListInterface[],
    type: string
};

export default ShopInterface;