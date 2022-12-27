import { createContext, useState } from "react";

// import { useEffect } from "react";
// import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.jsx";
// import SHOP_DATA from "../shop-data.js";

export const ProductsContext = createContext({
  products: [],
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Used only once for populating data into Firebase DB
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA);
  // }, []);

  const value = { products };

  return <ProductsContext.Provider value={value}> {children} </ProductsContext.Provider>;
};
