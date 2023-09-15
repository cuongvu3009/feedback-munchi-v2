import React, { useState } from "react";

import { defaultTags } from "../../utils/defaultTags";
import { tagsQuestion } from "../../utils/tagsQuestion";

interface TagsServiceProps {
  emojiService: string | null; // Define the emojiService prop
}

const TagsService: React.FC<TagsServiceProps> = ({ emojiService }) => {
  const [serviceTags, setServiceTags] = useState<string[]>(
    JSON.parse(localStorage.getItem("serviceTags") || "[]")
  );

  // Function to map emojiService to tags
  const getTagsForEmojiService = (emojiService: string | null) => {
    if (!emojiService) return []; // Handle the case where emojiService is not set

    // Map the emojiService value to the corresponding tags
    return defaultTags[emojiService] || [];
  };

  // Function to handle tag selection
  const handleTagSelection = (tag: string) => {
    // Toggle the tag in the serviceTags array
    const updatedServiceTags = serviceTags.includes(tag)
      ? serviceTags.filter((selectedTag) => selectedTag !== tag)
      : [...serviceTags, tag];

    // Update the state and store it in local storage
    setServiceTags(updatedServiceTags);
    localStorage.setItem("serviceTags", JSON.stringify(updatedServiceTags));
  };

  const tags = getTagsForEmojiService(emojiService);

  return (
    <div className="tags">
      {emojiService && emojiService in tagsQuestion && (
        <div>
          <h4>{tagsQuestion[emojiService]["question_1"]}</h4>
          <p>{tagsQuestion[emojiService]["question_2"]}</p>
        </div>
      )}

      <div className="tags-container">
        {tags?.map((tag, index) => {
          return (
            <li key={index}>
              <label
                className={
                  serviceTags.includes(tag)
                    ? "selected-button"
                    : "unselected-button"
                }
              >
                <input
                  type="checkbox"
                  checked={serviceTags.includes(tag)}
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

export default TagsService;
