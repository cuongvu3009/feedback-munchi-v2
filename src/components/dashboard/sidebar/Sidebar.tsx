"use client";

import { GrLogout } from "react-icons/gr";
import Image from "next/image";
import Link from "next/link";
import LogoutBtn from "@/components/shared/LogoutBtn";
import Momotoko from "../../assets/MomotokoLogo.png";
import React from "react";
import TradeMark from "../../shared/TradeMark";
import styles from "./sidebar.module.css";

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <div className={`${styles["sidebar-top"]}`}>
        <div className={`${styles["logo-container"]}`}>
          {/* <div className={`${styles["logo"]}`}></div> */}
          <Image src={Momotoko} alt="Momotoko" className={styles.logo} />
          <h3>Momotoko</h3>
        </div>
        <Link href="/dashboard" className={`${styles["sidebar-link"]}`}>
          Dashboard
        </Link>
        <Link
          href="/dashboard/responses"
          className={`${styles["sidebar-link"]}`}
        >
          Responses
        </Link>
        <Link
          href="/dashboard/settings"
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
