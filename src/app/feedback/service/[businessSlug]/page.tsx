"use client";

import Button from "@/components/shared/Button";
import Logo from "@/components/shared/Logo";
import RatingService from "@/components/feedback/RatingService";
import Title from "@/components/shared/Title";
import TradeMark from "@/components/shared/TradeMark";
import styles from "./feedbackService.module.css";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FeedbackService({
  params,
}: {
  params: { businessSlug: string };
}) {
  const router = useRouter();

  function handleClick(e: any): void {
    e.preventDefault();
    router.push(`/feedback/order/${params.businessSlug}`);
  }

  return (
    <div className="mobile">
      <div className={`${styles["feedback"]}`}>
        <div className={styles.header}>
          <Title />
        </div>

        <div className={`${styles["feedback-wrapper"]}`}>
          <Logo />
          <div className={`${styles["feedback-container"]}`}>
            <div className={`${styles["feedback-description"]}`}>
              <h3 className={styles.question}>
                <b>How was your experience?</b>
              </h3>
              <p className={styles.text}>
                Your feedback helps us improve our service.
              </p>
            </div>
          </div>
        </div>
        <RatingService />

        <div className="navigation">
          <Button onClick={handleClick} version="full" btnText="Next" />
          <TradeMark />
        </div>
      </div>
    </div>
  );
}
