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
  setRating: React.Dispatch<React.SetStateAction<RatingItem[]>>;
  selectedTip: number | undefined;
  setSelectedTip: (value: number) => void;
  isTip: boolean;
}

const FeedbackContext = createContext<FeedbackContextProps>({
  rating: [],
  setRating: (value) => [], // Initialize with an empty array
  selectedTip: undefined,
  setSelectedTip: function (value: number): void {
    throw new Error("Function not implemented.");
  },
  isTip: false,
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

  // Check if all elements in the rating array are "bad", "terrible"
  useEffect(() => {
    const allRatingsAreTip = rating.some(
      (item) => item.emoji === "bad" || item.emoji === "terrible"
    );
    setIsTip(!allRatingsAreTip);
  }, [rating]);

  return (
    <FeedbackContext.Provider
      value={{
        rating,
        setRating,
        selectedTip,
        setSelectedTip,
        isTip,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
