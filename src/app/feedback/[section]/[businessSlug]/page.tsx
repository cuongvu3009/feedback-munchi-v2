"use client";

import React, { useCallback, useState } from "react";

import { API_BASE_URL } from "@/utils/constantAPI";
import Button from "@/components/shared/Button";
import Logo from "../../components/Logo";
import { NextPage } from "next";
import Rating from "../../components/Rating";
import Spinner from "@/components/shared/Spinner";
import Title from "@/components/shared/Title";
import TradeMark from "@/app/feedback/components/TradeMark";
import { getFetcher } from "@/utils/fetcher";
import styles from "./feedbackPage.module.css";
import { useFeedbackContext } from "@/context/FeedbackContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import useSWR from "swr";

const FeedbackPage: NextPage<{
  params: { businessSlug: string; section: string };
}> = ({ params }) => {
  const router = useRouter();
  const { getItem, removeItem } = useLocalStorage();
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const {
    emojiOrderContext,
    emojiServiceContext,
    setEmojiOrderContext,
    setEmojiServiceContext,
  } = useFeedbackContext();
  const { data, error, isLoading } = useSWR(
    `${API_BASE_URL}/business/${params.businessSlug}?params=logo,slug,name`,
    getFetcher
  );

  const handleNext = () => {
    router.push(`/feedback/order/${params.businessSlug}/`);
  };

  const handleSubmit = useCallback(async () => {
    setIsSubmitLoading(true);
    try {
      const body = {
        businessSlug: params.businessSlug,
        emojiService: getItem("emojiService"),
        serviceTags: getItem("serviceTags"),
        commentService: getItem("commentService"),
        typeService: getItem("typeService"),
        emojiOrder: getItem("emojiOrder"),
        typeOrder: getItem("typeOrder"),
        orderTags: getItem("orderTags"),
        commentOrder: getItem("commentOrder"),
      };

      const payload1 = {
        emoji: body.emojiService,
        businessSlug: body.businessSlug,
        type: body.typeService, // Replace with the correct variable or value
        comment: body.commentService,
        tags: body.serviceTags,
      };

      const payload2 = {
        emoji: body.emojiOrder,
        businessSlug: body.businessSlug,
        type: body.typeOrder, // Replace with the correct variable or value
        comment: body.commentOrder,
        tags: body.orderTags,
      };

      const result = await fetch(`/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([payload1, payload2]), // Send an array of payloads
      });

      if (result && getItem("emojiService") && getItem("emojiOrder")) {
        const isPositiveFeedbackOrder =
          body.emojiService !== "terrible" &&
          body.emojiService !== "bad" &&
          body.emojiOrder !== "terrible" &&
          body.emojiOrder !== "bad";

        if (isPositiveFeedbackOrder === true) {
          router.push(`/feedback/tip/${params.businessSlug}`);
        } else {
          router.push(`/feedback/thank-you/${params.businessSlug}`);
        }

        const keysToRemove = [
          "emojiService",
          "typeService",
          "serviceTags",
          "commentService",
          "emojiOrder",
          "typeOrder",
          "orderTags",
          "commentOrder",
        ];
        keysToRemove.forEach((key) => removeItem(key));
        setEmojiOrderContext(null);
        setEmojiServiceContext(null);
        setIsSubmitLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsSubmitLoading(false);
    }
  }, [
    getItem,
    params.businessSlug,
    removeItem,
    router,
    setEmojiOrderContext,
    setEmojiServiceContext,
  ]);

  if (isLoading && isSubmitLoading) {
    return <Spinner />;
  }

  return (
    <>
      {params.section == "service" ? (
        <Title isBack={false} />
      ) : (
        <Title isBack={true} />
      )}

      <Logo restaurant={data?.result} />
      <div className="feedback">
        <div className={styles["feedback-description"]}>
          <h3 className={styles.question}>
            <b>
              {params.section == "service"
                ? "How was your experience?"
                : "How was your order?"}
            </b>
          </h3>
          <p className={styles.text}>
            {params.section == "service"
              ? "Your feedback helps us improve our service."
              : "Your feedback helps us improve our products."}
          </p>
        </div>
        {params.section == "service" ? (
          <Rating type="SERVICE" />
        ) : (
          <Rating type="ORDER" />
        )}
      </div>

      <div className="navigation">
        {params.section == "service" ? (
          <Button
            onClick={handleNext}
            version="full"
            btnText="Next"
            isDisabled={emojiServiceContext == null}
          />
        ) : (
          <Button
            onClick={handleSubmit}
            version="full"
            btnText="Submit feedback"
            isDisabled={emojiOrderContext == null}
          />
        )}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        <TradeMark />
      </div>
    </>
  );
};

export default FeedbackPage;
