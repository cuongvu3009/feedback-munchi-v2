import React from "react";
import Spinner from "@/components/shared/Spinner";
import { getFetcher } from "@/utils/fetcher";
import styles from "./dashboardScore.module.css";
import useSWR from "swr";

interface DashboardScoreProps {
  type: string;
  businessSlug: string;
}

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

const DashboardScore: React.FC<DashboardScoreProps> = ({
  type,
  businessSlug,
}) => {
  const { data, error, isValidating } = useSWR(
    `/api/feedback/${businessSlug}/${type}/count`,
    getFetcher
  );

  if (error) {
    console.log(error);
    return <div>Error loading score data!</div>;
  }

  if (isValidating || !data) {
    return <Spinner />;
  }

  const { emojiCounts, averageScore, totalFeedback } = data;

  return (
    <div className={`${styles["dashboard-card"]}`}>
      <h3>Average score {type}</h3>
      <div className={`${styles["dashboard-score"]}`}>
        <span className={styles.score}>{averageScore}</span>
      </div>

      <div className={`${styles["dashboard-answers"]}`}>
        {["awesome", "good", "okey", "bad", "terrible"].map((emoji) => (
          <div key={emoji} className={`${styles["flex-between"]}`}>
            <p>Answered &quot;{getEmojiLabel(emoji)}&quot;</p>
            <p>{emojiCounts[emoji] || 0}</p>
          </div>
        ))}

        <div className={`${styles["flex-between"]}`}>
          <p>
            <b>Total response</b>
          </p>
          <p>{totalFeedback}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardScore;
