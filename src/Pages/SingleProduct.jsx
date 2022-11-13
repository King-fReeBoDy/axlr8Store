import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { VscArrowSmallLeft } from "react-icons/vsc";
import { Link, useParams } from "react-router-dom";
import DataContext from "../Context/DataContext";
import AddReview from "../Components/AddReview";
import AllReviews from "../Components/AllReviews";
import { FaStar } from "react-icons/fa";
import ReviewModal from "../Components/ReviewModal";
import Loading from "../Components/Loading";

function SingleProduct() {
  const [number, setNumber] = useState(0);
  const params = useParams(); //Getting the id from the url
  const [wishlist, setWishlist] = useState(false); //State for checking the wishlist
  const [newProduct, setNewProduct] = useState({});
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [feedbackId, setFeedbackId] = useState("");
  // console.log(newProduct);
  //Global states from the DataContext
  const {
    url,
    addToCart,
    addToWishlist,
    deleteWishlistItem,
    loggedInUser,
    showAlert,
    comment,
    setComment,
    setRating,
    rating,
  } = useContext(DataContext);

  const handleShowModal = (id) => {
    const newFeedback = feedbacks.find((feedback) => feedback.id === id);
    setFeedbackId((prevId) => (prevId = newFeedback.id));
    setComment((prevComment) => (prevComment = newFeedback.message));
    setRating((prevRating) => (prevRating = newFeedback.rating));
    setShowModal(true);
    console.log(feedbackId);
  };

  // Function handling the wishlist state
  const handleWishlist = (productId) => {
    if (!wishlist) {
      addToWishlist(productId);
      setWishlist(true);
      return;
    }
    deleteWishlistItem(productId);
    setWishlist(false);
  };

  const oneProduct = async () => {
    const { data } = await axios(`${url}products/`);
    const res = await axios(`${url}products/images/${params.id}/`);
    const findOne = data.results.find((product) => product.code === params.id);
    setImages(res.data);
    setNewProduct(findOne);
    setLoading(false);
  };

  //Finding a the single item
  useEffect(() => {
    oneProduct();
  }, []);

  //Destructuring the new product
  const {
    id,
    name,
    description,
    in_stock,
    price,
    feedbacks,
    product_avg_rating,
  } = newProduct;

  const checkWishlistItems = async () => {
    const { data } = await axios(
      `${url}wishlist/exist/${loggedInUser.id + "" + id}/`
    );
    setWishlist(data.in_wishlist);
  };

  useEffect(() => {
    checkWishlistItems();
  }, [newProduct]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-5 mt-3 md:p-10">
      <div className="flex justify-between items-center">
        <Link to={`/category/${params.name}`}>
          <VscArrowSmallLeft className="text-3xl my-4" />
        </Link>
        <p>BREADCRUMS</p>
      </div>
      <div className="">
        <img
          src={`${url}${images[number]?.image}`}
          alt={name}
          className="aspect-[2/2] object-cover"
        />
      </div>
      <div className="flex [&>*]:mr-4 mt-3">
        {images.map((image, i) => {
          return (
            <div
              key={i}
              className="border-2 flex-shrink-0 flex-wrap overflow-x-auto "
            >
              <img
                onClick={() => setNumber(i)}
                src={`${url}${image.image}`}
                className="w-20 object-cover block"
              />
            </div>
          );
        })}
      </div>
      <h2 className="text-2xl mt-4 md:text-4xl">{name}</h2>
      <p className="text-xl text-gray-500 my-2 md:text-2xl">GHC {price}</p>
      <p
        className={`my-2 ${
          in_stock < 6 ? "text-rose-600" : "text-emerald-600"
        } md:text-lg`}
      >
        {in_stock} IN STOCK
      </p>

      <p className="flex">
        {[...Array(5)].map((star, index) => {
          return (
            <FaStar
              className={
                index < Math.round(product_avg_rating[0]?.value)
                  ? "text-amber-500 text-md"
                  : "text-gray-300 text-md"
              }
            />
          );
        })}
      </p>

      <div className="flex [&>*]:mr-2 my-2 ">
        <p
          onClick={() => addToCart(newProduct.id)}
          className="bg-sky-500 text-xl py-1 px-4 md:text-2xl shadow-md hover:shadow-lg hover:bg-sky-500/75 transition-all duration-300"
        >
          ADD TO CART
        </p>

        <Link to={`/buynow/${params.id}`}>
          <p className="border text-xl py-1 px-4 md:text-2xl shadow-md hover:bg-sky-500 md:shadow-lg transition-all duration-300">
            BUY NOW
          </p>
        </Link>
      </div>
      <div className="flex items-center my-3">
        <div className="mr-3" onClick={() => handleWishlist(newProduct.id)}>
          {wishlist ? (
            <AiFillHeart className="text-lg text-red-400/75 md:text-xl " />
          ) : (
            <AiOutlineHeart className="text-lg text-red-400/75 md:text-xl " />
          )}
        </div>
        <p className="text-sm md:text-md text-gray-400">ADD TO WISHLIST</p>
      </div>
      <h2 className="text-xl my-3 md:text-2xl">DESCRIPTION</h2>
      <p className="md:text-xl overflow-hidden">{description}</p>

      <AddReview id={id} />

      {feedbacks.length > 1 && (
        <div className="my-10">
          <p className="text-lg font-semibold my-3 text-center">
            CUSTOMERS FEEDBACK
          </p>
          {feedbacks.map((feedback) => {
            return (
              <div key={feedback.id}>
                <AllReviews
                  feedback={feedback}
                  id={id}
                  handleShowModal={handleShowModal}
                />
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <div>
          <ReviewModal
            params={params}
            handleShowModal={handleShowModal}
            feedbackId={feedbackId}
            id={id}
            setShowModal={setShowModal}
          />
        </div>
      )}
    </div>
  );
}

export default SingleProduct;
