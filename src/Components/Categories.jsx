import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DataContext from "../Context/DataContext";
import Loading from "./Loading";
function Categories() {
  //Global states from the DataContext
  const { url, categories, setCategories, showAlert } = useContext(DataContext);
  //Getting all categories
  const getCategories = async () => {
    try {
      const { data } = await axios(`${url}categories/`);
      setCategories(data);
      console.log(data);
    } catch (error) {
      showAlert(true, "error", error.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section className="mt-10 grid justify-center w-full container mx-auto ">
      <h2 className="text-sky-500 font-semi-bold text-2xl md:text-3xl text-center">
        CATEGORIES
      </h2>

      <div className="px-6 mt-6 overflow-auto grid-flow-col auto-cols-[70%] md:auto-cols-[40%] gap-4 grid items-center">
        {/*Mapping on categories */}
        {categories.map((category) => {
          return (
            <Link
              key={category.id}
              to={`/category/${category.name.toLowerCase()}`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/70"></div>
                <img
                  src={`${url}/${category.thumbnail}`}
                  alt=""
                  className="aspect-[3/2] object-cover"
                />
                <p className="absolute left-4 bottom-4 text-white md:text-lg uppercase">
                  {category.name}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Categories;
