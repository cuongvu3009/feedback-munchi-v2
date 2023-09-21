"use client";

import { createContext, useContext, useState } from "react";

import { Feedback } from "../types/feedback.types";

export interface FeedbackContextProps {
  feedbacks: Feedback[];
  isLoading: boolean;
  selectedTip: number | undefined;
  setSelectedTip: (value: number) => void;
}

const FeedbackContext = createContext<FeedbackContextProps>({
  feedbacks: [],
  isLoading: false,
  selectedTip: undefined,
  setSelectedTip: function (value: number): void {
    throw new Error("Function not implemented.");
  },
});
export const useFeedbackContext = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error("useAuth must be used within an FeedbackProvider");
  }
  return context;
};
export const FeedbackProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [selectedTip, setSelectedTip] = useState<number | undefined>(undefined);

  return (
    <FeedbackContext.Provider
      value={{
        isLoading,
        feedbacks,
        selectedTip,
        setSelectedTip,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
export default FeedbackContext;
