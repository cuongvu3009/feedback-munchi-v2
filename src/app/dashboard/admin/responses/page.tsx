"use client";

import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import React, { useState } from "react";

import AwesomeSVG from "@/utils/emoji-svg/AwesomeSVG";
import BadSVG from "@/utils/emoji-svg/BadSVG";
import { Feedback } from "@/types/feedback.types";
import GoodSVG from "@/utils/emoji-svg/GoodSVG";
import OkeySVG from "@/utils/emoji-svg/OkeySVG";
import TerribleSVG from "@/utils/emoji-svg/TerribleSVG";
import moment from "moment";
import styles from "./responses.module.css";
import { useDashboardFeedbackContext } from "@/context/DashboardFeedbackContext";

const DashboardResponses = () => {
  const { serviceFeedbacks, orderFeedbacks } = useDashboardFeedbackContext();
  console.log(serviceFeedbacks);

  // Pagination for feedbacks
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Combine the service and order feedbacks into a single array
  const combinedFeedbacks: Feedback[] = [];

  // Interleave the service and order feedbacks
  if (serviceFeedbacks && orderFeedbacks) {
    for (
      let i = 0;
      i < Math.max(serviceFeedbacks.length, orderFeedbacks.length);
      i++
    ) {
      if (i < serviceFeedbacks.length) {
        combinedFeedbacks.push(serviceFeedbacks[i]);
      }
      if (i < orderFeedbacks.length) {
        combinedFeedbacks.push(orderFeedbacks[i]);
      }
    }
  }

  const paginateData = (data: Feedback[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };
  const paginatedFeedback = paginateData(combinedFeedbacks);

  const nextPage = () => {
    if (currentPage < Math.ceil(combinedFeedbacks.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getEmojiLabel = (emoji: string) => {
    switch (emoji) {
      case "terrible":
        return (
          <span className={styles.emojiContainer}>
            <div className={styles.emoji}>
              <TerribleSVG size={30} />
            </div>
            <p>Terrible</p>
          </span>
        );
      case "bad":
        return (
          <span className={styles.emojiContainer}>
            <div className={styles.emoji}>
              <BadSVG size={30} />
            </div>
            <p>Bad</p>
          </span>
        );
      case "okey":
        return (
          <span className={styles.emojiContainer}>
            <div className={styles.emoji}>
              <OkeySVG size={30} />
            </div>
            <p>Okey</p>
          </span>
        );
      case "good":
        return (
          <span className={styles.emojiContainer}>
            <div className={styles.emoji}>
              <GoodSVG size={30} />
            </div>
            <p>Good</p>
          </span>
        );
      case "awesome":
        return (
          <span className={styles.emojiContainer}>
            <div className={styles.emoji}>
              <AwesomeSVG size={30} />
            </div>
            <p>Awesome</p>
          </span>
        );
      default:
        return emoji;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Render combined feedbacks in a table */}
      <table className={styles.feedbackTable}>
        <thead>
          <tr>
            <th>Rating</th>
            <th>Type</th>
            <th>Additional comments</th>
            {/* <th>Comment</th> */}
            <th>Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {paginatedFeedback.map((feedback) => {
            return (
              <tr key={feedback.id}>
                <td>
                  <b>{getEmojiLabel(feedback.emoji)}</b>
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
        {currentPage !== 1 && (
          <button onClick={prevPage}>
            {" "}
            <IoChevronBackOutline />
          </button>
        )}

        <span>
          {currentPage} - {Math.ceil(combinedFeedbacks.length / itemsPerPage)}
        </span>
        <button
          onClick={nextPage}
          disabled={
            currentPage === Math.ceil(combinedFeedbacks.length / itemsPerPage)
          }
        >
          <IoChevronForwardOutline />
        </button>
      </div>
    </div>
  );
};

export default DashboardResponses;
