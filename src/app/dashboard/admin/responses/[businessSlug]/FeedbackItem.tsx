"use client";

import { Feedback } from "@/types/feedback.types";
import React from "react";
import moment from "moment";
import styles from "./feedbackItem.module.css";

const FeedbackItem = ({ feedback }: { feedback: Feedback }) => {
  const { emoji, createdAt, tags, comment, type } = feedback;
  const formattedDate = moment(createdAt).format("MMMM D, YYYY, HH:mm:ss");

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
    <div className={styles.wrapper}>
      <div className={styles.feedbackItem}>
        <div className={styles.emoji}>{getEmojiLabel(emoji)}</div>
        <div className={styles.content}>
          <h4>{type}</h4>
          <p>{formattedDate}</p>
          {tags ? <p>{tags}</p> : <p>No tags</p>}
          {comment ? <p>{comment}</p> : <p>No comment</p>}
        </div>
      </div>
    </div>
  );
};

export default FeedbackItem;
