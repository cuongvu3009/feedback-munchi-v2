"use client";

import Button from "@/components/shared/Button";
import Logo from "@/components/shared/Logo";
import RatingOrder from "@/components/feedback/RatingOrder";
import Title from "@/components/shared/Title";
import TradeMark from "@/components/shared/TradeMark";
import styles from "./feedbackOrder.module.css";
import { useRouter } from "next/navigation";

export default function FeedbackOrder({
  params,
}: {
  params: { businessSlug: string };
}) {
  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const body = {
        businessSlug: params.businessSlug,
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

      if (result) {
        if (
          localStorage.getItem("emojiService") !== "terrible".trim() &&
          localStorage.getItem("emojiService") !== "bad".trim() &&
          localStorage.getItem("emojiOrder") !== "terrible".trim() &&
          localStorage.getItem("emojiOrder") !== "bad".trim()
        ) {
          router.push("/feedback/success");
          const keysToRemove = [
            "emojiService",
            "commentService",
            "serviceTags",
            "emojiOrder",
            "commentOrder",
            "orderTags",
          ];
          await keysToRemove.forEach((key) => localStorage.removeItem(key));
        } else {
          router.push(`/feedback/end/${params.businessSlug}`);
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
      }
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
              <h3>
                <b>How was your order?</b>
              </h3>
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
}
