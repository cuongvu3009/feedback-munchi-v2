import React, { useState } from "react";

import { defaultTags } from "@/utils/defaultTags";
import { tagsQuestion } from "@/utils/tagsQuestion";

interface TagsProps {
  emoji?: string | null;
}

const Tags: React.FC<TagsProps> = ({ emoji }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>(
    JSON.parse(localStorage.getItem("tags") || "[]")
  );

  // Function to map emoji to tags
  const getTagsForEmoji = (emoji: string | null) => {
    if (!emoji) return []; // Handle the case where emoji is not set

    // Map the emojiService value to the corresponding tags
    return defaultTags[emoji] || [];
  };

  // Function to handle tag selection
  const handleTagSelection = (tag: string) => {
    // Toggle the tag in the serviceTags array
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((selectedTag) => selectedTag !== tag)
      : [...selectedTags, tag];

    // Update the state and store it in local storage
    setSelectedTags(updatedTags);
    localStorage.setItem("tags", JSON.stringify(updatedTags));
  };

  const tags = getTagsForEmoji(emoji as string);

  return (
    <div className="tags">
      {emoji && emoji in tagsQuestion && (
        <div>
          <h4>{tagsQuestion[emoji]["question_1"]}</h4>
          <p>{tagsQuestion[emoji]["question_2"]}</p>
        </div>
      )}

      <div className="tags-container">
        {tags?.map((tag, index) => {
          return (
            <li key={index}>
              <label
                className={
                  selectedTags.includes(tag)
                    ? "selected-button"
                    : "unselected-tags"
                }
              >
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => handleTagSelection(tag)}
                />
                {tag}
              </label>
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default Tags;
