"use client";

import DashboardResponses from "./components/responses/DashboardResponses";
import DashboardScore from "@/app/dashboard/components/score/DashboardScore";
import FeedbackChart from "./components/chart/FeedbackChart";
import { NextPage } from "next";
import React from "react";
import styles from "./dashboardInfo.module.css";
import { useBusinessContext } from "@/context/BusinessContext";

const DashboardInfo: NextPage = () => {
  const { business } = useBusinessContext();

  if (!business) {
    return (
      <div className={`${styles["dashboard-info"]}`}>
        <p>
          <b>No business found! </b>
        </p>
      </div>
    );
  } else {
    return (
      <div className={`${styles["dashboard-info"]}`}>
        <div className={`${styles["dashboard-content"]}`}>
          <DashboardScore type="service" businessSlug={business?.slug} />
          <DashboardScore type="order" businessSlug={business?.slug} />
          <DashboardResponses businessSlug={business?.slug} />
        </div>

        <div className={`${styles["dashboard-chart"]}`}>
          <FeedbackChart type="service" businessSlug={business?.slug} />
          <FeedbackChart type="order" businessSlug={business?.slug} />
        </div>
      </div>
    );
  }
};

export default DashboardInfo;
