"use client";

import DashboardScore from "@/app/dashboard/components/score/DashboardScore";
import { NextPage } from "next";
import React from "react";
import styles from "./dashboardInfo.module.css";
import { useBusinessContext } from "@/context/BusinessContext";
import { useDashboardFeedbackContext } from "@/context/DashboardFeedbackContext";

const DashboardInfo: NextPage = () => {
  const { business, businessId } = useBusinessContext();
  const { setOrderFeedbacks, setServiceFeedbacks } =
    useDashboardFeedbackContext();

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
          {/* <DashboardScore data={orderFeedbacksData} /> */}
          {/* <DashboardResponses
							data={serviceFeedbacksData.concat(orderFeedbacksData)}
							businessId={businessId as number}
						/> */}
        </div>

        {/* {serviceFeedbacksData && orderFeedbacksData && (
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
				)} */}
      </div>
    );
  }
};

export default DashboardInfo;
