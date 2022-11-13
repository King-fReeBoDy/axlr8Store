import React, { useContext, useEffect } from "react";
import AuthContext from "../Context/DataContext";
import axios from "axios";
import SingleWishlistItem from "../Components/SingleWishlistItem";
function Wishlist() {
  //Global states from the AuthContext
  const { url, loggedInUser, wishlistProducts, setWishlistProducts } =
    useContext(AuthContext);

  //Getting all wishlist
  const getWishlist = async () => {
    const { data } = await axios(`${url}wishlist/${loggedInUser.id}/`);
    setWishlistProducts(data);
  };

  useEffect(() => {
    loggedInUser && getWishlist();
  }, [loggedInUser]);

  return (
    <div className="my-10 p-2">
      <h1 className="text-center text-3xl font-semibold">WISHLIST</h1>

      {/*Mapping on wishlist items */}
      {wishlistProducts.map((wishlistProduct) => {
        return (
          <SingleWishlistItem
            wishlistProduct={wishlistProduct}
            key={wishlistProduct.product.id}
          />
        );
      })}
    </div>
  );
}

export default Wishlist;
