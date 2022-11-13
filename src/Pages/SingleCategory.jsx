import React, { useState, useContext } from "react";
import { VscArrowSmallLeft } from "react-icons/vsc";
import { RiEqualizerLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import CategoryItems from "../Components/CategoryItems";
import DataContext from "../Context/DataContext";
function SingleCategory({ products }) {
  const { categories } = useContext(DataContext);
  const { name } = useParams(); //Getting the name from the url

  const [showFilter, setShowFilter] = useState(false);

  const handleFilter = () => setShowFilter(!showFilter);

  //Filtering all products which name match the category
  const newProducts = products.filter(
    (product) => product.category.name.toLowerCase() === name
  );

  return (
    <>
      <div className="p-5 mt-3 md:p-10">
        <div className="flex justify-between items-center my-4">
          <Link to="/">
            <VscArrowSmallLeft className="text-3xl md:text-4xl" />
          </Link>
          <p className="md:text-lg">BREADCRUMS</p>
        </div>
        <h1 className="text-center text-3xl font-semi-bold my-5 md:text-4xl uppercase">
          {name}
        </h1>

        <div className="flex justify-between items-center mt-10 ">
          <p
            className="flex justify-center items-center px-4 py-2 bg-sky-500 shadow-md md:text-xl"
            onClick={handleFilter}
          >
            <span className="mr-3">
              <RiEqualizerLine />
            </span>
            FILTER
          </p>
          <p className="text-sm md:text-lg">
            SHOWING {newProducts.length}
            {newProducts.length > 1 ? "PRODUCTS" : "PRODUCT"}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 items-center justify-center gap-4 mt-7">
          {/*mapping on the new prodct array*/}
          {newProducts.map((product) => {
            return (
              <CategoryItems key={product.code} product={product} name={name} />
            );
          })}
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 z-[51] w-[320px] h-screen bg-white transition-all duration-300  p-8 md:pl-16 pt-10 [&>*]:text-black ${
          showFilter ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="cursor-pointer" onClick={handleFilter}>
          ///
        </div>

        <form className="grid mt-10">
          <div className="flex justify-between">
            <label htmlFor="">0</label>
            <input type="range" min="1" max="10000" className="w-full mx-3" />
            <label htmlFor="">1000</label>
          </div>
          <button className="mt-5 bg-sky-500 shadow-md">FILTER</button>
        </form>

        <div>
          <ul className="mt-3">
            {categories.map((category, i) => {
              return (
                <Link to={`/category/${category.name}`} key={i}>
                  <li
                    onClick={handleFilter}
                    className="relative uppercase after:transition-all after:duration-300 w-[77px] z-10 mb-3 after:content-['']  after:absolute after:bottom-0 after:left-0 after:h-2 after:w-full after:-z-[10000] after:bg-sky-500 font-semibold after:-translate-x-full hover:after:translate-x-0"
                  >
                    {category.name}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
      {showFilter && (
        <div
          className="fixed inset-0 bg-black/70 w-screen h-full z-50"
          onClick={handleFilter}
        ></div>
      )}
    </>
  );
}

export default SingleCategory;
