import "./feedback.css";

import React, { useEffect, useState } from "react";

import { defaultTags } from "../../utils/defaultTags";
import { tagsQuestion } from "../../utils/tagsQuestion";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface FeedbackTagsProps {
  storageKey: "tagsService" | "tagsOrder";
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
    if (storageKey === "tagsService" && emojiService) {
      return defaultTags[emojiService] || [];
    } else if (storageKey === "tagsOrder" && emojiOrder) {
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
      {tagsQuestion[storageKey] && (
        <div>
          <h4>{tagsQuestion[storageKey]["question_1"]}</h4>
          <p>{tagsQuestion[storageKey]["question_2"]}</p>
        </div>
      )}
      <div className="tags-container">
        {mappedTags.map((tag, index) => (
          <li key={index}>
            <label
              className={
                tags.includes(tag) ? "selected-button" : "unselected-button"
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
