import { PaginatedEstablishmentsTable } from "./PaginatedEstablishmentsTable";
import Background from "../static/logo.svg";
import { FavouritedEstablishmentsTable } from "./FavouritedEstablishmentsTable";
import { useState } from "react";
import {
  FavouriteItemsContext
} from "../context/favouriteItems";

const logoStyle: { [key: string]: string | number } = {
  width: "640px",
  height: "25px",
  background: `transparent url(${Background}) no-repeat center`,
  margin: "20px auto",
};

const HomePage = () => {
  const [favouriteItem, setFavouriteItem] =
    useState<{ [key: string]: string }[]>([]);
    const saveFavouriteItem = (newItem: { [key: string]: string}| null | undefined) => {
      const newTodo: { [key: string]: string } = {
        ...newItem,
        favourite: "1",
      }
      setFavouriteItem([...favouriteItem, newTodo])
    }

    const removeItem = (id: string) => {
      const newFavourites: { [key: string]: string }[] = favouriteItem.filter(item=> item.FHRSID !== id);
      setFavouriteItem(newFavourites);
    }

  return (
    <FavouriteItemsContext.Provider value={{favouriteItem, saveFavouriteItem, removeItem}}>
      <header role="img" style={logoStyle} />
      <PaginatedEstablishmentsTable />
      <FavouritedEstablishmentsTable />
    </FavouriteItemsContext.Provider>
  );
};

export default HomePage;
