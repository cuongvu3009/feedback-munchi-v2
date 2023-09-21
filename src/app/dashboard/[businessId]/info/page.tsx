"use client";

import DashboardResponses from "@/components/dashboard/responses/DashboardResponses";
import DashboardScore from "@/components/dashboard/score/DashboardScore";
import FeedbackChart from "@/components/dashboard/chart/FeedbackChart";
import React from "react";
import styles from "./dashboardInfo.module.css";
import { useFeedbackContext } from "@/context/FeedbackContext";
import useProtectedPage from "@/hooks/useProtectedPage";

export const DashboardPage = ({
  params,
}: {
  params: { businessId: number };
}) => {
  useProtectedPage();

  const { isLoading, feedbacks } = useFeedbackContext();

  return (
    <>
      {!isLoading ? (
        <div className={`${styles["dashboard-info"]}`}>
          <div className={`${styles["dashboard-content"]}`}>
            <DashboardScore type="order" data={feedbacks} />
            <DashboardScore type="service" data={feedbacks} />
            <DashboardResponses
              data={feedbacks}
              businessId={params.businessId}
            />
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
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default DashboardPage;
