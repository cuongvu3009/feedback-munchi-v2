"use client";

import Button from "@/components/shared/Button";
import { Feedback } from "@/types/feedback.types";
import React from "react";
import moment from "moment";
import styles from "./dashboardResponses.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DashboardResponseProps {
  data: Feedback[] | undefined;
  businessId: number;
}
const DashboardResponses: React.FC<DashboardResponseProps> = ({
  data,
  businessId,
}) => {
  const [feedbackLimit, setFeedbackLimit] = useState<number>(7);
  const router = useRouter();

  const handleBtnClick = () => {
    router.push(`/dashboard/${businessId}/responses`);
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

  // Check if data is defined and an array before using slice
  const slicedData = data ? data.slice(0, feedbackLimit) : [];

  return (
    <div className={`${styles["dashboard-card"]}`}>
      <h3>Responses</h3>

      {slicedData.slice(0, feedbackLimit).map((item) => {
        return (
          <div
            className={`${styles["flex-between"]}`}
            key={item.id + item.businessSlug + item.createdAt}
          >
            <p>{getEmojiLabel(item.emoji)}</p>
            <p>{moment(item.createdAt).fromNow()}</p>
          </div>
        );
      })}

      {feedbackLimit >= 7 && (
        <Button
          btnText="See All"
          version="secondary"
          onClick={handleBtnClick}
        />
      )}
    </div>
  );
};

export default DashboardResponses;
