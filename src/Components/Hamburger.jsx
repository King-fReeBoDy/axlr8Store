import React, { useContext } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FiTwitter, FiFacebook, FiInstagram } from "react-icons/fi";
import { BsBoxArrowRight } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";
import { Link } from "react-router-dom";
import DataContext from "../Context/DataContext";

function Hamburger({ showHam, handleHamburger }) {
  const { categories } = useContext(DataContext);
  return (
    <section
      className={`fixed inset-0 pl-8 md:pl-16 pt-10 [&>*]:text-black z-[10000000] bg-white w-[320px] h-screen transition-all duration-500 ease-in-out  ${
        showHam ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div onClick={handleHamburger}>
        <VscChromeClose className="text-2xl" />
      </div>

      <div className="overflow-hidden">
        <ul className="mt-3">
          <Link to="/">
            <li
              onClick={handleHamburger}
              className="relative after:transition-all after:duration-300 w-10 z-10 mb-3 after:content-['']  after:absolute after:bottom-0 after:left-0 after:h-2 after:w-full after:-z-10 after:bg-sky-500 font-semibold after:-translate-x-full hover:after:translate-x-0"
            >
              HOME
            </li>
          </Link>
          <Link onClick={handleHamburger} to="/about">
            <li className="relative after:transition-all after:duration-300 w-[77px] z-10 mb-3 after:content-['']  after:absolute after:bottom-0 after:left-0 after:h-2 after:w-full after:-z-[10000] after:bg-sky-500 font-semibold after:-translate-x-full hover:after:translate-x-0">
              ABOUT US
            </li>
          </Link>
          <Link onClick={handleHamburger} to="/contact">
            <li className="relative after:transition-all after:duration-300 w-[100px] z-10 mb-3 after:content-['']  after:absolute after:bottom-0 after:left-0 after:h-2 after:w-full after:-z-10 after:bg-sky-500 font-semibold after:-translate-x-full hover:after:translate-x-0">
              CONTACT US
            </li>
          </Link>
        </ul>
      </div>
      <hr className="w-28" />

      <div className="overflow-y-auto h-[320px] my-2">
        <ul className="mt-3">
          {categories.map((category, i) => {
            return (
              <Link to={`/category/${category.name}`} key={i}>
                <li
                  onClick={handleHamburger}
                  className="relative uppercase after:transition-all after:duration-300 w-[77px] z-10 mb-3 after:content-['']  after:absolute after:bottom-0 after:left-0 after:h-2 after:w-full after:-z-[10000] after:bg-sky-500 font-semibold after:-translate-x-full hover:after:translate-x-0"
                >
                  {category.name}
                </li>
              </Link>
            );
          })}
        </ul>

        <hr className="w-28" />

        <Link to="/wishlist">
          <div
            onClick={handleHamburger}
            className="flex items-center mt-3 relative after:transition-all after:duration-300 w-[100px] z-10 mb-3 after:content-['']  after:absolute after:bottom-0 after:left-0 after:h-2 after:w-full after:-z-[10000] after:bg-sky-500 font-semibold after:-translate-x-full hover:after:translate-x-0"
          >
            <AiOutlineHeart className="text-lg" />
            <p className="ml-3 ">WISHLIST</p>
          </div>
        </Link>

        <div className="flex items-center my-3 relative after:transition-all after:duration-300 w-[170px] z-10 mb-3 after:content-['']  after:absolute after:bottom-0 after:left-0 after:h-2 after:w-full after:-z-[10000] after:bg-sky-500 font-semibold after:-translate-x-full hover:after:translate-x-0">
          <BsBoxArrowRight className="text-lg" />
          <Link to="/login">
            <p className="ml-3 " onClick={handleHamburger}>
              LOGIN / REGISTER
            </p>
          </Link>
        </div>
        <hr className="w-28" />

        <div className="flex [&>*]:mr-3 items-center mt-6 [&>*]:text-sky-500">
          <FiTwitter className="text-2xl" />
          <FiFacebook className="text-2xl" />
          <FiInstagram className="text-2xl" />
        </div>
      </div>
    </section>
  );
}

export default Hamburger;
