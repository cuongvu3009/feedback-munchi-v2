"use client";

import React, { useEffect, useState } from "react";

import DashboardResponses from "@/components/dashboard/responses/DashboardResponses";
import DashboardScore from "@/components/dashboard/score/DashboardScore";
import FeedbackChart from "@/components/dashboard/chart/FeedbackChart";
import { getFeedbackData } from "@/lib/getFeedbackData";
import styles from "./dashboardInfo.module.css";
import { useBusinessContext } from "@/context/BusinessContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export const DashboardPage = ({
  params,
}: {
  params: { businessId: number };
}) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const storedBusiness = await getItem("business");
        const businessData = JSON.parse(storedBusiness!);
        const feedbacksData = await getFeedbackData(businessData?.slug);
        setFeedbacks(feedbacksData);

        setIsLoading(false);
      } catch (error) {
        console.error("There was an error fetching data", error);

        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
