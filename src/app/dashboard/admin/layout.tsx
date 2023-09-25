"use client";

import React, { useEffect, useState } from "react";

import { BusinessProps } from "@/types/dashboard.types";
import Sidebar from "@/app/dashboard/components/sidebar/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";
import Spinner from "@/components/shared/Spinner";
import { getBusinessById } from "@/lib/getOneBusinessById";
import styles from "./dashboard.module.css";
import { useAuthContext } from "@/context/AuthContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [business, setBusiness] = useState<BusinessProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setItem } = useLocalStorage();
  const { userIsLoggedIn } = useAuthContext();

  let storedBusinessId = null;
  let businessId: number | null = null;
  if (typeof localStorage !== "undefined") {
    storedBusinessId = localStorage.getItem("businessId");
    businessId = storedBusinessId ? JSON.parse(storedBusinessId) : null;
  }

  useEffect(() => {
    const fetchData = async () => {
      // No fetching if no business
      if (!userIsLoggedIn) {
        return;
      }

      setIsLoading(true);
      try {
        const businessData = await getBusinessById(businessId!);
        setBusiness(businessData);
        setItem("business", JSON.stringify(businessData));
        setIsLoading(false);
      } catch (error) {
        console.error("There was an error fetching data", error);
        setBusiness(null);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [businessId]);

  return (
    <SidebarProvider>
      {isLoading ? (
        <Spinner />
      ) : business ? (
        <div className={styles.dashboard}>
          <Sidebar business={business} />
          <>{children}</>
        </div>
      ) : (
        <Spinner />
      )}
    </SidebarProvider>
  );
}
