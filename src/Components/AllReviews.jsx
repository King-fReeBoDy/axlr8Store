import React, { useContext } from "react";
import { FaPen, FaStar, FaTrash } from "react-icons/fa";
import DataContext from "../Context/DataContext";
import axios from "axios";

function Reviews({ handleShowModal, id, feedback }) {
  const { url, comment, loggedInUser, showAlert } = useContext(DataContext);
  // console.log(feedback);

  const deleteReview = async (feedbackId) => {
    try {
      const { data } = await axios.delete(
        `${url}feedback/delete/${loggedInUser.id}/${feedbackId}/${id}/`
      );
      console.log(data);
      showAlert(true, "success", "REVIEW DELETED");
    } catch (error) {
      showAlert(true, "error", error.message);
    }
    console.log(id, feedbackId, loggedInUser.id);
  };

  return (
    <section className="border-b-2 py-2">
      <header className="flex justify-between mb-3">
        <div className="flex items-center">
          {[...Array(5)].map((star, index) => {
            return (
              <FaStar
                className={
                  index < Math.round(feedback.rating)
                    ? "text-amber-500 text-xs"
                    : "text-gray-300 text-xs"
                }
              />
            );
          })}
        </div>
        <p className="text-gray-400">{feedback.updated}</p>
      </header>
      <p className="font-semibold mb-2">{feedback.evaluation}</p>
      <p className="mb-2">{feedback.message}</p>
      <div className="flex items-center justify-between">
        <p className="text-gray-400">by {feedback.user}</p>
        <div className="flex">
          <div onClick={() => handleShowModal(feedback.id)}>
            <FaPen className="text-sm mr-3 text-sky-500" />
          </div>
          <div onClick={() => deleteReview(feedback.id)}>
            <FaTrash className="text-sm text-red-300" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reviews;
