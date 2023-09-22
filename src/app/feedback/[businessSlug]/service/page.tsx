"use client";

import Button from "@/components/shared/Button";
import Logo from "@/components/shared/Logo";
import RatingService from "@/components/feedback/RatingService";
import styles from "./feedbackService.module.css";
import { useRouter } from "next/navigation";

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
    <>
      <div className={`${styles["feedback-container"]}`}>
        <div className={`${styles["feedback-description"]}`}>
          <h3 className={styles.question}>
            <b>How was your experience?</b>
          </h3>
          <p className={styles.text}>
            Your feedback helps us improve our service.
          </p>
        </div>
        <RatingService />
      </div>

      {/* <div className="navigation">
        <Button onClick={handleClick} version="full" btnText="Next" />
      </div> */}
    </>
  );
}
