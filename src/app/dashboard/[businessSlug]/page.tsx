"use client";

import React, { useEffect, useState } from "react";

import { API_BASE_URL } from "@/utils/constantAPI";
import DashboardInfo from "@/components/dashboard/info/DashboardInfo";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import axios from "axios";
import styles from "./dashboard.module.css";
import useProtectedPage from "@/hooks/useProtectedPage";

const Dashboard = ({
  params,
}: {
  params: { businessSlug: number | string };
}) => {
  useProtectedPage();
  const [business, setBusiness] = useState<any | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user = JSON.parse(storedUser!);
    const access_token = user.result.session.access_token;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${API_BASE_URL}/business/${params.businessSlug}?mode=dashboard`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        const businessesData = response.data.result;
        setBusiness(businessesData);
        setIsLoading(false);
      } catch (error) {
        console.error("There was an error fetching data", error);
        setBusiness({}); // Set to an empty array on error
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.businessSlug]);

  return (
    <div className={styles.dashboard}>
      {business ? (
        <>
          <Sidebar business={business} />
          <DashboardInfo business={business} />
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default Dashboard;
