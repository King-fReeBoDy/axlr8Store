import React, { useContext } from "react";
import { FaStar } from "react-icons/fa";
import DataContext from "../Context/DataContext";
import axios from "axios";

function ReviewModal({ handleShowModal, id, feedbackId, setShowModal }) {
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

  const updateReview = async () => {
    try {
      const { data } = await axios.patch(`${url}feedback/update/`, {
        fb_id: feedbackId,
        evaluation: rating + "",
        message: comment,
        user: loggedInUser.username,
        product: id,
        rating: rating,
      });
      showAlert(true, "success", "REVIEW UPDATED");
    } catch (error) {
      showAlert(true, "error", error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/75 z-[900000]  ">
      <div className="relative bg-white w-[90%] mx-auto mt-20 p-4 shadow-md shadow-white/25 z-[900000000]">
        <p className="text-xl font-semibold text-center mb-3">UPDATE REVIEW</p>

        <div className="flex text-xl justify-center">
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

        <div className="grid mb-5">
          <label className="text-sm">COMMENT</label>
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          ></textarea>
        </div>
        <p
          className="bg-sky-500 py-2 px-4 text-center text-lg font-semibold shadow-md"
          onClick={updateReview}
        >
          UPDATE REVIEW
        </p>
        <p
          className="text-center mt-4 border px-4 py-2"
          onClick={() => setShowModal(false)}
        >
          CANCEL
        </p>
      </div>
    </div>
  );
}

export default ReviewModal;
