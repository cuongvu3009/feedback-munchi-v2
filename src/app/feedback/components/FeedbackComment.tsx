"use client";

import React, { useRef, useState } from "react";

import Button from "@/components/shared/Button";
import { useFeedbackContext } from "@/context/FeedbackContext";

interface CommentProps {
  type: string;
  emoji: string;
}

const FeedbackComment: React.FC<CommentProps> = ({ type, emoji }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const commentRef = useRef<string>("");

  const { addOrUpdateRatingItem } = useFeedbackContext();

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    commentRef.current = e.target.value;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!commentRef.current.trim()) {
      return;
    }

    const newRatingItem = {
      type,
      emoji,
      comment: commentRef.current, // Use the ref value
    };
    addOrUpdateRatingItem(newRatingItem);

    closePopup();

    setIsFormSubmitted(true);
  };

  return (
    <>
      <div className="comment">
        <div className="user-comment">
          <div
            className={`card card-comment ${
              isFormSubmitted ? "form-submitted" : ""
            }`}
            onClick={openPopup}
          >
            + Add a comment for the restaurant
          </div>
        </div>
      </div>
      {isPopupOpen && (
        <div className="popup">
          <form className="popup-container" onSubmit={handleSubmit}>
            <h3 className="popup-comment">Add a comment for the restaurant</h3>

            <textarea
              placeholder="Your comment here..."
              defaultValue={commentRef.current} // Use defaultValue to initialize the textarea
              onChange={handleCommentChange}
            ></textarea>
            <Button type="submit" version="primary" btnText="Save" />
            <Button onClick={closePopup} version="secondary" btnText="Cancel" />
          </form>
        </div>
      )}
    </>
  );
};

export default FeedbackComment;
