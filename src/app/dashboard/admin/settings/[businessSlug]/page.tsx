"use client";

import { MdConstruction } from "react-icons/md";
import React from "react";
import styles from "./settings.module.css";

const Settings = ({ params }: { params: { businessId: number } }) => {
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

export default Settings;
