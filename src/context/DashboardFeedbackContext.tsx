"use client";

import { createContext, useContext, useState } from "react";

import { Feedback } from "../types/feedback.types";
import { usePersistState } from "@/hooks/usePersistState";

export interface DashboardFeedbackContextProps {
  serviceFeedbacks: Feedback[] | undefined;
  setServiceFeedbacks: (value: Feedback[] | undefined) => void;
  orderFeedbacks: Feedback[] | undefined;
  setOrderFeedbacks: (value: Feedback[] | undefined) => void;
}

const DashboardFeedbackContext = createContext<DashboardFeedbackContextProps>({
  serviceFeedbacks: undefined,
  setServiceFeedbacks: () => {}, // Implement this function as needed
  orderFeedbacks: undefined,
  setOrderFeedbacks: () => {}, // Implement this function as needed
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
  const [serviceFeedbacks, setServiceFeedbacks] = usePersistState(
    "serviceFeedbacks",
    undefined
  );
  const [orderFeedbacks, setOrderFeedbacks] = usePersistState(
    "orderFeedbacks",
    undefined
  );

  const removePersistedData = () => {
    setServiceFeedbacks([]);
    setOrderFeedbacks([]);
  };

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
