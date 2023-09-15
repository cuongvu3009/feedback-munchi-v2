"use client";

import React, { useEffect } from "react";

import DashboardInfo from "@/components/dashboard/info/DashboardInfo";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import styles from "./dashboard.module.css";
import useProtectedPage from "@/hooks/useProtectedPage";

const Dashboard = () => {
  useProtectedPage();

  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <DashboardInfo />
    </div>
  );
};

export default Dashboard;
