"use client";

import { API_BASE_URL } from "@/utils/constantAPI";
import Button from "@/components/shared/Button";
import Logo from "@/components/shared/Logo";
import RatingOrder from "@/components/feedback/RatingOrder";
import Title from "@/components/shared/Title";
import TradeMark from "@/components/shared/TradeMark";
import axios from "axios";
import styles from "./feedbackOrder.module.css";
import { useRouter } from "next/navigation";

const FeedbackOrder: React.FC = () => {
  const router = useRouter();
  async function handleClick(e: any): Promise<void> {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_BASE_URL}/feedback`,
        {
          businessSlug: "sushiDaily",
          emoji_service: localStorage.getItem("emojiService"),
          comment_service: localStorage.getItem("commentService"),
          tags_service: localStorage.getItem("serviceTags"),
          emoji_order: localStorage.getItem("emojiOrder"),
          comment_order: localStorage.getItem("commentOrder"),
          tags_order: localStorage.getItem("orderTags"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      router.push("/feedback/success");
      console.log(response);
    } catch (error) {
      console.error("There was an error sending the data", error);
    }

    const keysToRemove = [
      "emojiService",
      "commentService",
      "tagsService",
      "emojiOrder",
      "commentOrder",
      "tagsOrder",
    ];
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  }

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
            onClick={handleClick}
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
