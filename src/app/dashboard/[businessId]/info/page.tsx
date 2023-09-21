"use client";

import React, { useEffect, useState } from "react";

import DashboardInfo from "@/components/dashboard/info/DashboardInfo";
import { getBusiness } from "@/lib/getBusiness";
import { getFeedbackData } from "@/lib/getFeedbackData";
import useProtectedPage from "@/hooks/useProtectedPage";

export const DashboardPage = ({
  params,
}: {
  params: { businessId: number };
}) => {
  useProtectedPage();

  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const businessData = await getBusiness(params.businessId);
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
        <DashboardInfo feedbacks={feedbacks} businessId={params.businessId} />
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default DashboardPage;
