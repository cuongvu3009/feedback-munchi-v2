"use client";

import "./endfeedback.css";

import { useRouter, useSearchParams } from "next/navigation";

import Button from "@/components/shared/Button";
import { NextPage } from "next";
import { PiHeartStraightLight } from "react-icons/pi";
import Title from "@/components/shared/Title";
import TradeMark from "@/app/feedback/components/TradeMark";
import axios from "axios";
import { formatUnixTimestamp } from "@/utils/formatUnixTimestamp";
import { useEffect } from "react";

interface EndFeedbackPageProps {
  params: { businessSlug: string };
}

const EndFeedBack: NextPage<EndFeedbackPageProps> = ({ params }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const businessSlug = searchParams.get("businessSlug");
  const stripe_session_id = searchParams.get("session_id");

  useEffect(() => {
    if (stripe_session_id) {
      const storePayment = async () => {
        const result = await axios.get(`/api/transaction/${stripe_session_id}`);
        const paymentData = result.data.data[0];
        if (paymentData) {
          const restaurantName = paymentData.description;
          const date = paymentData.price.created;
          const paymentAmount = paymentData.amount_total / 100;
          const currency = paymentData.currency;
          const paymentId = paymentData.id;

          console.log(restaurantName, date, paymentAmount, currency, paymentId);
        }
      };
      storePayment();
    }
  }, [stripe_session_id]);

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
