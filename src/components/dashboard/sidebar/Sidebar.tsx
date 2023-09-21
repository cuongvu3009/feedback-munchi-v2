"use client";

import { BusinessProps } from "@/types/dashboard.types";
import Image from "next/image";
import Link from "next/link";
import LogoutBtn from "@/components/shared/LogoutBtn";
import React from "react";
import TradeMark from "../../shared/TradeMark";
import styles from "./sidebar.module.css";

interface SidebarProps {
  business?: BusinessProps;
  businessId?: number;
}

const Sidebar: React.FC<SidebarProps> = ({ business }) => {
  if (!business) {
    return "loading...";
  }
  return (
    <div className={styles.sidebar}>
      <div className={`${styles["sidebar-top"]}`}>
        <div className={`${styles["logo-container"]}`}>
          <Image
            src={business.logo}
            width={60}
            height={60}
            alt={business.name}
            className={styles.logo}
          />
          <h3>{business.name}</h3>
        </div>
        <Link
          href={`/dashboard/${business.id}`}
          className={`${styles["sidebar-link"]}`}
        >
          Dashboard
        </Link>
        <Link
          href={`/dashboard/${business.id}/responses`}
          className={`${styles["sidebar-link"]}`}
        >
          Responses
        </Link>
        <Link
          href={`/dashboard/${business.id}/settings`}
          className={`${styles["sidebar-link"]}`}
        >
          Settings
        </Link>
      </div>

      <div className={`${styles["sidebar-bottom"]}`}>
        <LogoutBtn />
        <TradeMark />
      </div>
    </div>
  );
};

export default Sidebar;
