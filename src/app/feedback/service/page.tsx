"use client";

import Button from "@/components/shared/Button";
import Logo from "@/components/shared/Logo";
import RatingService from "@/components/feedback/RatingService";
import Title from "@/components/shared/Title";
import TradeMark from "@/components/shared/TradeMark";
import styles from "./feedbackService.module.css";
import { useRouter } from "next/navigation";

const FeedbackService: React.FC = () => {
  const router = useRouter();

  function handleClick(e: any): void {
    e.preventDefault();
    router.push("/feedback/order");
  }

  return (
    <div className="mobile">
      <div className={`${styles["feedback"]}`}>
        <Title />

        <div className={`${styles["feedback-wrapper"]}`}>
          <Logo />
          <div className={`${styles["feedback-container"]}`}>
            <div className={`${styles["feedback-description"]}`}>
              <h3>How was your experience?</h3>
              <p>Your feedback helps us improve our service.</p>
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
};

export default FeedbackService;
