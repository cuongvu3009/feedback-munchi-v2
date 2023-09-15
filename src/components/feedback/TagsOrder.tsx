import React, { useState } from "react";

import { defaultTags } from "../../utils/defaultTags";
import { tagsQuestion } from "../../utils/tagsQuestion";

interface TagsOrderProps {
  emojiOrder: string | null; // Define the emojiService prop
}

const TagsOrder: React.FC<TagsOrderProps> = ({ emojiOrder }) => {
  const [orderTags, setOrderTags] = useState<string[]>(
    JSON.parse(localStorage.getItem("orderTags") || "[]")
  );

  // Function to map emojiOrder to tags
  const getTagsForEmojiService = (emojiOrder: string | null) => {
    if (!emojiOrder) return []; // Handle the case where emojiOrder is not set

    // Map the emojiOrder value to the corresponding tags
    return defaultTags[emojiOrder] || [];
  };

  // Function to handle tag selection
  const handleTagSelection = (tag: string) => {
    // Toggle the tag in the serviceTags array
    const updatedOrderTags = orderTags.includes(tag)
      ? orderTags.filter((selectedTag) => selectedTag !== tag)
      : [...orderTags, tag];

    // Update the state and store it in local storage
    setOrderTags(updatedOrderTags);
    localStorage.setItem("orderTags", JSON.stringify(updatedOrderTags));
  };

  const tags = getTagsForEmojiService(emojiOrder);

  return (
    <div className="tags">
      {emojiOrder && emojiOrder in tagsQuestion && (
        <div>
          <h4>{tagsQuestion[emojiOrder]["question_1"]}</h4>
          <p>{tagsQuestion[emojiOrder]["question_2"]}</p>
        </div>
      )}
      <div className="tags-container">
        {tags?.map((tag, index) => {
          return (
            <li key={index}>
              <label
                className={
                  orderTags.includes(tag)
                    ? "selected-button"
                    : "unselected-button"
                }
              >
                <input
                  type="checkbox"
                  checked={orderTags.includes(tag)}
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

export default TagsOrder;
