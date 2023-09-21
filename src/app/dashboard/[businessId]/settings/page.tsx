"use client";

import React from "react";
import styles from "./settings.module.css";

const Settings = ({ params }: { params: { businessId: number } }) => {
  return (
    <div className="">
      <div className={`${styles["dashboard-card"]}`}>
        <h3>settings</h3>
      </div>
    </div>
  );
};

export default Settings;
