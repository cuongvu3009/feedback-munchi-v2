"use client";

import React, { useEffect, useState } from "react";

import DashboardResponses from "@/app/dashboard/components/responses/DashboardResponses";
import DashboardScore from "../../../components/score/DashboardScore";
import { Feedback } from "@/types/feedback.types";
import FeedbackChart from "@/app/dashboard/components/chart/FeedbackChart";
import { NextPage } from "next";
import Spinner from "@/components/shared/Spinner";
import { getFeedbackData } from "@/lib/getFeedbackData";
import styles from "./dashboardInfo.module.css";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface FeedbackReturn {
  serviceFeedback: Feedback[];
  orderFeedback: Feedback[];
}
export const DashboardPage: NextPage<{ params: { businessId: number } }> = ({
  params,
}) => {
  const [feedbacks, setFeedbacks] = useState<FeedbackReturn | undefined>(
    undefined
  );
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
            <DashboardScore data={feedbacks?.serviceFeedback!} />
            <DashboardScore data={feedbacks?.orderFeedback!} />
            <DashboardResponses
              data={feedbacks?.serviceFeedback!.concat(
                feedbacks?.orderFeedback!
              )}
              businessId={params.businessId}
            />
          </div>
          <div className={`${styles["dashboard-chart"]}`}>
            <div className={`${styles["chart"]}`}>
              <h4>Service feedback</h4>
              <FeedbackChart
                data={feedbacks?.serviceFeedback!}
                type="service"
              />
            </div>
            <h4>Order feedback</h4>
            <div className={`${styles["chart"]}`}>
              <FeedbackChart data={feedbacks?.orderFeedback!} type="order" />
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default DashboardPage;
