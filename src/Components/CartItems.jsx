import React, { useContext } from "react";
import SingleCartItem from "./SingleCartItem";
import { Link } from "react-router-dom";
import DataContext from "../Context/DataContext";
import axios from "axios";

function CartItems({ cart, handleCart }) {
  const { url, loggedInUser, getCartItems } = useContext(DataContext);
  let totalInCart = [];
  cart.map((item) => {
    let temp = item.product.price * item.qty;
    totalInCart.push(temp);
  });

  let sum = totalInCart.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const clearCart = async () => {
    const { data } = await axios.delete(`${url}cart/clear/${loggedInUser.id}/`);
    getCartItems();
  };
  return (
    <>
      <div className="h-[300px] overflow-y-auto">
        {/*Mapping on cart items */}
        {cart.map((item) => {
          return <SingleCartItem item={item} key={item.id} />;
        })}
      </div>

      <hr className="mt-6 mb-3" />

      <div className="flex justify-between items-center p-2 my-3">
        <p>TOTAL</p>
        <p className="font-semibold transition-all duration-300">GHC {sum}</p>
      </div>

      <div className="flex justify-between">
        <p
          className="border text-red-500 border-red-500 text-center px-4 py-2 shadow-md"
          onClick={clearCart}
        >
          CLEAR CART
        </p>
        <Link to="/checkout" onClick={handleCart}>
          <p className="text-center px-4 py-2 bg-sky-500 shadow-md">CHECKOUT</p>
        </Link>
      </div>
    </>
  );
}

export default CartItems;
