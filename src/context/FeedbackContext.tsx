"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface RatingItem {
  type: string;
  emoji: string;
  comment?: string;
  tags?: string[];
}

export interface FeedbackContextProps {
  rating: RatingItem[];
  selectedTip: number | undefined;
  setSelectedTip: (value: number) => void;
  isTip: boolean;
  addOrUpdateRatingItem: (value: RatingItem) => void;
  resetContextState: () => void;
}

const FeedbackContext = createContext<FeedbackContextProps>({
  rating: [],

  selectedTip: undefined,
  setSelectedTip: function (value: number): void {
    throw new Error("Function not implemented.");
  },
  isTip: false,
  addOrUpdateRatingItem: function (value: RatingItem): void {
    throw new Error("Function not implemented.");
  },
  resetContextState: function (): void {
    throw new Error("Function not implemented.");
  },
});

export const useFeedbackContext = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error(
      "useFeedbackContext must be used within a FeedbackProvider"
    );
  }
  return context;
};

export const FeedbackProvider = ({ children }: any) => {
  const initialRating: RatingItem[] = [];
  const initialSelectedTip: number | undefined = undefined;
  const initialIsTip: boolean = false;

  const [rating, setRating] = useState<RatingItem[]>(initialRating);
  const [selectedTip, setSelectedTip] = useState<number | undefined>(
    initialSelectedTip
  );
  const [isTip, setIsTip] = useState(initialIsTip);

  // Load the rating data from localStorage when the component mounts
  useEffect(() => {
    const storedRating = localStorage.getItem("rating");
    if (storedRating) {
      setRating(JSON.parse(storedRating));
    }
  }, []);

  // Save the rating data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("rating", JSON.stringify(rating));
  }, [rating]);

  // Example usage of addOrUpdateRatingItem:
  // const newRatingItem = {
  //   type: "example",
  //   emoji: "good",
  //   // other properties...
  // };
  // To add comment for example, addOrUpdateRatingItem(newRatingItem, comment);
  const addOrUpdateRatingItem = (newRatingItem: RatingItem) => {
    setRating((prevRating) => {
      // Check if a RatingItem with the same type already exists
      const existingIndex = prevRating.findIndex(
        (item) => item.type === newRatingItem.type
      );

      if (existingIndex !== -1) {
        // If it exists, update the existing item or remove it based on your logic
        // For example, here we are replacing the existing item with the new one
        const updatedRating = [...prevRating];
        updatedRating[existingIndex] = {
          ...newRatingItem,
          tags: newRatingItem.tags,
        }; // Add or update tags
        return updatedRating;
      } else {
        // If it doesn't exist, add the newRatingItem to the array
        return [...prevRating, { ...newRatingItem, tags: newRatingItem.tags }]; // Add tags
      }
    });
  };

  // Reset the context state to its initial values
  const resetContextState = () => {
    setRating(initialRating);
    setSelectedTip(initialSelectedTip);
    setIsTip(initialIsTip);
  };

  // Check if all elements in the rating array are "okey", "good", or "awesome"
  useEffect(() => {
    const allRatingsAreTip = rating.some(
      (item) => item.emoji === "bad" || item.emoji === "terrible"
    );
    setIsTip(allRatingsAreTip);
  }, [rating]);

  return (
    <FeedbackContext.Provider
      value={{
        rating,
        selectedTip,
        setSelectedTip,
        isTip,
        addOrUpdateRatingItem,
        resetContextState,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
