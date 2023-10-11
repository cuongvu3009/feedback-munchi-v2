"use client";

import React, { useRef, useState } from "react";

import Button from "@/components/shared/Button";
import { CommentProps } from "@/types/feedback.types";
import { useFeedbackContext } from "@/context/FeedbackContext";
import { useTranslations } from "next-intl";

const FeedbackComment: React.FC<CommentProps> = ({ type, emoji }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const commentRef = useRef<string>("");
  const t = useTranslations("Comment");

  const { addOrUpdateRatingItem } = useFeedbackContext();

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    commentRef.current = e.target.value;
    // Update the state to reflect changes in the textarea
    setIsFormSubmitted(false); // Reset the form submitted state
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
            {t("addComentBtn")}
          </div>
        </div>
      </div>
      {isPopupOpen && (
        <div className="popup">
          <form className="popup-container" onSubmit={handleSubmit}>
            <h3 className="popup-comment">{t("commentTitle")}</h3>

            <textarea
              placeholder={t("placeHolder")}
              defaultValue={commentRef.current} // Use defaultValue to initialize the textarea
              onChange={handleCommentChange}
            ></textarea>
            <Button type="submit" version="primary" btnText={t("saveBtn")} />
            <Button
              onClick={closePopup}
              version="secondary"
              btnText={t("cancelBtn")}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default FeedbackComment;
