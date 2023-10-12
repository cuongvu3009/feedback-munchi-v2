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

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.totalContainer}>
        <h2 className={styles.totalHeading}>Total Tips</h2>
        <div className={styles.total}>
          {Object.entries(data.totalAmountOfTips).map(([currency, amount]) => (
            <div key={currency} className={styles.totalItem}>
              <h3 className={styles.totalAmount}>
                {/* Must divide 100 because amount is in cents */}
                {Number(amount) / 100}
                <span className={styles.currency}>{currency}</span>
              </h3>
            </div>
          ))}
        </div>
      </div>
      <table className={styles.feedbackTable}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Tip Amount</th>
            <th>Payment ID</th>
          </tr>
        </thead>
        <tbody>
          {data.transactions.map((transaction: Transaction) => (
            <tr key={transaction.id}>
              <td className={styles.dateCell}>
                {moment(transaction.createdAt).format("MMM D, YYYY")}
              </td>
              <td className={styles.tipAmountCell}>
                {transaction.paymentAmount / 100}{" "}
                <span className={styles.currency}>{transaction.currency}</span>
              </td>
              <td className={styles.paymentIdCell}>{transaction.paymentId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTips;
