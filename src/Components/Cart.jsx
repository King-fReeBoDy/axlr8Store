import React, { useEffect } from "react";
import { RiShoppingBagLine } from "react-icons/ri";
import { VscChromeClose } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { IoIosUndo } from "react-icons/io";
import CartItems from "./CartItems";
import axios from "axios";
import { useContext } from "react";
import DataContext from "../Context/DataContext";

function Cart({ handleCart, showCart }) {
  //Global states from the AuthContext
  const { url, loggedInUser, cart, setCart, getCartItems } =
    useContext(DataContext);

  useEffect(() => {
    loggedInUser && getCartItems();
  }, [loggedInUser]);

  return (
    <div
      className={`fixed inset-0 px-10 pt-10 [&>*]:text-black z-[9000] bg-white w-[320px] h-screen transition-all duration-500 ease-in-out  ml-auto ${
        showCart ? " origin-right" : "translate-x-[100%]"
      }`}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold">CART</h1>
        <div onClick={handleCart}>
          <VscChromeClose className="text-2xl" />
        </div>
      </div>

      {/*Conditional rendering */}
      {cart.length > 0 ? (
        <CartItems cart={cart} handleCart={handleCart} />
      ) : (
        <div>
          <div className=" mt-16 grid justify-center">
            <RiShoppingBagLine className="text-[10rem] w-full" />
            <p className="text-lg font-semi-bold mt-4">
              CART IS CURRENTLY EMPTY
            </p>
          </div>

          <Link to="/" onClick={handleCart}>
            <p className="flex justify-center items-center py-2 px-4 bg-sky-500 text-center mt-8 text-lg  shadow-lg">
              <IoIosUndo className="mr-3" /> <p>RETURN TO SHOP</p>
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
