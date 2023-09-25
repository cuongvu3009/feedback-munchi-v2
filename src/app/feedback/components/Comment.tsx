import React, { useEffect, useRef, useState } from "react";

import Button from "@/components/shared/Button";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface CommentProps {
  emoji?: string | null;
}

const FeedbackComment: React.FC<CommentProps> = ({ emoji }) => {
  const { getItem, setItem, removeItem } = useLocalStorage();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const commentInputRef = useRef<HTMLInputElement>(null);

  const openPopup = () => {
    setIsPopupOpen(true);
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const storedComment = getItem("comment");
    if (storedComment && commentInputRef.current) {
      commentInputRef.current.value = storedComment;
    }
  }, [getItem]);

  useEffect(() => {
    removeItem("comment");
    setIsFormSubmitted(false);
  }, [emoji, removeItem]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const comment = commentInputRef.current?.value || "";
    if (!comment.trim()) {
      return;
    }

    setItem("comment", comment);

    if (commentInputRef.current) {
      commentInputRef.current.value = "";
    }

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
            <input
              type="text"
              placeholder="Your comment here..."
              ref={commentInputRef}
            />
            <Button type="submit" version="primary" btnText="Save" />
            <Button onClick={closePopup} version="secondary" btnText="Cancel" />
          </form>
        </div>
      )}
    </>
  );
};

export default FeedbackComment;
