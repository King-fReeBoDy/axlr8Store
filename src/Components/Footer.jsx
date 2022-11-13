import React, { useContext } from "react";
import { FiTwitter, FiFacebook, FiInstagram } from "react-icons/fi";
import DataContext from "../Context/DataContext";
import { Link } from "react-router-dom";

function Footer() {
  const { categories } = useContext(DataContext);
  return (
    <footer className="p-10 bg-gray-100 mt-20  ">
      <div className=" [&>*]:mb-6 flex flex-col justify-center md:flex-row md:justify-between w-full">
        <div className="text-center">
          <h3>QUICK SHOP</h3>

          <p>MY ACCOUNT</p>
          <p>CART</p>

          <Link to="/wishlist">
            <p>WISHLIST</p>
          </Link>
        </div>

        <div className="text-center">
          <h3>CATEGORIES</h3>

          {categories.map((category, i) => {
            return (
              <Link to={`/category/${category.name}`} key={i}>
                <p className="uppercase">{category.name}</p>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <h3>CUSTOMER CARE</h3>

          <p>CONTACT US</p>

          <Link to="/FAQ">
            <p>FAQ</p>
          </Link>
          <p>HELP</p>
        </div>
      </div>

      <div className="flex justify-center items-center [&>*]:w-full mt-6 [&>*]:mr-3 [&>*]:text-sky-500">
        <hr className="w-full" />
        <FiTwitter className="text-xl" />
        <FiFacebook className="text-xl" />
        <FiInstagram className="text-xl" />
        <hr className="w-full" />
      </div>

      <p className="text-center mt-6">
        &copy;2022 AXLR8MARKET WAS DEVELOPED BY AXLR8DEVTEAM
      </p>
    </footer>
  );
}

export default Footer;
