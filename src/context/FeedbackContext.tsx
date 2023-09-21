"use client";

import { Feedback, FeedbackContextProps } from "../types/feedback.types";
import { createContext, useContext, useEffect, useState } from "react";

import { getFeedbackData } from "@/utils/getFeedbackData";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const FeedbackContext = createContext<FeedbackContextProps>({
  feedbacks: [],
  isLoading: false,
  selectedTip: undefined,
  setSelectedTip: function (value: number): void {
    throw new Error("Function not implemented.");
  },
  setFeedbacks: function (value: Feedback[]): void {
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
  const { getItem } = useLocalStorage();

  // Add a new effect to refetch feedbacks when storedBusiness changes
  useEffect(() => {
    const fetchFeedbacks = async () => {
      setIsLoading(true);
      try {
        const storedBusiness = await getItem("business");
        const businessData = JSON.parse(storedBusiness!);
        const feedbacksData = await getFeedbackData(businessData?.slug); // Call the hook directly

        setFeedbacks(feedbacksData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error refetching feedbacks on business change", error);
        setFeedbacks([]);
        setIsLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <FeedbackContext.Provider
      value={{
        isLoading,
        feedbacks,
        setFeedbacks,
        selectedTip,
        setSelectedTip,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
