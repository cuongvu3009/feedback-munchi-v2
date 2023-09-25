"use client";

import React, { useCallback, useEffect, useState } from "react";

import Button from "@/components/shared/Button";
import Logo from "../../components/Logo";
import { NextPage } from "next";
import RatingService from "@/app/feedback/components/RatingService";
import { Restaurant } from "@/types/feedback.types";
import Spinner from "@/components/shared/Spinner";
import TradeMark from "@/app/feedback/components/TradeMark";
import { getBusinessBySlug } from "@/lib/getOneBusinessBySlug";
import styles from "./feedbackService.module.css";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";

const FeedbackService: NextPage<{
  params: { businessSlug: string };
}> = ({ params }) => {
  const router = useRouter();
  const { getItem, removeItem, setItem } = useLocalStorage();
  const [isLoading, setIsLoading] = useState(false);
  const [restaurant, setRestaurant] = useState<Restaurant | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const restaurantData = await getBusinessBySlug(params.businessSlug);
        localStorage.setItem(
          "restaurant",
          JSON.stringify(restaurantData.result)
        );
        setRestaurant(restaurantData.result);

        setIsLoading(false);
      } catch (error) {
        console.error("There was an error fetching data", error);
        localStorage.setItem("restaurant", "null");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.businessSlug]);

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
        const isPositiveFeedback =
          getItem("emoji") !== "terrible" && getItem("emoji") !== "bad";

        setItem("positiveFeedbackService", isPositiveFeedback.toString());
        router.push(`/feedback/order/${params.businessSlug}/`);

        const keysToRemove = ["emoji", "comment", "type", "tags"];
        keysToRemove.forEach((key) => removeItem(key));

        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [params.businessSlug, getItem, removeItem, setItem, router]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Logo restaurant={restaurant} />
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
};

export default FeedbackService;
