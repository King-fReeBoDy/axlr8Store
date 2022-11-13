import React, { useContext } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import DataContext from "../Context/DataContext";

//Items in each category
function CategoryItems({ product, name }) {
  //Global states from the DataContext
  const { url, addToWishlist, addToCart } = useContext(DataContext);
  return (
    <div>
      <img src={`${url}${product.image}`} alt={product.name} />

      <Link to={`/category/${name}/${product.code}`}>
        <h3 className="my-1 md:text-xl truncate uppercase">{product.name}</h3>
      </Link>
      <div className="flex items-center">
        <p className="my-1 md:text-xl uppercase">GHC {product.price}</p>
      </div>
      <p
        className="bg-sky-500 px-4 py-2 mt-2 shadow-md md:text-lg uppercase text-center"
        onClick={() => addToCart(product.id)}
      >
        ADD TO CART
      </p>
    </div>
  );
}

export default CategoryItems;
