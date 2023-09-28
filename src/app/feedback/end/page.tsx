"use client";

import "./endfeedback.css";

import { useRouter, useSearchParams } from "next/navigation";

import Button from "@/components/shared/Button";
import { NextPage } from "next";
import { PiHeartStraightLight } from "react-icons/pi";
import Title from "@/components/shared/Title";
import TradeMark from "@/app/feedback/components/TradeMark";

const EndFeedBack: NextPage<{ params: { businessSlug: string } }> = ({
  params,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const businessSlug = searchParams.get("businessSlug");
  const stripe_session_id = searchParams.get("session_id");

  console.log(stripe_session_id);

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
          onClick={() => router.push(`/feedback/service/${businessSlug}/`)}
        />
        <TradeMark />
      </div>
    </>
  );
};

export default EndFeedBack;
