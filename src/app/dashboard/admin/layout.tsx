"use client";

import React, { useEffect, useState } from "react";

import { API_BASE_URL } from "@/utils/constantAPI";
import BusinessSelection from "../components/BusinessSelection";
import { DashboardFeedbackProvider } from "@/context/DashboardFeedbackContext";
import Sidebar from "@/app/dashboard/components/sidebar/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";
import Spinner from "@/components/shared/Spinner";
import { getFetcher } from "@/utils/fetcher";
import getUserBusinesses from "@/lib/getUserBusinesses";
import styles from "./dashboard.module.css";
import { useBusinessContext } from "@/context/BusinessContext";
import useSWR from "swr";

interface BusinessProps {
  id: number;
  name: string;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { businessId, setBusiness } = useBusinessContext();
  const [isLoading, setIsLoading] = useState(false);
  const [businesses, setBusinesses] = useState<BusinessProps[]>([]);

  const { data, error } = useSWR(
    `${API_BASE_URL}/business/${businessId}?params=logo,slug,name`,
    getFetcher
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const businessesData = await getUserBusinesses();
        setBusinesses(businessesData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    console.log(error);
  }

  if (!data || isLoading) {
    // Data is still loading
    return <Spinner />;
  }

  // Data has been fetched, update the business context
  if (data.result) {
    setBusiness(data.result);
  }

  return (
    <SidebarProvider>
      <DashboardFeedbackProvider>
        <div className={styles.dashboard}>
          <Sidebar business={data.result} />
          <div className={styles.children}>
            <div className={styles.header}>
              <div className={styles.title}>Feedback</div>
              <div className={styles.businessSelection}>
                <BusinessSelection businesses={businesses} />
              </div>
            </div>
            {children}
          </div>
        </div>
      </DashboardFeedbackProvider>
    </SidebarProvider>
  );
}
