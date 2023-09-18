"use client";

import React from "react";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import styles from "./settings.module.css";
import useProtectedPage from "@/hooks/useProtectedPage";

const Settings = () => {
  useProtectedPage();
  return (
    <div className="">
      <Sidebar />
      <div className={`${styles["dashboard-card"]}`}>
        <h3>settings</h3>
      </div>{" "}
    </div>
  );
};

export default Settings;
