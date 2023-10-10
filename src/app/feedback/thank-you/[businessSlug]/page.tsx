"use client";

import "./endfeedback.css";

import { useRouter, useSearchParams } from "next/navigation";

import Button from "@/components/shared/Button";
import { NextPage } from "next";
import { PiHeartStraightLight } from "react-icons/pi";
import Title from "@/app/feedback/components/Title";
import TradeMark from "@/app/feedback/components/TradeMark";
import axios from "axios";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

interface EndFeedbackPageProps {
  params: { businessSlug: string };
}

const EndFeedBack: NextPage<EndFeedbackPageProps> = ({ params }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stripe_session_id = searchParams.get("session_id");
  const t = useTranslations("Thankyou");

  useEffect(() => {
    const storePayment = async () => {
      if (stripe_session_id && params.businessSlug) {
        const result = await axios.post(
          `/api/transaction/${params.businessSlug}/${stripe_session_id}/`
        );
      }
    };
    storePayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Title isBack={false} />
      <div className="end-feedback">
        <PiHeartStraightLight size={100} />
        <h3>
          <b>{t("Thank you!")}</b>
        </h3>
        <p>{t("Your feedback helps")}</p>
        <p>{t("us improve our service")}</p>
      </div>

      <div className="navigation">
        <Button
          version="secondary"
          btnText={t("submitAnotherBtn")}
          onClick={() =>
            router.push(`/feedback/service/${params.businessSlug}/`)
          }
        />
        <TradeMark />
      </div>
    </>
  );
};

export default EndFeedBack;
