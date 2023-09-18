"use client";

import Button from "@/components/shared/Button";
import Logo from "@/components/shared/Logo";
import RatingOrder from "@/components/feedback/RatingOrder";
import Title from "@/components/shared/Title";
import TradeMark from "@/components/shared/TradeMark";
import styles from "./feedbackOrder.module.css";
import { useRouter } from "next/navigation";

const FeedbackOrder: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const body = {
        businessSlug: "sushiDaily test",
        emojiService: localStorage.getItem("emojiService"),
        commentService: localStorage.getItem("commentService"),
        serviceTags: localStorage.getItem("serviceTags"),
        emojiOrder: localStorage.getItem("emojiOrder"),
        commentOrder: localStorage.getItem("commentOrder"),
        orderTags: localStorage.getItem("orderTags"),
      };
      const result = await fetch(`/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(result);
      if (result) {
        const keysToRemove = [
          "emojiService",
          "commentService",
          "serviceTags",
          "emojiOrder",
          "commentOrder",
          "orderTags",
        ];
        await keysToRemove.forEach((key) => localStorage.removeItem(key));
      }
      await router.push("/feedback/success");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mobile">
      <div className={`${styles["feedback"]}`}>
        <Title />

        <div className={`${styles["feedback-wrapper"]}`}>
          <Logo />
          <div className={`${styles["feedback-container"]}`}>
            <div className={`${styles["feedback-description"]}`}>
              <h3>How was your order?</h3>
              <p>Your feedback helps us improve our products.</p>
            </div>
          </div>
        </div>
        <RatingOrder />

        <div className="navigation">
          <Button
            onClick={handleSubmit}
            version="full"
            btnText="Submit feedback"
          />
          <TradeMark />
        </div>
      </div>
    </div>
  );
};

export default FeedbackOrder;
