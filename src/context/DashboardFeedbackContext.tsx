"use client";

import { createContext, useContext, useState } from "react";

import { Feedback } from "../types/feedback.types";

export interface DashboardFeedbackContextProps {
  serviceFeedbacks: Feedback[] | [];
  setServiceFeedbacks: (value: Feedback[] | []) => void;
  orderFeedbacks: Feedback[] | [];
  setOrderFeedbacks: (value: Feedback[] | []) => void;
}

const DashboardFeedbackContext = createContext<DashboardFeedbackContextProps>({
  serviceFeedbacks: [],
  setServiceFeedbacks: function (value: Feedback[] | []): void {
    throw new Error("Function not implemented.");
  },
  orderFeedbacks: [],
  setOrderFeedbacks: function (value: Feedback[] | []): void {
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
  const [serviceFeedbacks, setServiceFeedbacks] = useState<Feedback[] | []>([]);
  const [orderFeedbacks, setOrderFeedbacks] = useState<Feedback[] | []>([]);

  return (
    <DashboardFeedbackContext.Provider
      value={{
        serviceFeedbacks,
        setServiceFeedbacks,
        orderFeedbacks,
        setOrderFeedbacks,
      }}
    >
      {children}
    </DashboardFeedbackContext.Provider>
  );
};
export default DashboardFeedbackContext;
