import React from "react";
import { useContext } from "react";
import DataContext from "../Context/DataContext";

function SingleWishlistItem({ wishlistProduct }) {
  const { url, deleteWishlistItem, addToCart } = useContext(DataContext);

  return (
    <div className="p-3 md:flex justify-between items-center md:w-[70%] mx-auto w-[90%]">
      <div className="flex items-center my-3 w-full">
        <img
          src={`${url}${wishlistProduct.product.image}`}
          alt=""
          className="w-[100px] object-cover mr-3"
        />

        <div className="">
          <h3 className="md:text-lg ">{wishlistProduct.product.name}</h3>
          <p>GHC {wishlistProduct.product.price}</p>
        </div>
      </div>

      <div className="flex items-center">
        <p
          className="py-1 px-2 mr-4 bg-sky-500 text-sm"
          onClick={() => addToCart(wishlistProduct.product.id)}
        >
          ADD TO CART
        </p>
        <p
          className="border border-red-500 px-2 py-1 text-sm text-red-500"
          onClick={() => deleteWishlistItem(wishlistProduct.product.id)}
        >
          REMOVE
        </p>
      </div>
    </div>
  );
}

export default SingleWishlistItem;
