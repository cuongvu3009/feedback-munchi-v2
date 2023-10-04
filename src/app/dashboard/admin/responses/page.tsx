"use client";

import AwesomeSVG from "@/utils/emoji-svg/AwesomeSVG";
import BadSVG from "@/utils/emoji-svg/BadSVG";
import GoodSVG from "@/utils/emoji-svg/GoodSVG";
import OkeySVG from "@/utils/emoji-svg/OkeySVG";
import React from "react";
import TerribleSVG from "@/utils/emoji-svg/TerribleSVG";
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
        return (
          <span className={styles.emojiContainer}>
            <div className={styles.emoji}>
              <TerribleSVG size={30} />
            </div>
            <p>Terrible</p>
          </span>
        );
      case "bad":
        return (
          <span className={styles.emojiContainer}>
            <div className={styles.emoji}>
              <BadSVG size={30} />
            </div>
            <p>Bad</p>
          </span>
        );
      case "okey":
        return (
          <span className={styles.emojiContainer}>
            <div className={styles.emoji}>
              <OkeySVG size={30} />
            </div>
            <p>Okey</p>
          </span>
        );
      case "good":
        return (
          <span className={styles.emojiContainer}>
            <div className={styles.emoji}>
              <GoodSVG size={30} />
            </div>
            <p>Good</p>
          </span>
        );
      case "awesome":
        return (
          <span className={styles.emojiContainer}>
            <div className={styles.emoji}>
              <AwesomeSVG size={30} />
            </div>
            <p>Awesome</p>
          </span>
        );
      default:
        return emoji;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Render combined feedbacks in a table */}
      <table className={styles.feedbackTable}>
        <thead>
          <tr>
            <th>Rating</th>
            <th>Type</th>
            <th>Additional comments</th>
            {/* <th>Comment</th> */}
            <th>Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {combinedFeedbacks.map((feedback) => {
            let feedbackTags = JSON.parse(feedback.tags);
            return (
              <tr key={feedback.id}>
                <td>
                  <b>{getEmojiLabel(feedback.emoji)}</b>
                </td>
                <td>{feedback.type}</td>
                <td className={styles.tagsContainer}>
                  {feedbackTags?.map((item: string) => (
                    <p key={feedback.id + item} className={styles.tags}>
                      {item}
                    </p>
                  )) || "No tags"}
                </td>
                {/* <td>{feedback.comment || "No comment"}</td> */}
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
