import React, { useContext } from "react";
import DataContext from "../Context/DataContext";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

function LatestProducts() {
  const { url, products } = useContext(DataContext);
  return (
    <section className="mt-10 grid justify-center w-full container mx-auto">
      <h2 className="text-sky-500 font-semi-bold text-2xl md:text-3xl text-center">
        LATEST PRODUCTS
      </h2>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-10 mt-10 w-[90%] mx-auto">
        {products.slice(0, 10).map((product, i) => {
          console.log(product);
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
                <p className="flex">
                  {[...Array(5)].map((star) => {
                    return (
                      <FaStar
                        className={
                          i < Math.round(product.product_avg_rating[0]?.value)
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

export default LatestProducts;
