"use client";

import "./endfeedback.css";

import Button from "@/components/shared/Button";
import { PiHeartStraightLight } from "react-icons/pi";
import TradeMark from "@/app/feedback/components/TradeMark";
import { useRouter } from "next/navigation";

const EndFeedBack = ({ params }: { params: { businessSlug: string } }) => {
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
            router.push(`/feedback/${params.businessSlug}/service/`)
          }
        />
        <TradeMark />
      </div>
    </>
  );
};

export default EndFeedBack;
