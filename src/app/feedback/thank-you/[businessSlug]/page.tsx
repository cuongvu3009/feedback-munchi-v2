"use client";

import "./endfeedback.css";

import { useRouter, useSearchParams } from "next/navigation";

import Button from "@/components/shared/Button";
import { NextPage } from "next";
import { PiHeartStraightLight } from "react-icons/pi";
import Title from "@/components/shared/Title";
import TradeMark from "@/app/feedback/components/TradeMark";
import axios from "axios";
import { postFetcher } from "@/utils/fetcher";
import { useEffect } from "react";
import useSWR from "swr";

interface EndFeedbackPageProps {
  params: { businessSlug: string };
}

const EndFeedBack: NextPage<EndFeedbackPageProps> = ({ params }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stripe_session_id = searchParams.get("session_id");

  useEffect(() => {
    const storePayment = async () => {
      if (stripe_session_id && params.businessSlug) {
        const result = await axios.post(
          `/api/transaction/${params.businessSlug}/${stripe_session_id}/`
        );
        console.log(result);
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
          <b>Thank you!</b>
        </h3>
        <p>Your feedback helps</p>
        <p>us improve our service.</p>
      </div>

      <div className="navigation">
        <Button
          version="secondary"
          btnText="Submit another feedback"
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
