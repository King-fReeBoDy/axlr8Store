import React, { useContext } from "react";
import { Link } from "react-router-dom";
import DataContext from "../Context/DataContext";
import { FaStar } from "react-icons/fa";

function PopularProducts() {
  const { url, products } = useContext(DataContext);
  return (
    <section className="my-10 grid justify-center w-full container mx-auto">
      <h2 className="text-sky-500 font-semi-bold text-2xl md:text-3xl text-center">
        POPULAR PRODUCTS
      </h2>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-10 mt-10 w-[90%] mx-auto">
        {products
          .sort((a, b) => {
            return (
              Math.round(b.product_avg_rating[0]?.value) -
              Math.round(a.product_avg_rating[0]?.value)
            );
          })
          .map((product, i) => {
            return (
              <div key={i}>
                <Link
                  to={`/category/${product.category.name.toLowerCase()}/${
                    product.code
                  }`}
                >
                  <img
                    src={`${url}${product.image}`}
                    alt={product.name}
                    className="aspect-[3/2] object-cover"
                  />
                  <p className="md:font-semibold mt-2 text-sm md:text-lg truncate">
                    {product.name}
                  </p>
                  <p className="flex items-center">
                    {[...Array(5)].map((star, index) => {
                      return (
                        <FaStar
                          className={
                            index <
                            Math.round(product.product_avg_rating[0]?.value)
                              ? "text-amber-500 text-xs"
                              : "text-gray-300 text-xs"
                          }
                        />
                      );
                    })}
                  </p>
                </Link>
              </div>
            );
          })}
      </div>
    </section>
  );
}

export default PopularProducts;
