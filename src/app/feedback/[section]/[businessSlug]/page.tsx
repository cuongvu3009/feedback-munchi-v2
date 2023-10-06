"use client";

import React, { useCallback, useEffect, useState } from "react";

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

type FlowItem = {
  service?: {
    name: string;
    question: string;
    subQuestion: string;
  };
  order?: {
    name: string;
    question: string;
    subQuestion: string;
  };
};

const flow = [
  {
    name: "service",
    question: "How was your experience?",
    subQuestion: "Your feedback helps us improve our service.",
  },
  {
    name: "delivery",
    question: "How was your experience?",
    subQuestion: "Your feedback helps us improve our service.",
  },
  {
    name: "fwf",
    question: "How was your experience?",
    subQuestion: "Your feedback helps us improve our service.",
  },
  {
    name: "order",
    question: "How was your order?",
    subQuestion: "Your feedback helps us improve our products.",
  },
];
const firstFlowItem = flow[0];
const lastFlowItem = flow[flow.length - 1];

const FeedbackPage: NextPage<{
  params: { businessSlug: string; section: string };
}> = ({ params }) => {
  const router = useRouter();
  const { getItem, removeItem } = useLocalStorage();
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const { rating } = useFeedbackContext();
  const { data, error, isLoading } = useSWR(
    `${API_BASE_URL}/business/${params.businessSlug}?params=logo,slug,name`,
    getFetcher
  );

  // This useEffect hook redirects to the first page to make sure first page rated
  useEffect(() => {
    const firstRating = rating.find((item) => item.type == firstFlowItem.name);
    if (!firstRating) {
      router.push(`/feedback/${firstFlowItem.name}/${params.businessSlug}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = () => {
    // Find the current section in the flow
    const currentFlowIndex = flow.findIndex(
      (item) => item.name === params.section
    );

    if (currentFlowIndex !== -1 && currentFlowIndex < flow.length - 1) {
      // If the current section is found and there is a next item in the flow
      const nextFlowItem = flow[currentFlowIndex + 1];
      router.push(`/feedback/${nextFlowItem.name}/${params.businessSlug}/`);
    }
  };

  // const handleSubmit = useCallback(async () => {
  //   setIsSubmitLoading(true);
  //   try {
  //     const body = {
  //       businessSlug: params.businessSlug,
  //       emojiService: getItem("emojiService"),
  //       serviceTags: getItem("serviceTags"),
  //       commentService: getItem("commentService"),
  //       typeService: getItem("typeService"),
  //       emojiOrder: getItem("emojiOrder"),
  //       typeOrder: getItem("typeOrder"),
  //       orderTags: getItem("orderTags"),
  //       commentOrder: getItem("commentOrder"),
  //     };

  //     const payload1 = {
  //       emoji: body.emojiService,
  //       businessSlug: body.businessSlug,
  //       type: body.typeService, // Replace with the correct variable or value
  //       comment: body.commentService,
  //       tags: body.serviceTags,
  //     };

  //     const payload2 = {
  //       emoji: body.emojiOrder,
  //       businessSlug: body.businessSlug,
  //       type: body.typeOrder, // Replace with the correct variable or value
  //       comment: body.commentOrder,
  //       tags: body.orderTags,
  //     };

  //     const result = await fetch(`/api/feedback`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify([payload1, payload2]), // Send an array of payloads
  //     });

  //     if (result && getItem("emojiService") && getItem("emojiOrder")) {
  //       const isPositiveFeedbackOrder =
  //         body.emojiService !== "terrible" &&
  //         body.emojiService !== "bad" &&
  //         body.emojiOrder !== "terrible" &&
  //         body.emojiOrder !== "bad";

  //       if (isPositiveFeedbackOrder === true) {
  //         router.push(`/feedback/tip/${params.businessSlug}`);
  //       } else {
  //         router.push(`/feedback/thank-you/${params.businessSlug}`);
  //       }

  //       const keysToRemove = [
  //         "emojiService",
  //         "typeService",
  //         "serviceTags",
  //         "commentService",
  //         "emojiOrder",
  //         "typeOrder",
  //         "orderTags",
  //         "commentOrder",
  //       ];
  //       keysToRemove.forEach((key) => removeItem(key));
  //       setEmojiOrderContext(null);
  //       setEmojiServiceContext(null);
  //       setIsSubmitLoading(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setIsSubmitLoading(false);
  //   }
  // }, [
  //   getItem,
  //   params.businessSlug,
  //   removeItem,
  //   router,
  //   setEmojiOrderContext,
  //   setEmojiServiceContext,
  // ]);

  // if (isLoading) {
  //   return <Spinner />;
  // }

  // if (isSubmitLoading) {
  //   return <Spinner />;
  // }

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
          {flow
            .filter((item) => item.name === params.section)
            .map((item, index) => (
              <div key={index}>
                <h3 className={styles.question}>
                  <b>{item.question}</b>
                </h3>
                <p className={styles.text}>{item.subQuestion}</p>
              </div>
            ))}
        </div>
        <Rating type={params.section} />
      </div>

      <div className="navigation">
        {params.section !== lastFlowItem.name ? (
          <Button
            onClick={handleNext}
            version="full"
            btnText="Next"
            // isDisabled={emojiServiceContext == null}
          />
        ) : (
          <Button
            // onClick={handleSubmit}
            version="full"
            btnText="Submit feedback"
            // isDisabled={emojiOrderContext == null}
          />
        )}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        <TradeMark />
      </div>
    </>
  );
};

export default FeedbackPage;
