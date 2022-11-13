import React, { useContext, useState } from "react";
import { VscChevronUp, VscChevronDown } from "react-icons/vsc";
import axios from "axios";
import DataContext from "../Context/DataContext";

//Mapping on all items in the cart
function SingleCartItem({ item }) {
  const [quantity, setQuantity] = useState(item.qty); //State for handling the quantity of items
  const { url, loggedInUser, deleteCartItem, getCartItems } =
    useContext(DataContext); //Global states from the DataContext

  // console.log(allImages);
  const increase = (productId) => {
    setQuantity((prev) => prev + 1);
    increaseUpdateQuantity(productId);
  };

  const decrease = (productId) => {
    setQuantity((prev) => prev - 1);
    decreaseUpdateQuantity(productId);
  };

  const increaseUpdateQuantity = async (productId) => {
    const { data } = await axios.patch(
      `${url}cart/update/${loggedInUser.id}/${productId}/${quantity + 1}/`
    );
    getCartItems();
  };
  const decreaseUpdateQuantity = async (productId) => {
    const { data } = await axios.patch(
      `${url}cart/update/${loggedInUser.id}/${productId}/${quantity - 1}/`
    );
    getCartItems();
  };

  return (
    <div className="flex justify-between items-center gap-2 mt-6">
      <img
        src={`${url}${item.product.image}`}
        alt={item.product.name}
        className="w-[80px] object-cover"
      />

      <div className="text-sm">
        <p className="font-semibold uppercase truncate w-24 break-words">
          {item.product.name}
        </p>
        <p>GHC {item.product.price}</p>
        <p
          className="text-red-500"
          onClick={() => deleteCartItem(item.product.id)}
        >
          REMOVE
        </p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <VscChevronUp
          className="text-xl cursor-pointer"
          onClick={() => increase(item.product.id)}
        />
        <p className="font-semibold transition-all duration-200 text-lg">
          {quantity}
        </p>
        <VscChevronDown
          className="text-xl cursor-pointer"
          onClick={() => decrease(item.product.id)}
        />
      </div>
    </div>
  );
}

export default SingleCartItem;
