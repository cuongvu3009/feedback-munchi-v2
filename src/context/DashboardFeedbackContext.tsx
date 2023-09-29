"use client";

import { createContext, useContext, useState } from "react";

import { Feedback } from "../types/feedback.types";

export interface DashboardFeedbackContextProps {
  feedbacks: Feedback[] | [];
  setFeedbacks: (value: Feedback[] | []) => void;
}

const DashboardFeedbackContext = createContext<DashboardFeedbackContextProps>({
  feedbacks: [],
  setFeedbacks: function (value: Feedback[] | []): void {
    throw new Error("Function not implemented.");
  },
});
export const useDashboardFeedbackContext = () => {
  const context = useContext(DashboardFeedbackContext);
  if (!context) {
    throw new Error(
      "useDashboardFeedbackContext must be used within an DashboardFeedbackProvider"
    );
  }
  return context;
};
export const DashboardFeedbackProvider = ({ children }: any) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[] | []>([]);

  return (
    <DashboardFeedbackContext.Provider
      value={{
        feedbacks,
        setFeedbacks,
      }}
    >
      {children}
    </DashboardFeedbackContext.Provider>
  );
};
export default DashboardFeedbackContext;
