"use client";

import React from "react";
import moment from "moment";
import styles from "./responses.module.css";
import { useDashboardFeedbackContext } from "@/context/DashboardFeedbackContext";

const DashboardResponses = () => {
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

  const getEmojiLabel = (emoji: string) => {
    switch (emoji) {
      case "terrible":
        return "😠 Terrible";
      case "bad":
        return "🙁 Bad";
      case "okey":
        return "🙂Okey";
      case "good":
        return "😄 Good";
      case "awesome":
        return "😍 Awesome";
      default:
        return emoji;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.title}>Responses</h1>
      {/* Render combined feedbacks in a table */}
      <table className={styles.feedbackTable}>
        <thead>
          <tr>
            <th>Emoji</th>
            <th>Type</th>
            <th>Tags</th>
            <th>Comment</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {combinedFeedbacks.map((feedback) => {
            let feedbackTags = JSON.parse(feedback.tags);
            return (
              <tr key={feedback.id}>
                <td>{getEmojiLabel(feedback.emoji)}</td>
                <td>{feedback.type}</td>
                <td>
                  {feedbackTags.map((item: string) => (
                    <p key={feedback.id + item}>{item}</p>
                  )) || "No tags"}
                </td>
                <td>{feedback.comment || "No comment"}</td>
                <td>{moment(feedback.createdAt).fromNow()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardResponses;
