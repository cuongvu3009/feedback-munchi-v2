"use client";

import React, { useEffect, useState } from "react";

import BusinessSelection from "../components/BusinessSelection";
import { DashboardFeedbackProvider } from "@/context/DashboardFeedbackContext";
import Sidebar from "@/app/dashboard/components/sidebar/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";
import Spinner from "@/components/shared/Spinner";
import getUserBusinesses from "@/lib/getUserBusinesses";
import styles from "./dashboard.module.css";
import { useBusinessContext } from "@/context/BusinessContext";

interface BusinessProps {
  id: number;
  name: string;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { business } = useBusinessContext();
  const [isLoading, setIsLoading] = useState(false);
  const [businesses, setBusinesses] = useState<BusinessProps[]>([]);

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

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <SidebarProvider>
      <DashboardFeedbackProvider>
        <div className={styles.dashboard}>
          <Sidebar business={business} />
          <div className={styles.children}>
            <div className={styles.header}>
              <div className={styles.businessSelection}>
                <BusinessSelection businesses={businesses} />
              </div>
            </div>
            {businesses && business && children}
          </div>
        </div>
      </DashboardFeedbackProvider>
    </SidebarProvider>
  );
}
