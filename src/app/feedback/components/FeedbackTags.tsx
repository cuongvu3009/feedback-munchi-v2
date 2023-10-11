"use client";

import React, { useState } from "react";

import { FeedbackTagsProps } from "@/types/feedback.types";
import { defaultTags } from "@/utils/defaultTags";
import { tagsQuestion } from "@/utils/tagsQuestion";
import { useFeedbackContext } from "@/context/FeedbackContext";
import { useTranslations } from "next-intl";

const FeedbackTags: React.FC<FeedbackTagsProps> = ({ type, emoji }) => {
  const { addOrUpdateRatingItem } = useFeedbackContext();
  const [tags, setTags] = useState<string[]>([]);
  const t = useTranslations("Tags");

  // Function to map emojiOrder to tags
  const getTagsForEmoji = () => {
    if (type && emoji) {
      return defaultTags[emoji] || [];
    }
  };

  // Function to handle tag selection
  const handleTagSelection = (tag: string) => {
    // Toggle the tag in the orderTags array
    const updatedTags = tags.includes(tag)
      ? tags.filter((selectedTag) => selectedTag !== tag)
      : [...tags, tag];

    // Update the state and store it in local storage
    setTags(updatedTags);
    const newRatingItem = {
      type,
      emoji,
      tags: updatedTags,
    };
    addOrUpdateRatingItem(newRatingItem);
  };

  const mappedTags = getTagsForEmoji();

  return (
    <div className="tags">
      {tagsQuestion[emoji as string] && (
        <div>
          <h3 className="question">
            {/* <b>{tagsQuestion[emoji as string]["question_1"]}</b> */}
            <b>{t(tagsQuestion[emoji as string]["question_1"])}</b>
          </h3>
          <p className="text">
            {t(tagsQuestion[emoji as string]["question_2"])}
          </p>
        </div>
      )}

      <div className="tags-container">
        {mappedTags?.map((tag, index) => (
          <li key={index}>
            <label
              className={
                tags.includes(tag) ? "selected-button" : "unselected-tags"
              }
            >
              <input
                type="checkbox"
                checked={tags.includes(tag)}
                onChange={() => handleTagSelection(tag)}
              />
              {t(tag)}
            </label>
          </li>
        ))}
      </div>
    </div>
  );
};

export default FeedbackTags;
