import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      {/* the home component does not need access to all the product/category data
      so we are able to avoid passing props from here to category and product components */}
      <CategoryMenu />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Home;
