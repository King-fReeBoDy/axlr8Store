import React, { useEffect, useState, useContext } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";
import { VscMenu } from "react-icons/vsc";
import Overlay from "./Overlay";
import { Link, useNavigate } from "react-router-dom";
import Cart from "./Cart";
import Search from "./Search";
import Hamburger from "./Hamburger";
import DataContext from "../Context/DataContext";

function Navbar() {
  const [showHam, setShowHam] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const navigate = useNavigate();
  const handleHamburger = () => setShowHam(!showHam);
  const handleSearch = () => setShowSearch(!showSearch);
  const handleCart = () => setShowCart(!showCart);
  const [nav, setNav] = useState(false);
  const { cart } = useContext(DataContext);

  useEffect(() => {
    //Function handling item search
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (searchItem === "") return;
        setShowSearch(false);
        navigate(`/searchpage/${searchItem}`);
        setSearchItem("");
      }

      if (event.key === "q" && event.ctrlKey) {
        setShowSearch(!showSearch);
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [searchItem, navigate, showSearch]);

  const navChange = () => {
    if (window.scrollY >= 60) {
      setNav(true);
    } else {
      setNav(false);
    }
  };

  useEffect(() => {
    navChange();
    window.addEventListener("scroll", navChange);
    return () => window.removeEventListener("scroll", navChange);
  }, [nav]);
  return (
    <div
      className={
        nav &&
        "fixed inset-x-0 top-0 bg-white/75 backdrop-blur-md z-50 transition-all duration-300"
      }
    >
      <nav className="flex justify-between items-center px-3 md:px-8 py-6 relative">
        <div className="flex items-center relative">
          <div className="" onClick={handleHamburger}>
            <VscMenu className="text-2xl md:text-3xl font-base" />
          </div>

          <p className="text-sm ml-3">MENU</p>
        </div>
        <Link to="/">
          <p className="text-lg font-semibold md:text-xl">AXLR8MARKET</p>
        </Link>
        <div className="flex items-center">
          <div className="mr-3 text-2xl md:text-3xl" onClick={handleSearch}>
            <IoSearchOutline />
          </div>
          <div className="text-2xl md:text-3xl relative" onClick={handleCart}>
            <HiOutlineShoppingBag />
            <p className="absolute right-0 -bottom-2 text-xs bg-sky-500 rounded-full px-1">
              {cart.length}
            </p>
          </div>
        </div>
        <Search
          handleSearch={handleSearch}
          showSearch={showSearch}
          setSearchItem={setSearchItem}
          searchItem={searchItem}
        />
        <Cart handleCart={handleCart} showCart={showCart} />
        <Hamburger showHam={showHam} handleHamburger={handleHamburger} />
      </nav>
      {showCart && <Overlay showCart={showCart} />}
      {showHam && <Overlay showHam={showHam} />}
    </div>
  );
}

export default Navbar;
