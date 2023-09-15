import React, { useState } from "react";

import AwesomeSVG from "@/utils/emoji-svg/AwesomeSVG";
import BadSVG from "@/utils/emoji-svg/BadSVG";
import Emoji from "../shared/Emoji";
import FeedbackComment from "./FeedbackComment";
import FeedbackTags from "./FeedbackTags";
import GoodSVG from "@/utils/emoji-svg/GoodSVG";
import OkeySVG from "@/utils/emoji-svg/OkeySVG";
import TerribleSVG from "@/utils/emoji-svg/TerribleSVG";
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
          );
        })}
      </ul>

      {emojiOrder !== null && (
        <>
          <FeedbackTags storageKey="tagsOrder" emojiOrder={emojiOrder} />
          <FeedbackComment storageKey="commentOrder" emojiOrder={emojiOrder} />
        </>
      )}
    </>
  );
};

export default RatingOrder;
