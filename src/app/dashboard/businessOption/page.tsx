"use client";

import React, { useEffect, useState } from "react";

import { API_BASE_URL } from "@/utils/constantAPI";
import LogoutBtn from "@/components/shared/LogoutBtn";
import TradeMark from "@/components/shared/TradeMark";
import axios from "axios";
import styles from "./businessOption.module.css";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import useProtectedPage from "@/hooks/useProtectedPage";
import { useRouter } from "next/navigation";

interface BusinessProps {
  id: number;
  name: string;
}

const Page = () => {
  useProtectedPage();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [businesses, setBusinesses] = useState<BusinessProps[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<number | null>(null); // Track selected business
  const { getItem, setItem } = useLocalStorage();
  const router = useRouter();

  useEffect(() => {
    const fetchBusinesses = async () => {
      setIsLoading(true);
      const storedUser = getItem("user");
      const user = JSON.parse(storedUser as string);
      const userId = user.result.id;
      const access_token = user.result.session.access_token;

      try {
        const response = await axios.get(
          `${API_BASE_URL}/users/${userId}?params=businesses`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        setBusinesses(response.data.result.businesses);

        setIsLoading(false);
      } catch (error) {
        console.error("There was an error fetching data", error);
        setIsLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedBusiness !== null) {
      setItem("businessId", JSON.stringify(selectedBusiness));
      router.push(`/dashboard/${selectedBusiness}`);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Choose business</h2>
      <form className={`${styles["choose"]}`} onSubmit={handleSubmit}>
        <select
          className={styles.select}
          onChange={(e) => setSelectedBusiness(Number(e.target.value))}
          value={selectedBusiness || ""}
        >
          <option value="">Select a business</option>
          {businesses.map((business) => (
            <option key={business.id} value={business.id}>
              {business.name}
            </option>
          ))}
        </select>
        <br />
        <button
          className={styles.button}
          type="submit"
          disabled={
            isLoading || selectedBusiness === null || selectedBusiness == 0
          }
        >
          {isLoading ? "Loading..." : "Go To Dashboard"}
        </button>
        <LogoutBtn />
        <TradeMark />
      </form>
    </div>
  );
};

export default Page;
