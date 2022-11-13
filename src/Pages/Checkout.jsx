import React, { useContext } from "react";
import DataContext from "../Context/DataContext";
import { Link } from "react-router-dom";

function Checkout() {
  const {
    url,
    cart,
    fullName,
    setFullName,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    confirmOrder,
    showAlert,
    emailRegex,
    phoneRegex,
    nameRegex,
  } = useContext(DataContext);

  let totalInChekout = [];

  cart.map((item) => {
    let temp = item.product.price * item.qty;
    totalInChekout.push(temp);
  });

  let sum = totalInChekout.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

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

    confirmOrder();
  };

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
          <input type="text" onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div className="grid gap-1">
          <label className="text-xs text-gray-500">EMAIL</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="grid gap-1">
          <label className="text-xs text-gray-500">PHONE NUMBER</label>
          <input
            type="number"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>
      <div className="w-[90%] mx-auto mt-6 [&>*]:mb-5">
        <p className="text-center text-xl text-sky-500">ITEMS IN CART</p>

        <div>
          {cart.map((item) => {
            // console.log(item);
            return (
              <ul key={item.id}>
                <li className="flex mb-3">
                  <img
                    className="w-[70px] object-cover"
                    src={`${url}${item.product.image}`}
                    alt={item.product.name}
                  />

                  <div className="ml-3">
                    <p className="w-40 truncate font-semibold text-lg">
                      {item.product.name}
                    </p>
                    <p className="">GHC {item.product.price}</p>
                    <p>
                      <span className="text-sm font-semibold">QTY:</span>{" "}
                      {item.qty}{" "}
                    </p>
                  </div>
                </li>
              </ul>
            );
          })}
        </div>

        <div className="flex justify-between">
          <p>TOTAL</p>
          <p>GHC {sum}</p>
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

export default Checkout;
