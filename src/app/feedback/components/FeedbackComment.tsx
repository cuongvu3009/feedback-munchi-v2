"use client";

import React, { useState } from "react";

import Button from "@/components/shared/Button";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface CommentProps {
  storageKey: "commentService" | "commentOrder";
  emojiService?: string | null;
  emojiOrder?: string | null;
}

const FeedbackComment: React.FC<CommentProps> = ({
  storageKey,
  emojiService,
  emojiOrder,
}) => {
  const { setItem } = useLocalStorage();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  let [comment, setComment] = useState("");

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment.trim()) {
      return;
    }

    setItem(storageKey, comment);

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
              value={comment}
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
