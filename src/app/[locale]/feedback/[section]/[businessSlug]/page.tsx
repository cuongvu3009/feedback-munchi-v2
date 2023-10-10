"use client";

import React, { useCallback, useEffect, useState } from "react";

import { API_BASE_URL } from "@/utils/constantAPI";
import Button from "@/components/shared/Button";
import Logo from "../../components/Logo";
import { NextPage } from "next";
import Rating from "../../components/Rating";
import Spinner from "@/components/shared/Spinner";
import Title from "@/app/[locale]/feedback/components/Title";
import TradeMark from "@/app/[locale]/feedback/components/TradeMark";
import axios from "axios";
import { getFetcher } from "@/utils/fetcher";
import styles from "./feedbackPage.module.css";
import { useFeedbackContext } from "@/context/FeedbackContext";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { useTranslations } from "next-intl";

const FeedbackPage: NextPage<{
  params: { businessSlug: string; section: string; locale: string };
}> = ({ params }) => {
  const router = useRouter();
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const { rating, resetContextState } = useFeedbackContext();
  const [postErr, setPostErr] = useState("");
  const { data, error, isLoading } = useSWR(
    `${API_BASE_URL}/business/${params.businessSlug}?params=logo,slug,name`,
    getFetcher
  );
  const t = useTranslations("Feedback");

  const flow = [
    {
      name: "service",
      question: t("questionService"),
      subQuestion: t("subQuestionService"),
    },
    {
      name: "order",
      question: t("questionOrder"),
      subQuestion: t("subQuestionOrder"),
    },
  ];
  const firstFlowItem = flow[0];
  const lastFlowItem = flow[flow.length - 1];

  // This useEffect hook redirects to the first page to make sure first page rated
  useEffect(() => {
    const firstRating = rating.find((item) => item.type == firstFlowItem.name);
    if (!firstRating) {
      router.push(
        `/${params.locale}/feedback/${firstFlowItem.name}/${params.businessSlug}`
      );
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
      router.push(
        `/${params.locale}/feedback/${nextFlowItem.name}/${params.businessSlug}/`
      );
    }
  };

  const handleSubmit = useCallback(async () => {
    setIsSubmitLoading(true);

    try {
      const result = await axios.post("/api/feedback", rating, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.status == 200) {
        // redirect based on feedback emoji
        let hasBadOrTerribleEmoji = false;
        // Check if any item has an emoji of "bad" or "terrible"
        for (const item of rating) {
          if (item.emoji === "bad" || item.emoji === "terrible") {
            hasBadOrTerribleEmoji = true;
            break; // No need to continue checking if we found one
          }
        }
        // Redirect based on the result
        if (hasBadOrTerribleEmoji) {
          router.push(
            `/${params.locale}/feedback/thank-you/${params.businessSlug}`
          );
        } else {
          router.push(`/${params.locale}/feedback/tip/${params.businessSlug}`);
        }

        // clean up after submit feedback
        resetContextState();
      }
    } catch (error: string | unknown) {
      console.log(error);
      setPostErr(error as string);
    }
  }, [params.businessSlug, params.locale, rating, resetContextState, router]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isSubmitLoading) {
    return <Spinner />;
  }

  const handleDisabledBtn = () => {
    const currentRating = rating.find((item) => item.type == params.section);
    const currentEmoji = currentRating?.emoji;
    if (currentEmoji == null) {
      return true;
    } else {
      return false;
    }
  };

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
        <Rating type={params.section} businessSlug={params.businessSlug} />
      </div>

      <div className="navigation">
        {params.section !== lastFlowItem.name ? (
          <Button
            onClick={handleNext}
            version="full"
            btnText={t("nextBtn")}
            isDisabled={handleDisabledBtn()}
          />
        ) : (
          <Button
            onClick={handleSubmit}
            version="full"
            btnText={t("submitBtn")}
            isDisabled={handleDisabledBtn()}
          />
        )}
        {error && <p style={{ color: "red" }}>Error: {error} </p>}
        {postErr && (
          <p style={{ color: "red" }}>Error sending feedback: {postErr} </p>
        )}

        <TradeMark />
      </div>
    </>
  );
};

export default FeedbackPage;
