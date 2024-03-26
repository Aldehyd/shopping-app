import ShoppingListShopInterface from "./ShoppingListShopsInterface";

interface ShoppingListInterface {
    id: string,
    title: string,
    shops: ShoppingListShopInterface[]
};

export default ShoppingListInterface;