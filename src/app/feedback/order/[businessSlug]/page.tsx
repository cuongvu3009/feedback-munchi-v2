"use client";

import { useCallback, useState } from "react";

import Button from "@/components/shared/Button";
import Logo from "../../components/Logo";
import { NextPage } from "next";
import RatingOrder from "@/app/feedback/components/RatingOrder";
import { Restaurant } from "@/types/feedback.types";
import Spinner from "@/components/shared/Spinner";
import TradeMark from "@/app/feedback/components/TradeMark";
import styles from "./feedbackOrder.module.css";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";

export const FeedbackOrder: NextPage<{ params: { businessSlug: string } }> = ({
  params,
}) => {
  const router = useRouter();
  const { getItem, removeItem } = useLocalStorage();
  const [isLoading, setIsLoading] = useState(false);
  let storedRestaurant = null;
  let initialRestaurant = null;

  if (typeof localStorage !== "undefined") {
    storedRestaurant = localStorage.getItem("restaurant");
    initialRestaurant = storedRestaurant ? JSON.parse(storedRestaurant) : null;
  }

  const [restaurant, setRestaurant] = useState<Restaurant>(initialRestaurant);

  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
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
        const isPositiveFeedbackOrder =
          getItem("emoji") !== "terrible" && getItem("emoji") !== "bad";

        const positiveFeedbackService = getItem("positiveFeedbackService");
        if (
          isPositiveFeedbackOrder === true &&
          positiveFeedbackService == "true"
        ) {
          router.push(`/feedback/success`);
        } else {
          router.push(`/feedback/end/${params.businessSlug}`);
        }

        const keysToRemove = [
          "emoji",
          "comment",
          "type",
          "tags",
          "positiveFeedbackService",
          "restaurant",
        ];
        keysToRemove.forEach((key) => removeItem(key));
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [params.businessSlug, getItem, removeItem, router]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Logo restaurant={restaurant} />
      <div className="feedback">
        <div className={`${styles["feedback-description"]}`}>
          <h3>
            <b>How was your order?</b>
          </h3>
          <p>Your feedback helps us improve our products.</p>
        </div>
        <RatingOrder />
      </div>

      <div className="navigation">
        <Button
          onClick={handleSubmit}
          version="full"
          btnText="Submit feedback"
        />
        <TradeMark />
      </div>
    </>
  );
};
