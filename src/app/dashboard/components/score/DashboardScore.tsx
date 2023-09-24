import { Feedback } from "@/types/feedback.types";
import React from "react";
import styles from "./dashboardScore.module.css";

interface DashboardScoreProps {
  data: Feedback[];
}

const mapEmojiToScore = (emoji: string): number => {
  switch (emoji) {
    case "terrible":
      return 1;
    case "bad":
      return 2;
    case "okey":
      return 3;
    case "good":
      return 4;
    case "awesome":
      return 5;
    default:
      return 0; // Handle unknown values as needed
  }
};

const calculateAverageScore = (data: Feedback[]) => {
  let totalScore = 0;
  let totalCount = 0;

  if (data && data.length > 0) {
    // Check if data is defined and not empty
    data.forEach((entry) => {
      const emoji = entry.emoji;
      const score = mapEmojiToScore(emoji); // Implement your mapping function

      totalScore += score;
      totalCount++;
    });
  }

  if (totalCount === 0) {
    return 0; // Avoid division by zero
  }

  return (totalScore / totalCount).toFixed(1); // Calculate and round to one decimal place
};

const calculateResponseCounts = (data: Feedback[]) => {
  const responseCounts: { [response: string]: number } = {};

  if (data && data.length > 0) {
    // Check if data is defined and not empty
    data.forEach((entry) => {
      const emoji = entry.emoji;
      if (emoji in responseCounts) {
        responseCounts[emoji]++;
      } else {
        responseCounts[emoji] = 1;
      }
    });
  }

  return responseCounts;
};

const getTotalResponses = (responseCounts: { [response: string]: number }) => {
  return Object.values(responseCounts).reduce(
    (total, count) => total + count,
    0
  );
};

const getEmojiLabel = (emoji: string) => {
  switch (emoji) {
    case "terrible":
      return "Terrible 😠";
    case "bad":
      return "Bad 🙁";
    case "okey":
      return "Okey 🙂";
    case "good":
      return "Good 😄";
    case "awesome":
      return "Awesome 😍";
    default:
      return emoji;
  }
};

const DashboardScore: React.FC<DashboardScoreProps> = ({ data }) => {
  const responseCounts = calculateResponseCounts(data);
  const averageScore = calculateAverageScore(data);

  return (
    <div className={`${styles["dashboard-card"]}`}>
      <h3>Average score Service</h3>
      <div className={`${styles["dashboard-score"]}`}>
        <span className={styles.score}>{averageScore}</span>
      </div>

      <div className={`${styles["dashboard-answers"]}`}>
        {Object.entries(responseCounts).map(([response, count]) => (
          <div className={`${styles["flex-between"]}`} key={response}>
            <p>Answered &quot;{getEmojiLabel(response)}&quot;</p>
            <p>{count}</p>
          </div>
        ))}

        <div className={`${styles["flex-between"]}`}>
          <p>
            <b>Total response</b>
          </p>
          <p>{getTotalResponses(responseCounts)}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardScore;