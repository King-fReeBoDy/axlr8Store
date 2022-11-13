import React, { useContext } from "react";
import DataContext from "../Context/DataContext";
import { Link, useParams } from "react-router-dom";
import { FaInfo } from "react-icons/fa";

function SearchPage() {
  const { url, products } = useContext(DataContext);
  const { name } = useParams();

  const newProducts = products.filter((product) =>
    product.name.toLowerCase().includes(name.toLowerCase())
  );
  return (
    <div className="mt-10 p-2">
      <h1 className="text-center text-3xl font-semi-bold">SEARCHING FOR</h1>
      <p className="text-center text-3xl font-semi-bold uppercase">{name}</p>

      <div className="bg-white w-[300px] md:w-[500px] mx-auto grid grid-cols-2 mt-10 gap-4">
        {newProducts.length > 0 &&
          newProducts.map((product) => {
            return (
              <div className="p-2">
                <img
                  src={`${url}${product.image}`}
                  alt={product.name}
                  className="aspect-[3/2] object-cover"
                />
                <p className="font-semibold truncate">{product.name}</p>
                <p className="text-gray-400">{product.category.name}</p>
              </div>
            );
          })}
      </div>

      {newProducts.length === 0 && (
        <div className="p-2 mt-10 flex items-center justify-center w-full">
          <FaInfo className="bg-sky-500 p-1 text-2xl mr-2 rounded-md" />
          <p className="text-lg font-semibold text-center">NO PRODUCT FOUND</p>
        </div>
      )}

      <Link to="/">
        <p className="mt-10 py-2 px-4 bg-sky-500 text-center font-semibold mx-10">
          RETURN TO SHOP
        </p>
      </Link>
    </div>
  );
}

export default SearchPage;
