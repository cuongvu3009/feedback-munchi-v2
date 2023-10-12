"use client";

import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";

import Button from "@/components/shared/Button";
import EmojiLabel from "@/app/dashboard/components/emojiLabel/EmojiLabel";
import { Feedback } from "@/types/feedback.types";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import Spinner from "@/components/shared/Spinner";
import axios from "axios";
import { getFetcher } from "@/utils/fetcher";
import moment from "moment";
import styles from "./responses.module.css";
import { toast } from "react-toastify";
import { useBusinessContext } from "@/context/BusinessContext";
import useSWR from "swr";

const DashboardResponses = () => {
  const { business } = useBusinessContext();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentFeedbackId, setCurrentFeedbackId] = useState<number | null>(
    null
  );
  const [currentFeedbackData, setCurrentFeedbackData] =
    useState<Feedback | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isValidating } = useSWR(
    `/api/feedback/${business?.slug}?page=${currentPage}&itemsPerPage=${itemsPerPage}`,
    getFetcher
  );

  useEffect(() => {
    const fetchSingleFeedback = async () => {
      if (currentFeedbackId) {
        const result = await axios.get(
          `/api/feedback/${business?.slug}/findbyid/${currentFeedbackId}`
        );
        setCurrentFeedbackData(result.data.feedback);
      }
    };
    fetchSingleFeedback();
  }, [business?.slug, currentFeedbackId]);

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
    toast.error("No Data found from the database!");
    return <div className={styles.error}>No Data found from the database!</div>;
  }

  // Error state
  if (error) {
    toast.error(error.message);
    return (
      <div className={styles.error}>Error loading feedback responses data!</div>
    );
  }

  const openPopup = (id: number) => {
    setCurrentFeedbackId(id);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setCurrentFeedbackId(null);
    setCurrentFeedbackData(null);
    setIsPopupOpen(false);
  };

  return (
    <div className={styles.dashboardContainer}>
      <table className={styles.feedbackTable}>
        {/*  (table headers) */}
        <thead>
          <tr>
            <th>Rating</th>
            <th>Additional comments</th>
            <th>Submitted At</th>
            <th>Details</th>
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
                <td className={styles.buttonContainer}>
                  <button onClick={() => openPopup(feedback.id)}>
                    <MdOutlineKeyboardDoubleArrowRight size={30} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {isPopupOpen && (
        <div className={styles.popup}>
          <div className={`${styles["popup-container"]}`}>
            {currentFeedbackData ? (
              <>
                <ul key={currentFeedbackData.id}>
                  <li>
                    <label>Comment: </label>
                    <span>
                      {currentFeedbackData.comment
                        ? currentFeedbackData.comment
                        : "No comment"}
                    </span>
                  </li>
                  <li>
                    <label>Tags: </label>
                    <span>
                      {Array.isArray(currentFeedbackData.tags) &&
                      currentFeedbackData.tags.length > 0
                        ? currentFeedbackData.tags.join(", ")
                        : "No tags"}
                    </span>
                  </li>
                  <li>
                    <label>Type: </label>
                    <span>{currentFeedbackData.type}</span>
                  </li>
                  <li>
                    <label>Created at: </label>
                    <span>
                      {moment(currentFeedbackData.createdAt).format(
                        "DD/MM/YYYY - H:mm"
                      )}
                    </span>
                  </li>
                </ul>
                <div className={styles.closeBtn}>
                  <Button
                    btnText="Close"
                    version="secondary"
                    onClick={closePopup}
                  />
                </div>
              </>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      )}

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
    </div>
  );
};

export default DashboardResponses;
