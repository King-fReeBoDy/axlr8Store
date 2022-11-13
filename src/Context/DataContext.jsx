import React, { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  //All products
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  //Global states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [toggle, setToggle] = useState({
    isTrue: false,
    type: "",
    msg: "",
  });

  //Getting all categories
  const getCartItems = async () => {
    const { data } = await axios(`${url}cart/${loggedInUser.id}/`);
    setCart(data);
  };

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const phoneRegex = /^\d{10}$/;
  const nameRegex = /[A-Za-z]+$/;
  const passwordRegex = /^[A-Za-z]\w{7,14}$/;

  //All cart items
  const [cart, setCart] = useState([]);

  //All wishlist items
  const [wishlistProducts, setWishlistProducts] = useState([]);

  //Setting logged in user
  // const newUser = );
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  //Base Url
  const url = "http://169.254.190.205:8000/";
  // const url = "http://192.168.1.188:8000/";
  // const url = "http://192.168.1.191:8000/";
  // const url = "http://172.20.10.7:8000/";

  //All categories
  const [categories, setCategories] = useState([]);

  //Adding a single product to the cart
  const addToCart = async (cartId) => {
    try {
      const { data } = await axios.post(`${url}cart/add/`, {
        user: loggedInUser.id,
        product: cartId,
        item_code: "" + loggedInUser.id + cartId,
      });
      getCartItems();
    } catch (error) {
      showAlert(true, "error", error.message);
    }
    showAlert(true, "success", " ITEM ADDED TO CART");
  };

  //Function for deleting a single item from the cart
  const deleteCartItem = async (productId) => {
    try {
      const { data } = await axios.delete(
        `${url}cart/delete/${loggedInUser.id}/${productId}/`
      );
      getCartItems();
    } catch (error) {
      showAlert(true, "error", error.message);
    }
    showAlert(true, "success", " ITEM DELETED FOR CART");
  };

  //Adding a single product to the wishlist and updating the wishlist
  const addToWishlist = async (productId) => {
    try {
      const res = await axios.post(`${url}wishlist/add/`, {
        user: loggedInUser.id,
        product: productId,
        item_code: "" + loggedInUser.id + productId,
      });
      setWishlistProducts(res.data);
    } catch (error) {
      showAlert(true, "error", error.message);
    }
    showAlert(true, "success", " ITEM ADDED TO WISHLIST");
  };

  //Function for deleting a single item from the wishlist
  const deleteWishlistItem = async (productId) => {
    try {
      const { data } = await axios.delete(
        `${url}wishlist/delete/${loggedInUser.id}/${productId}/`
      );
      setWishlistProducts(data);
    } catch (error) {
      showAlert(true, "error", error.message);
      return;
    }
    showAlert(true, "success", "ITEM DELETED FROM WISHLIST");
  };

  const confirmOrder = async () => {
    try {
      const { data } = await axios.post(`${url}order/create/`, {
        user: loggedInUser.id,
        name: fullName,
        email: email,
        phone: phoneNumber,
      });
      navigate("/congrats");
      setIsShow(true);
    } catch (error) {
      showAlert(true, "error", error.message);
      return;
    }
    showAlert(true, "success", "SUCCESSFULLY ORDERED");
    setFullName("");
    setEmail("");
    setPhoneNumber("");
  };

  const showAlert = (isTrue = false, type = "", msg = "") => {
    setToggle({ isTrue, type, msg });
  };

  const [ishow, setIsShow] = useState(false);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");

  return (
    <DataContext.Provider
      value={{
        products,
        setProducts,
        url,
        loggedInUser,
        setLoggedInUser,
        cart,
        setCart,
        wishlistProducts,
        setWishlistProducts,
        categories,
        setCategories,
        addToCart,
        deleteCartItem,
        addToWishlist,
        deleteWishlistItem,
        getCartItems,
        fullName,
        setFullName,
        email,
        setEmail,
        phoneNumber,
        setPhoneNumber,
        confirmOrder,
        showAlert,
        toggle,
        setToggle,
        emailRegex,
        phoneRegex,
        nameRegex,
        ishow,
        setIsShow,
        rating,
        setRating,
        hover,
        setHover,
        comment,
        setComment,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
