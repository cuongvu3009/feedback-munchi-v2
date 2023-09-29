"use client";

import { Feedback } from "@/types/feedback.types";
import FeedbackItem from "./FeedbackItem"; // Import the FeedbackItem component
import { MdConstruction } from "react-icons/md";
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

  return (
    <div className={styles.dashboardContainer}>
      {/* Render serviceFeedbacks */}
      <div className={styles.feedbackSection}>
        {serviceFeedbacks.map((feedback: Feedback) => (
          <FeedbackItem key={feedback.id} feedback={feedback} />
        ))}
      </div>

      {/* Render orderFeedbacks */}
      <div className={styles.feedbackSection}>
        {orderFeedbacks.map((feedback: Feedback) => (
          <FeedbackItem key={feedback.id} feedback={feedback} />
        ))}
      </div>
    </div>
  );
};

export default Responses;
