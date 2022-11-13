import React, { useState, useContext } from "react";
import { VscArrowSmallLeft } from "react-icons/vsc";
import { RiEqualizerLine } from "react-icons/ri";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import DataContext from "../Context/DataContext";

function Products({ products }) {
  const { url } = useContext(DataContext);
  const [like, setLike] = useState(false);

  const handleLike = () => setLike(!like);

  return (
    <>
      <div className="p-5 mt-3 md:p-10">
        <div className="flex justify-between items-center my-4">
          <Link to="/">
            <VscArrowSmallLeft className="text-3xl md:text-4xl" />
          </Link>
          <p className="md:text-lg">BREADCRUMS</p>
        </div>
        <h1 className="text-center text-3xl font-semi-bold my-5 md:text-4xl">
          CATEGORY NAME
        </h1>

        <div className="flex justify-between items-center mt-10 ">
          <p className="flex justify-center items-center px-4 py-2 bg-sky-500 shadow-md md:text-xl cursor-pointer">
            <span className="mr-3">
              <RiEqualizerLine />
            </span>
            FILTER
          </p>
          <p className="md:text-lg">Showing 1-23</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 items-center justify-center gap-4 mt-7">
          {/*Mapping on products */}
          {products.map((product) => {
            return (
              <div key={product.product_id}>
                <img src={`${url}${product.image}`} alt={product.name} />

                <Link to="/product/123">
                  <h3 className="my-1 md:text-xl truncate uppercase">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center [&>*]:mr-3">
                  <p className="my-1 md:text-xl uppercase">
                    GHC {product.price}
                  </p>
                  <div onClick={handleLike}>
                    {like ? (
                      <AiFillHeart className="text-lg text-red-400/75 md:text-xl " />
                    ) : (
                      <AiOutlineHeart className="text-lg text-red-400/75 md:text-xl " />
                    )}
                  </div>
                </div>
                <p className="bg-sky-500 px-4 py-2 mt-2 shadow-md md:text-lg uppercase text-center">
                  ADD TO CART
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Products;
