"use client";

import React from "react";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import styles from "./settings.module.css";
import useProtectedPage from "@/hooks/useProtectedPage";

const Settings = ({
  params,
}: {
  params: { businessSlug: number | string };
}) => {
  useProtectedPage();
  return (
    <div className="">
      <Sidebar businessSlug={params.businessSlug} />
      <div className={`${styles["dashboard-card"]}`}>
        <h3>settings</h3>
      </div>{" "}
    </div>
  );
};

export default Settings;
