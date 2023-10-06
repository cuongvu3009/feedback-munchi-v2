"use client";

import DashboardResponses from "@/app/dashboard/components/responses/DashboardResponses";
import DashboardScore from "@/app/dashboard/components/score/DashboardScore";
import FeedbackChart from "@/app/dashboard/components/chart/FeedbackChart";
import { NextPage } from "next";
import React from "react";
import Spinner from "@/components/shared/Spinner";
import { getFetcher } from "@/utils/fetcher";
import styles from "./dashboardInfo.module.css";
import { useBusinessContext } from "@/context/BusinessContext";
import { useDashboardFeedbackContext } from "@/context/DashboardFeedbackContext";
import useSWR from "swr";

const DashboardInfo: NextPage = () => {
  const { business, businessId } = useBusinessContext();
  const { setOrderFeedbacks, setServiceFeedbacks } =
    useDashboardFeedbackContext();

  const {
    data: serviceFeedbacks,
    error: serviceFeedbackErr,
    isLoading: serviceFeedbackLoading,
  } = useSWR(`/api/feedback/${business?.slug}/service`, getFetcher);
  const {
    data: orderFeedbacks,
    error: orderFeedbacksErr,
    isLoading: orderFeedbacksLoading,
  } = useSWR(`/api/feedback/${business?.slug}/order`, getFetcher);

  let serviceFeedbacksData = serviceFeedbacks?.feedbacks;
  let orderFeedbacksData = orderFeedbacks?.feedbacks;

  if (serviceFeedbacksData) {
    setServiceFeedbacks(serviceFeedbacksData);
  }

  if (orderFeedbacksData) {
    setOrderFeedbacks(orderFeedbacksData);
  }

  if (serviceFeedbackLoading || orderFeedbacksLoading) {
    return <Spinner />;
  }

  return (
    <div className={`${styles["dashboard-info"]}`}>
      {serviceFeedbackErr && (
        <div className={styles.error}>
          <p>Error loading data: {serviceFeedbackErr.message}</p>
        </div>
      )}

      {orderFeedbacksErr && (
        <div className={styles.error}>
          <p>Error loading data: {orderFeedbacksErr.message}</p>
        </div>
      )}

      {serviceFeedbacksData && orderFeedbacksData && (
        <div className={`${styles["dashboard-content"]}`}>
          <DashboardScore data={serviceFeedbacksData} />
          <DashboardScore data={orderFeedbacksData} />
          <DashboardResponses
            data={serviceFeedbacksData.concat(orderFeedbacksData)}
            businessId={businessId as number}
          />
        </div>
      )}

      {serviceFeedbacksData && orderFeedbacksData && (
        <div className={`${styles["dashboard-chart"]}`}>
          <div className={`${styles["chart"]}`}>
            <h4>Service feedback</h4>
            <FeedbackChart data={serviceFeedbacksData} type="service" />
          </div>
          <h4>Order feedback</h4>
          <div className={`${styles["chart"]}`}>
            <FeedbackChart data={orderFeedbacksData} type="order" />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardInfo;
