"use client";

import "./endfeedback.css";

import Button from "@/components/shared/Button";
import { NextPage } from "next";
import { PiHeartStraightLight } from "react-icons/pi";
import TradeMark from "@/app/feedback/components/TradeMark";
import { useRouter } from "next/navigation";

const EndFeedBack: NextPage<{ params: { businessSlug: string } }> = ({
  params,
}) => {
  const router = useRouter();
  return (
    <>
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
