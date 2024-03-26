import React, {useState} from 'react';
import MainListButton from '../Buttons/MainListButton';
import ProductsContainer from '../Containers/ProductsContainer';
import ProductsToAddNewList from '../Lists/ProductsToAddNewList';
import ListShopInterface from '../../Interfaces/ListShopInterface';
import ShopToAddInterface from '../../Interfaces/ShopToAddInterface';

interface ShopWithProductsToAddPropsInterface {
    item: ListShopInterface,
    page: string,
    shopsList: ShopToAddInterface[],
    setShopsList: (value: ShopToAddInterface[])=>void
  }

function ShopWithProductsToAdd({item,page,shopsList,setShopsList}: ShopWithProductsToAddPropsInterface): React.JSX.Element {

    const [display,setDisplay] = useState<boolean>(true);

    return(
        <>
            <MainListButton title={item.title.toUpperCase()} display={display} setDisplay={setDisplay} />
            {display && <ProductsContainer>
                <ProductsToAddNewList shop={item} page={page} shopsList={shopsList} setShopsList={setShopsList} />
            </ProductsContainer>}
        </>
    );
}

export default ShopWithProductsToAdd;