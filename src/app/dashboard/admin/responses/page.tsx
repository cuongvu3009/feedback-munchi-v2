"use client";

import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import React, { useState } from "react";

import EmojiLabel from "@/app/dashboard/components/emojiLabel/EmojiLabel";
import { Feedback } from "@/types/feedback.types";
import Spinner from "@/components/shared/Spinner";
import { getFetcher } from "@/utils/fetcher";
import moment from "moment";
import styles from "./responses.module.css";
import { useBusinessContext } from "@/context/BusinessContext";
import useSWR from "swr";

const DashboardResponses = () => {
  const { business } = useBusinessContext();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isValidating } = useSWR(
    `/api/feedback/${business?.slug}?page=${currentPage}&itemsPerPage=${itemsPerPage}`,
    getFetcher
  );

  const totalFeedbacks = data?.allFeedbacksCount || 0;
  const totalPages = Math.ceil(totalFeedbacks / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Loading state
  if (isValidating) {
    return <Spinner />;
  }

  if (!data) {
    return <div className={styles.error}>No Data found from the database!</div>;
  }

  // Error state
  if (error) {
    return (
      <div className={styles.error}>Error loading data: {error.message}</div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <table className={styles.feedbackTable}>
        {/*  (table headers) */}
        <thead>
          <tr>
            <th>Rating</th>
            <th>Type</th>
            <th>Additional comments</th>
            <th>Submitted At</th>
          </tr>
        </thead>

        {/*  (table body) */}
        <tbody>
          {data?.feedbacks.map((feedback: Feedback) => {
            return (
              <tr key={feedback.id}>
                <td>
                  <b>
                    <EmojiLabel emoji={feedback.emoji} />
                  </b>
                </td>
                <td>{feedback.type}</td>
                <td className={styles.tagsContainer}>
                  {Array.isArray(feedback.tags) && feedback.tags.length > 0 ? (
                    feedback.tags.map((item: string) => (
                      <p key={feedback.id + item} className={styles.tags}>
                        {item}
                      </p>
                    ))
                  ) : (
                    <p>No Tag</p>
                  )}
                </td>
                <td>{moment(feedback.createdAt).fromNow()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className={styles.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <IoChevronBackOutline />
        </button>
        <span>
          {currentPage} - {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <IoChevronForwardOutline />
        </button>
      </div>

      {/* Items per page selector */}
      {/* <div className={styles.itemsPerPageSelector}>
        <span>Show items per page: </span>
        <select
          onChange={(e) => setItemsPerPage(+e.target.value)}
          value={itemsPerPage}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div> */}
    </div>
  );
};

export default DashboardResponses;
