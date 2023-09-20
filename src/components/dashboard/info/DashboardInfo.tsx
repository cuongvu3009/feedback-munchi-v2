import { Feedback, FeedbackContextProps } from "@/types/feedback.types";

import { BusinessProps } from "@/types/dashboard.types";
import DashboardResponses from "@/components/dashboard/responses/DashboardResponses";
import DashboardScore from "@/components/dashboard/score/DashboardScore";
import FeedbackChart from "@/components/dashboard/chart/FeedbackChart";
import React from "react";
import styles from "./dashboardInfo.module.css";

interface DashboardProps {
  feedbacks: Feedback[];
}

const DashboardInfo: React.FC<DashboardProps> = ({ feedbacks }) => {
  console.log(feedbacks);
  return (
    <div className={`${styles["dashboard-info"]}`}>
      <div className={`${styles["dashboard-content"]}`}>
        <DashboardScore type="order" data={feedbacks} />
        <DashboardScore type="service" data={feedbacks} />
        <DashboardResponses />
      </div>
      <div className={`${styles["dashboard-chart"]}`}>
        <div className={`${styles["chart"]}`}>
          <h4>Service feedback</h4>
          <FeedbackChart data={feedbacks} type="service" />
        </div>
        <h4>Order feedback</h4>
        <div className={`${styles["chart"]}`}>
          <FeedbackChart data={feedbacks} type="order" />
        </div>
      </div>
    </div>
  );
};

export default DashboardInfo;
