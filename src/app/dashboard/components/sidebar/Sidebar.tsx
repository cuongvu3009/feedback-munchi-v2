"use client";

import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import LogoutBtn from "@/app/dashboard/components/LogoutBtn";
import { SidebarProps } from "@/types/dashboard.types";
import TradeMark from "@/app/feedback/components/TradeMark";
import styles from "./sidebar.module.css";
import { usePathname } from "next/navigation";

const Sidebar: React.FC<SidebarProps> = ({ business }) => {
  const [sidebarOpen, setSideBarOpen] = useState(true);
  const pathName = usePathname();
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className={`${sidebarOpen ? styles.sidebar : styles.hideSidebar}`}>
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
                // className={`${styles["sidebar-link"]}`}
                className={`${styles["sidebar-link"]} ${
                  pathName == "/dashboard/admin" ? styles.activeLink : ""
                }`}
              >
                Dashboard
              </Link>
              <Link
                href={`/dashboard/admin/responses`}
                className={`${styles["sidebar-link"]} ${
                  pathName == "/dashboard/admin/responses"
                    ? styles.activeLink
                    : ""
                }`}
              >
                Responses
              </Link>
              <Link
                href={`/dashboard/admin/tips`}
                className={`${styles["sidebar-link"]} ${
                  pathName == "/dashboard/admin/tips" ? styles.activeLink : ""
                }`}
              >
                Tips
              </Link>
              <Link
                href={`/dashboard/admin/settings`}
                className={`${styles["sidebar-link"]} ${
                  pathName == "/dashboard/admin/settings"
                    ? styles.activeLink
                    : ""
                }`}
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
      <button onClick={handleViewSidebar} className="sidebarToggle">
        {!sidebarOpen ? (
          <MdKeyboardDoubleArrowRight size={30} />
        ) : (
          <MdKeyboardDoubleArrowLeft size={30} />
        )}
      </button>
    </>
  );
};

export default Sidebar;
