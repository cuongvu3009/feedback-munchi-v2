"use client";

import React, { useState } from "react";

import { EmojiLabel } from "@/app/dashboard/components/emojiLabel/EmojiLabel";
import { Feedback } from "@/types/feedback.types";
import { getFetcher } from "@/utils/fetcher";
import moment from "moment";
import styles from "./responses.module.css";
import { useBusinessContext } from "@/context/BusinessContext";
import useSWR from "swr";

const DashboardResponses = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { business } = useBusinessContext();
  const { data, error, isValidating } = useSWR(
    `/api/feedback/${business?.slug}?page=${currentPage}&itemsPerPage=${itemsPerPage}`,
    getFetcher
  );

  return (
    <div className={styles.dashboardContainer}>
      <table className={styles.feedbackTable}>
        <thead>
          <tr>
            <th>Rating</th>
            <th>Type</th>
            <th>Additional comments</th>
            <th>Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {data.feedbacks.map((feedback: Feedback) => {
            return (
              <tr key={feedback.id}>
                <td>
                  <b>{EmojiLabel(feedback.emoji)}</b>
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
      <div className={styles.pagination}></div>
    </div>
  );
};

export default DashboardResponses;
