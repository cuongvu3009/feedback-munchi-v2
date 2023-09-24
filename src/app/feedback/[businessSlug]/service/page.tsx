"use client";

import React, { useCallback } from "react";

import Button from "@/components/shared/Button";
import RatingService from "@/app/feedback/components/RatingService";
import TradeMark from "@/app/feedback/components/TradeMark";
import styles from "./feedbackService.module.css";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";

export default function FeedbackService({
  params,
}: {
  params: { businessSlug: string };
}) {
  const router = useRouter();
  const { getItem, removeItem, setItem } = useLocalStorage();

  const handleSubmit = useCallback(async () => {
    try {
      const body = {
        businessSlug: params.businessSlug,
        emoji: getItem("emoji"),
        comment: getItem("comment"),
        type: getItem("type"),
        tags: getItem("tags"),
      };
      const result = await fetch(`/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (result) {
        const isPositiveFeedback =
          getItem("emoji") !== "terrible" && getItem("emoji") !== "bad";

        setItem("positiveFeedbackService", isPositiveFeedback.toString());
        router.push(`/feedback/${params.businessSlug}/order/`);

        const keysToRemove = ["emoji", "comment", "type", "tags"];
        keysToRemove.forEach((key) => removeItem(key));
      }
    } catch (error) {
      console.log(error);
    }
  }, [params.businessSlug, getItem, removeItem, setItem, router]);

  return (
    <>
      <div className="feedback">
        <div className={styles["feedback-description"]}>
          <h3 className={styles.question}>
            <b>How was your experience?</b>
          </h3>
          <p className={styles.text}>
            Your feedback helps us improve our service.
          </p>
        </div>
        <RatingService />
      </div>

      <div className="navigation">
        <Button onClick={handleSubmit} version="full" btnText="Next" />
        <TradeMark />
      </div>
    </>
  );
}
