import React, { useEffect, useState } from "react";

import Emoji from "../shared/Emoji";
import FeedbackComment from "./FeedbackComment";
import TagsService from "./TagsService";
import { ratingOptions } from "../../utils/ratingOptions";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const RatingService: React.FC = () => {
  const { setItem } = useLocalStorage();

  const [emojiService, setEmojiService] = useState<string | null>(null);

  const handleEmojiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmoji = e.target.value;
    setEmojiService(newEmoji);
    setItem("emojiService", newEmoji);
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
              checked={emojiService === option.value}
              disabled={emojiService !== null}
            />
            <label
              htmlFor={option.value}
              className={
                emojiService === option.value
                  ? "selected-button"
                  : "unselected-button"
              }
            >
              <Emoji symbol={option.symbol} label={option.label} size={35} />
            </label>
          </li>
        ))}
      </ul>

      {emojiService !== null && (
        <>
          <TagsService emojiService={emojiService} />
          <FeedbackComment storageKey="commentService" />
        </>
      )}
    </>
  );
};

export default RatingService;
