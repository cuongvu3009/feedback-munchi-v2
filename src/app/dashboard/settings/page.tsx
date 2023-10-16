"use client";

import { MdConstruction } from "react-icons/md";
import { NextPage } from "next";
import React from "react";
import styles from "./settings.module.css";

const DashboardSettings: NextPage<{ params: { businessId: number } }> = ({
  params,
}) => {
  return (
    <div className="">
      <div className={`${styles["dashboard-card"]}`}>
        <h3>settings</h3>
        <p>
          This page is under construction <MdConstruction />
        </p>
      </div>
    </div>
  );
};

export default DashboardSettings;
