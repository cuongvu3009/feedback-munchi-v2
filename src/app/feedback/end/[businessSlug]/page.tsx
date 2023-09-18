"use client";

import "./endfeedback.css";

import Button from "@/components/shared/Button";
import { PiHeartStraightLight } from "react-icons/pi";
import Title from "@/components/shared/Title";
import TradeMark from "@/components/shared/TradeMark";
import { useRouter } from "next/navigation";

const EndFeedBack = ({ params }: { params: { businessSlug: string } }) => {
  const router = useRouter();
  return (
    <div className="mobile">
      <Title />

      <div className="end-feedback">
        <PiHeartStraightLight size={100} />
        <h3>Thank you!</h3>
        <p>You make us feel very special.</p>
      </div>

      <div className="navigation">
        <Button
          version="full"
          btnText="Submit another feedback"
          onClick={() =>
            router.push(`/feedback/service/${params.businessSlug}`)
          }
        />
        <TradeMark />
      </div>
    </div>
  );
};

export default EndFeedBack;
