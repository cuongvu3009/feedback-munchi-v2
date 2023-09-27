"use client";

import React, { useEffect, useState } from "react";

import { defaultTags } from "@/utils/defaultTags";
import { tagsQuestion } from "@/utils/tagsQuestion";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface FeedbackTagsProps {
  storageKey: "serviceTags" | "orderTags";
  emojiService?: string | null;
  emojiOrder?: string | null;
}

const FeedbackTags: React.FC<FeedbackTagsProps> = ({
  storageKey,
  emojiService,
  emojiOrder,
}) => {
  const { removeItem, setItem } = useLocalStorage();
  const [tags, setTags] = useState<string[]>([]);

  // Function to map emojiOrder to tags
  const getTagsForEmoji = () => {
    if (storageKey === "serviceTags" && emojiService) {
      return defaultTags[emojiService] || [];
    } else if (storageKey === "orderTags" && emojiOrder) {
      return defaultTags[emojiOrder] || [];
    } else {
      return [];
    }
  };

  // Function to handle tag selection
  const handleTagSelection = (tag: string) => {
    // Toggle the tag in the orderTags array
    const updatedOrderTags = tags.includes(tag)
      ? tags.filter((selectedTag) => selectedTag !== tag)
      : [...tags, tag];

    // Update the state and store it in local storage
    setTags(updatedOrderTags);
    setItem(storageKey, JSON.stringify(updatedOrderTags));
  };

  // Use useEffect to reset tags when storageKey changes
  useEffect(() => {
    setTags([]);
    removeItem(storageKey);
  }, [storageKey, emojiService, emojiOrder]);

  const mappedTags = getTagsForEmoji();

  return (
    <div className="tags">
      {tagsQuestion[emojiService as string] && (
        <div>
          <h3 className="question">
            <b>{tagsQuestion[emojiService as string]["question_1"]}</b>
          </h3>
          <p className="text">
            {tagsQuestion[emojiService as string]["question_2"]}
          </p>
        </div>
      )}

      <div className="tags-container">
        {mappedTags.map((tag, index) => (
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
              {tag}
            </label>
          </li>
        ))}
      </div>
    </div>
  );
};

export default FeedbackTags;
