"use client";

import React, { useEffect, useState } from "react";

import EmojiLabel from "@/app/dashboard/components/emojiLabel/EmojiLabel";
import { Feedback } from "@/types/feedback.types";
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

  useEffect(() => {
    // Reset to the first page whenever itemsPerPage changes
    setCurrentPage(1);
  }, [itemsPerPage]);

  const totalPages = Math.ceil(data?.totalItems / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

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
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? styles.activePage : ""}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Items per page selector */}
      <div className={styles.itemsPerPageSelector}>
        <span>Show items per page: </span>
        <select
          onChange={(e) => setItemsPerPage(+e.target.value)}
          value={itemsPerPage}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>
    </div>
  );
};

export default DashboardResponses;
