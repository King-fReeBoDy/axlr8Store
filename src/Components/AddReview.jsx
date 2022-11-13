import React, { useContext, useState } from "react";
import { FaStar } from "react-icons/fa";
import DataContext from "../Context/DataContext";
import axios from "axios";
function Review({ id }) {
  const {
    url,
    loggedInUser,
    showAlert,
    rating,
    setRating,
    hover,
    setHover,
    comment,
    setComment,
  } = useContext(DataContext);

  const addReview = async () => {
    try {
      const { data } = await axios.post(`${url}feedback/add/`, {
        evaluation: rating + "",
        message: comment,
        user: loggedInUser.username,
        product: id,
        rating: rating,
      });
      console.log(data);
    } catch (error) {
      showAlert(true, "error", error.message);
    }
    showAlert(true, "success", "REVIEW ADDED");
    setComment("");
    setRating("");
  };

  return (
    <form className="w-[90%] md:w-[70%] lg:w-[50%] mx-auto mt-10">
      <p className="text-xl text-center font-semibold">REVIEW</p>
      <div className="flex text-2xl my-6 justify-center [&>*]:mr-2 text-gray-400">
        {[...Array(5)].map((star, i) => {
          let starValue = i + 1;
          return (
            <FaStar
              className={
                starValue <= (hover || rating)
                  ? "text-amber-500"
                  : "text-gray-400"
              }
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(null)}
            />
          );
        })}
      </div>

      <div className="grid  mb-5">
        <label className="text-sm">COMMENT</label>
        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        ></textarea>
      </div>
      <p
        className="bg-sky-500 py-2 px-4 text-center text-lg font-semibold shadow-md"
        onClick={addReview}
      >
        POST A REVIEW
      </p>
    </form>
  );
}

export default Review;
