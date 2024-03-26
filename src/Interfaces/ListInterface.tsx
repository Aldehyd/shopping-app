import ShopInterface from "./ShopInterface"

interface ListInterface {
    id: string,
    title: string,
    shops: ShopInterface[],
    type: string
};

export default ListInterface;