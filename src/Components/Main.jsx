import React from "react";
import Banner from "./Banner";
import Categories from "./Categories";
import LatestProducts from "./LatestProducts";
import Loading from "./Loading";
import PopularProducts from "./PopularProducts";

function Main({ products, loading }) {
  return (
    <div>
      <Banner />
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Categories products={products} />
          <LatestProducts />
          <PopularProducts />
        </div>
      )}
    </div>
  );
}

export default Main;
