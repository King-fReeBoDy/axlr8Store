import React, { useContext } from "react";
import { VscChromeClose } from "react-icons/vsc";
import DataContext from "../Context/DataContext";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function Search({ handleSearch, showSearch, setSearchItem, searchItem }) {
  const { products } = useContext(DataContext);

  const newProducts = searchItem
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchItem.toLowerCase())
      )
    : [];
  return (
    showSearch && (
      <div className="bg-black/80 fixed inset-0 z-50 w-screen h-screen grid justify-center pt-20">
        <div className="p-4">
          <div
            className="text-white w-full fixed top-7 right-6 md:top-12 md:right-16"
            onClick={handleSearch}
          >
            <VscChromeClose className="text-3xl ml-auto" />
          </div>
          <div className="flex items-center bg-white mt-6">
            <IoSearchOutline className="ml-2 text-lg" />
            <input
              type="text"
              name="searchItem"
              onChange={(e) => setSearchItem(e.target.value)}
              className="w-full  border-0 ring-0 focus:ring-0"
              placeholder="search by product name"
              autoComplete="off"
            />
          </div>
          <div className="bg-white w-[300px] md:w-[500px] mx-auto overflow-y-auto">
            {searchItem &&
              newProducts.length > 0 &&
              newProducts.map((product) => {
                return (
                  <div className="border-t-2 px-4 py-2 flex justify-between h-10 overflow-y-auto">
                    <p className="font-semibold truncate w-[50%]">
                      {product.name}
                    </p>
                    <p className="text-gray-400 truncate">
                      {product.category.name}
                    </p>
                  </div>
                );
              })}
            {searchItem && newProducts.length === 0 && (
              <div className=" border-t-2 p-2">
                <p className="text-gray-400 font-semibold ">NO PRODUCT FOUND</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default Search;
