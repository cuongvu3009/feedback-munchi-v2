"use client";

import { Feedback, FeedbackContextProps } from "../types/feedback.types";
import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";
import { constantAPI } from "../utils/constantAPI";

const FeedbackContext = createContext<FeedbackContextProps>({
  feedback: [],
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
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [selectedTip, setSelectedTip] = useState<number | undefined>(undefined);

  useEffect(() => {
    fetchFeedback();
  }, []);

  // Fetch feedback
  const fetchFeedback = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${constantAPI}/feedback`);
      setFeedback(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("There was an error fetching data", error);
      setIsLoading(false);
    }
  };

  return (
    <FeedbackContext.Provider
      value={{
        isLoading,
        feedback,
        selectedTip,
        setSelectedTip,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
