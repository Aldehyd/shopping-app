import ListInterface from "./ListInterface";
import ShopInterface from "./ShopInterface";

interface DatasInterface {
    theme: string,
    displayHelp: boolean,
    lists: ListInterface[],
    shops: ShopInterface[],
};

export default DatasInterface;