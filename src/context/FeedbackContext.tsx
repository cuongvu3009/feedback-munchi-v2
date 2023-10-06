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
  const [rating, setRating] = useState<RatingItem[]>([]);
  const [selectedTip, setSelectedTip] = useState<number | undefined>(undefined);
  const [isTip, setIsTip] = useState(false);

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
        updatedRating[existingIndex] = newRatingItem;
        return updatedRating;
      } else {
        // If it doesn't exist, add the newRatingItem to the array
        return [...prevRating, newRatingItem];
      }
    });
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
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
