import React, { useState } from "react";

import Emoji from "../shared/Emoji";
import FeedbackComment from "./FeedbackComment";
import TagsOrder from "./TagsOrder";
import { ratingOptions } from "../../utils/ratingOptions";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const RatingOrder: React.FC = () => {
  const { setItem } = useLocalStorage();

  const [emojiOrder, setEmojiOrder] = useState<string | null>(null);

  const handleEmojiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmoji = e.target.value;
    setEmojiOrder(newEmoji);
    setItem("emojiOrder", newEmoji);
  };

  return (
    <>
      <ul className="rating">
        {ratingOptions.map((option, index) => (
          <li key={`rating-${index + 1}`}>
            <input
              type="radio"
              id={option.value}
              name="rating"
              value={option.value}
              onChange={handleEmojiChange}
              checked={emojiOrder === option.value}
              disabled={emojiOrder !== null}
            />
            <label
              htmlFor={option.value}
              className={
                emojiOrder === option.value
                  ? "selected-button"
                  : "unselected-button"
              }
            >
              <Emoji symbol={option.symbol} label={option.label} size={35} />
            </label>
          </li>
        ))}
      </ul>

      {emojiOrder !== null && (
        <>
          <TagsOrder emojiOrder={emojiOrder} />
          <FeedbackComment storageKey="commentOrder" />
        </>
      )}
    </>
  );
};

export default RatingOrder;
