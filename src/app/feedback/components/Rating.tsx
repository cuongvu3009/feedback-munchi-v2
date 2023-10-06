import React, { useState } from "react";

import AwesomeSVG from "@/utils/emoji-svg/AwesomeSVG";
import BadSVG from "@/utils/emoji-svg/BadSVG";
import FeedbackComment from "@/app/feedback/components/FeedbackComment";
import FeedbackTags from "./FeedbackTags";
import GoodSVG from "@/utils/emoji-svg/GoodSVG";
import OkeySVG from "@/utils/emoji-svg/OkeySVG";
import TerribleSVG from "@/utils/emoji-svg/TerribleSVG";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { ratingOptions } from "@/utils/ratingOptions";
import { useFeedbackContext } from "@/context/FeedbackContext";

interface RatingProps {
  type: string;
}
interface RatingItem {
  type: string;
  emoji: string;
  comment?: string;
  tags?: string[];
}
const Rating: React.FC<RatingProps> = ({ type }) => {
  const { rating, setRating } = useFeedbackContext();
  const [emoji, setEmoji] = useState<string | null>(null);

  const handleEmojiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmoji = e.target.value;
    setEmoji(newEmoji);

    // Create a new rating object with the selected type and emoji
    const newRatingItem: RatingItem = {
      type,
      emoji: newEmoji,
    };

    // Use the setRating function to update the rating state
    setRating((prevRating) => [...prevRating, newRatingItem]);
  };

  return (
    <>
      <ul className="rating">
        {ratingOptions.map((option, index) => {
          // Map each option to its corresponding SVG component
          const EmojiComponent = {
            terrible: <TerribleSVG size={50} />,
            bad: <BadSVG size={50} />,
            okey: <OkeySVG size={50} />,
            good: <GoodSVG size={50} />,
            awesome: <AwesomeSVG size={50} />,
          }[option.value];

          return (
            <div className="emoji-wrapper" key={`rating-${index + 1}`}>
              <li key={`rating-${index + 1}`}>
                <input
                  type="radio"
                  id={option.value}
                  name="rating"
                  value={option.value}
                  onChange={handleEmojiChange}
                  checked={emoji === option.value}
                  disabled={emoji === option.value}
                />
                <label
                  htmlFor={option.value}
                  className={
                    emoji === option.value
                      ? "selected-button"
                      : "unselected-button"
                  }
                >
                  {EmojiComponent}
                  {/* Render the corresponding SVG component */}
                </label>
              </li>
              <h3 className="emoji-text">
                {capitalizeFirstLetter(option.value)}
              </h3>
            </div>
          );
        })}
      </ul>

      {/* {emoji !== null && (
        <>
          {type === "SERVICE" ? (
            <FeedbackTags storageKey="serviceTags" emojiService={emoji} />
          ) : (
            <FeedbackTags storageKey="orderTags" emojiOrder={emoji} />
          )}
          <FeedbackComment
            storageKey={type === "SERVICE" ? "commentService" : "commentOrder"}
            emojiService={emoji}
          />
        </>
      )} */}
    </>
  );
};

export default Rating;
