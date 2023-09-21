"use client";

import React from "react";
import styles from "./settings.module.css";
import useProtectedPage from "@/hooks/useProtectedPage";

const Settings = ({ params }: { params: { businessId: number } }) => {
  useProtectedPage();
  return (
    <div className="">
      <div className={`${styles["dashboard-card"]}`}>
        <h3>settings</h3>
      </div>
    </div>
  );
};

export default Settings;
