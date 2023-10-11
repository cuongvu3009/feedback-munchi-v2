"use client";

import Image from "next/image";
import Link from "next/link";
import LogoutBtn from "@/app/dashboard/components/LogoutBtn";
import React from "react";
import { SidebarProps } from "@/types/dashboard.types";
import TradeMark from "../../../feedback/components/TradeMark";
import styles from "./sidebar.module.css";

const Sidebar: React.FC<SidebarProps> = ({ business }) => {
  return (
    <div className={styles.sidebar}>
      <div className={`${styles["sidebar-top"]}`}>
        <div className={`${styles["logo-container"]}`}>
          {business ? (
            <>
              <Image
                src={business.logo}
                width={60}
                height={60}
                alt={business.name}
                className={styles.logo}
              />
              <h3>{business.name}</h3>
            </>
          ) : (
            <>Please choose venues</>
          )}
        </div>
        {business ? (
          <>
            <Link
              href={`/dashboard/admin`}
              className={`${styles["sidebar-link"]}`}
            >
              Dashboard
            </Link>
            <Link
              href={`/dashboard/admin/responses`}
              className={`${styles["sidebar-link"]}`}
            >
              Responses
            </Link>
            <Link
              href={`/dashboard/admin/settings`}
              className={`${styles["sidebar-link"]}`}
            >
              Settings
            </Link>
          </>
        ) : (
          <>
            <Link
              href={`/dashboard/admin`}
              className={`${styles["disabled-link"]}`}
            >
              Dashboard
            </Link>
            <Link
              href={`/dashboard/admin`}
              className={`${styles["disabled-link"]}`}
            >
              Responses
            </Link>
            <Link
              href={`/dashboard/admin`}
              className={`${styles["disabled-link"]}`}
            >
              Settings
            </Link>
          </>
        )}
      </div>

      <div className={`${styles["sidebar-bottom"]}`}>
        <LogoutBtn />
        <TradeMark />
      </div>
    </div>
  );
};

export default Sidebar;
