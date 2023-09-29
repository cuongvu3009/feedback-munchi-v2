"use client";

import FeedbackItem from "./FeedbackItem"; // Import the FeedbackItem component
import { NextPage } from "next";
// Responses.js
import React from "react";
import styles from "./responses.module.css";
import { useDashboardFeedbackContext } from "@/context/DashboardFeedbackContext";

const Responses: NextPage<{ params: { businessId: number } }> = ({
  params,
}) => {
  // Assuming you have serviceFeedbacks and orderFeedbacks as arrays of feedback objects
  const { serviceFeedbacks, orderFeedbacks } = useDashboardFeedbackContext();

  // Combine the service and order feedbacks into a single array
  const combinedFeedbacks = [];

  // Interleave the service and order feedbacks
  if (serviceFeedbacks && orderFeedbacks) {
    for (
      let i = 0;
      i < Math.max(serviceFeedbacks.length, orderFeedbacks.length);
      i++
    ) {
      if (i < serviceFeedbacks.length) {
        combinedFeedbacks.push(serviceFeedbacks[i]);
      }
      if (i < orderFeedbacks.length) {
        combinedFeedbacks.push(orderFeedbacks[i]);
      }
    }
  }

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.title}>Responses</h1>
      {/* Render combined feedbacks */}
      <div className={styles.feedbackSection}>
        {combinedFeedbacks.map((feedback) => (
          <FeedbackItem key={feedback.id} feedback={feedback} />
        ))}
      </div>
    </div>
  );
};

export default Responses;
