import ShoppingListProductInterface from "./ShoppingListProductInterface";
import ListInterface from "./ListInterface";

interface ShoppingListShopInterface {
    id: string,
    title: string,
    products: ShoppingListProductInterface[],
};

export default ShoppingListShopInterface;