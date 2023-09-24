import React, { useState } from "react";

import AwesomeSVG from "@/utils/emoji-svg/AwesomeSVG";
import BadSVG from "@/utils/emoji-svg/BadSVG";
import Comment from "@/app/feedback/components/Comment";
import GoodSVG from "@/utils/emoji-svg/GoodSVG";
import OkeySVG from "@/utils/emoji-svg/OkeySVG";
import Tags from "./Tags";
import TerribleSVG from "@/utils/emoji-svg/TerribleSVG";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { ratingOptions } from "@/utils/ratingOptions";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const RatingService: React.FC = () => {
  const { setItem } = useLocalStorage();

  const [emojiService, setEmojiService] = useState<string | null>(null);

  const handleEmojiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmoji = e.target.value;
    setEmojiService(newEmoji);
    setItem("emoji", newEmoji);
    setItem("type", "SERVICE");
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
                  checked={emojiService === option.value}
                  disabled={emojiService === option.value}
                />
                <label
                  htmlFor={option.value}
                  className={
                    emojiService === option.value
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

      {emojiService !== null && (
        <>
          {/* <FeedbackTags storageKey="serviceTags" emojiService={emojiService} /> */}
          <Tags emoji={emojiService} />
          <Comment emoji={emojiService} />
        </>
      )}
    </>
  );
};

export default RatingService;
