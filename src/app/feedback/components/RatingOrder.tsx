import React, { useState } from "react";

import AwesomeSVG from "@/utils/emoji-svg/AwesomeSVG";
import BadSVG from "@/utils/emoji-svg/BadSVG";
import Comment from "./FeedbackComment";
import FeedbackComment from "./FeedbackComment";
import FeedbackTags from "./FeedbackTags";
import GoodSVG from "@/utils/emoji-svg/GoodSVG";
import OkeySVG from "@/utils/emoji-svg/OkeySVG";
import Tags from "./FeedbackTags";
import TerribleSVG from "@/utils/emoji-svg/TerribleSVG";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { ratingOptions } from "../../../utils/ratingOptions";
import { useFeedbackContext } from "@/context/FeedbackContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const RatingOrder: React.FC = () => {
  const { setItem } = useLocalStorage();
  const { setEmojiOrderContext } = useFeedbackContext();
  const [emojiOrder, setEmojiOrder] = useState<string | null>(null);

  const handleEmojiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmoji = e.target.value;
    setEmojiOrder(newEmoji);
    setEmojiOrderContext(newEmoji);
    setItem("emojiOrder", newEmoji);
    setItem("typeOrder", "ORDER");
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
                  checked={emojiOrder === option.value}
                  disabled={emojiOrder === option.value}
                />
                <label
                  htmlFor={option.value}
                  className={
                    emojiOrder === option.value
                      ? "selected-button"
                      : "unselected-button"
                  }
                >
                  {EmojiComponent}
                </label>
              </li>
              <h3>{capitalizeFirstLetter(option.value)}</h3>
            </div>
          );
        })}
      </ul>

      {emojiOrder !== null && (
        <>
          <FeedbackTags storageKey="orderTags" emojiOrder={emojiOrder} />
          <FeedbackComment
            storageKey="commentOrder"
            emojiService={emojiOrder}
          />
        </>
      )}
    </>
  );
};

export default RatingOrder;
