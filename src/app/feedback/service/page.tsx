"use client";

import "../feedback.css";

import Button from "@/components/shared/Button";
import Logo from "@/components/shared/Logo";
import RatingService from "@/components/feedback/RatingService";
import Title from "@/components/shared/Title";
import TradeMark from "@/components/shared/TradeMark";
import { useRouter } from "next/navigation";

const FeedbackService: React.FC = () => {
  const router = useRouter();

  function handleClick(e: any): void {
    e.preventDefault();
    router.push("/feedback/order");
  }

  return (
    <div className="feedback mobile">
      <Title />

      <div className="feedback-wrapper">
        <Logo />
        <div className="feedback-container">
          <div className="feedback-description">
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
  );
};

export default FeedbackService;
