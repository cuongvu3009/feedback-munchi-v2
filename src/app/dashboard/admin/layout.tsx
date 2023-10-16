"use client";

import React, { useEffect, useState } from "react";

import BusinessSelection from "../components/BusinessSelection";
import Sidebar from "@/app/dashboard/components/sidebar/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";
import Spinner from "@/components/shared/Spinner";
import getUserBusinesses from "@/lib/getUserBusinesses";
import styles from "./dashboard.module.css";
import { useAuthContext } from "@/context/AuthContext";
import { useBusinessContext } from "@/context/BusinessContext";
import { useRouter } from "next/navigation";

interface BusinessProps {
  id: number;
  name: string;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { business } = useBusinessContext();
  const [isLoading, setIsLoading] = useState(true);
  const [businesses, setBusinesses] = useState<BusinessProps[]>([]);

  const { userIsLoggedIn } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!userIsLoggedIn) {
      router.push("/dashboard/login");
    } else {
      setIsLoading(false);
    }
  }, [router, userIsLoggedIn]);

  useEffect(() => {
    const fetchData = async () => {
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
    return (
      <div className={styles.dashboard}>
        <Spinner />
      </div>
    );
  }
  return (
    <SidebarProvider>
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
    </SidebarProvider>
  );
}
