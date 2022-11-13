import React, { useContext, useState, useEffect } from "react";
import DataContext from "../Context/DataContext";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Loading from "../Components/Loading";
function BuyNow() {
  const {
    url,
    fullName,
    setFullName,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    loggedInUser,
    showAlert,
    emailRegex,
    phoneRegex,
    nameRegex,
  } = useContext(DataContext);
  const [newProduct, setNewProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams(); //Getting the id from the url
  const [quantity, setQuantity] = useState(1);

  // let totalInChekout = [];

  const oneProduct = async () => {
    try {
      const { data } = await axios(`${url}products/`);
      const findOne = data.find((product) => product.code === params.id);
      console.log(findOne);
      setNewProduct(findOne);
      setLoading(false);
    } catch (error) {
      showAlert(true, "error", error.message);
    }
  };

  useEffect(() => {
    oneProduct();
  }, []);

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!fullName && !email && !phoneNumber) {
      showAlert(true, "error", "INPUT ALL FIELDS");
      return;
    }
    if (fullName.length < 3 || !fullName.match(nameRegex)) {
      showAlert(true, "error", "INVALID NAME");
      return;
    }
    if (!email.match(emailRegex)) {
      showAlert(true, "error", "INVALID EMAIL");
      return;
    }
    if (!phoneNumber.match(phoneRegex)) {
      showAlert(true, "error", "INVALID NUMBER");
      return;
    }
    handleBuyNow();
    showAlert(true, "success", "ORDER SUCCESSFUL");
  };

  const handleBuyNow = async () => {
    try {
      const { data } = await axios.post(`${url}product/buynow/`, {
        qty: quantity,
        user: loggedInUser.id,
        product: params.id,
        name: fullName,
        email: email,
        phone: phoneNumber,
      });
      setEmail("");
      setFullName("");
      setPhoneNumber("");
      setQuantity(1);
    } catch (error) {
      showAlert(true, "error", error.message);
    }
  };

  const { name, price, image } = newProduct;

  if (loading) return <Loading />;

  return (
    <form
      className="mt-10 p-2 container mx-auto md:w-[70%] lg:w-[700px]"
      onSubmit={handleSubmitOrder}
    >
      <h1 className="text-center text-3xl font-semi-bold">CHECKOUT</h1>

      <div className="w-[90%] mx-auto mt-4 [&>*]:mb-3">
        <p className="text-center text-xl mb-4 text-sky-500">
          PERSONAL INFORMATION
        </p>

        <div className="grid gap-1">
          <label className="text-xs text-gray-500">FULL NAME</label>
          <input
            type="text"
            value={fullName}
            maxLength="30"
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="grid gap-1">
          <label className="text-xs text-gray-500">EMAIL</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength="20"
            minLength="8"
          />
        </div>
        <div className="grid gap-1">
          <label className="text-xs text-gray-500">PHONE NUMBER</label>
          <input
            type="number"
            value={phoneNumber}
            maxLength="10"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>
      <div className="w-[90%] mx-auto mt-6 [&>*]:mb-5">
        <p className="text-center text-xl text-sky-500">ITEM</p>

        <div className=" flex mb-3 w-full">
          <img
            className="w-[70px] object-cover"
            src={`${url}${image}`}
            alt={name}
          />

          <div className="ml-3">
            <p className="truncate w-36 font-semibold text-lg">{name}</p>
            <p className="">GHC {price}</p>
            <input
              type="number"
              className="w-16 ml-auto"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              min="1"
              required
            />
          </div>
        </div>

        <div className="flex justify-between">
          <p>TOTAL</p>
          <p>GHC {price * quantity}</p>
        </div>

        <div className="mt-5">
          <button
            type="submit"
            className="bg-sky-500 py-2 px-4 text-center mb-2 w-full shadow-md"
          >
            CONFIRM ORDER
          </button>
          <Link to="/">
            <p className="text-center border px-4 py-2 shadow-md">
              CONTINUE SHOPPING
            </p>
          </Link>
        </div>
      </div>
    </form>
  );
}

export default BuyNow;
