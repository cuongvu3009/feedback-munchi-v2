"use client";

import React, { useEffect, useState } from "react";

import { API_BASE_URL } from "@/utils/constantAPI";
import BusinessSelection from "./components/BusinessSelection";
import Login from "./components/login/Login";
import Sidebar from "@/app/dashboard/components/sidebar/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";
import Spinner from "@/components/shared/Spinner";
import axios from "axios";
import { getCookie } from "cookies-next";
import styles from "./dashboard.module.css";
import { useBusinessContext } from "@/context/BusinessContext";

interface BusinessProps {
  id: number;
  name: string;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { business } = useBusinessContext();
  const [isLoading, setIsLoading] = useState(true);
  const [businesses, setBusinesses] = useState<BusinessProps[]>([]);
  const [isUser, setIsUser] = useState(false);
  const userCookie = getCookie("user");

  useEffect(() => {
    if (userCookie) {
      setIsUser(true);
    }
  }, [userCookie]);

  useEffect(() => {
    if (userCookie) {
      const user = JSON.parse(userCookie);

      const fetchData = async () => {
        try {
          const businessesData = await axios.get(
            `${API_BASE_URL}/users/${user.id}?params=businesses`,
            {
              headers: {
                Authorization: `Bearer ${user.session.access_token}`,
              },
            }
          );
          setBusinesses(businessesData.data.result.businesses);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      };

      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [userCookie]);

  if (isLoading) {
    return (
      <div className={styles.dashboard}>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {isUser ? (
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
      ) : (
        <Login />
      )}
    </>
  );
}
