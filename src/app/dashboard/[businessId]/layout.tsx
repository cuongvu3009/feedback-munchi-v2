"use client";

import React, { useEffect, useState } from "react";

import { BusinessProps } from "@/types/dashboard.types";
import DashboardPage from "./info/page";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import { getBusiness } from "@/lib/getBusiness";
import styles from "./dashboard.module.css";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { businessId: number };
}) {
  const [business, setBusiness] = useState<BusinessProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const businessData = await getBusiness(params.businessId);
        setBusiness(businessData);

        setIsLoading(false);
      } catch (error) {
        console.error("There was an error fetching data", error);
        setBusiness(null);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.businessId]);

  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : business ? (
        <div className={styles.dashboard}>
          <Sidebar business={business} />
          <>{children}</>
        </div>
      ) : (
        <p>Loading....</p>
      )}
    </>
  );
}
