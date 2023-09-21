"use client";

import React, { useEffect, useState } from "react";

import DashboardInfo from "@/components/dashboard/info/DashboardInfo";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import { getBusiness } from "@/lib/getBusiness";
import { getFeedbackData } from "@/lib/getFeedbackData";
import styles from "./dashboard.module.css";
import useProtectedPage from "@/hooks/useProtectedPage";

export const Dashboard = ({
  params,
}: {
  params: { businessId: number | string };
}) => {
  useProtectedPage();

  const [business, setBusiness] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const businessData = await getBusiness(params.businessId);
        setBusiness(businessData);

        const feedbacksData = await getFeedbackData(businessData.slug);
        setFeedbacks(feedbacksData);

        setIsLoading(false);
      } catch (error) {
        console.error("There was an error fetching data", error);
        setBusiness(null);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.businessId]);

  return (
    <div className={styles.dashboard}>
      {isLoading ? (
        <p>Loading</p>
      ) : business ? (
        <>
          <Sidebar business={business} />
          <DashboardInfo feedbacks={feedbacks} />
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default Dashboard;
