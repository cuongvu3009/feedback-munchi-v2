"use client";

import React from "react";
import Spinner from "@/components/shared/Spinner";
import { Transaction } from "@/types/dashboard.types";
import { getFetcher } from "@/utils/fetcher";
import moment from "moment";
import styles from "./tips.module.css";
import { toast } from "react-toastify";
import { useBusinessContext } from "@/context/BusinessContext";
import useSWR from "swr";

const DashboardTips = () => {
  const { business } = useBusinessContext();

  const { data, error, isValidating } = useSWR(
    `/api/transaction/${business?.slug}`,
    getFetcher
  );

  if (isValidating) {
    return <Spinner />;
  }

  if (!data) {
    toast.error("No data found from the API!");
    return <div className={styles.error}>No data found from the API!</div>;
  }

  if (error) {
    toast.error(error.message);
    return <div className={styles.error}>Error loading transaction data!</div>;
  }
  console.log(data);

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.pageTitle}>Tip record</h1>
      <table className={styles.feedbackTable}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Tip Amount</th>
            <th>Payment ID</th>
          </tr>
        </thead>
        <tbody>
          {data.transaction.map((transaction: Transaction) => (
            <tr key={transaction.id}>
              <td>{moment(transaction.createdAt).format("MMM D, YYYY")}</td>
              <td>
                {transaction.paymentAmount / 100} {transaction.currency}
              </td>
              <td>{transaction.paymentId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTips;
