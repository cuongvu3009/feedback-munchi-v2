"use client";

import "./successfeedback.css";

import Button from "@/components/shared/Button";
import Emoji from "@/components/shared/Emoji";
import FeedbackContext from "@/context/FeedbackContext";
import { GrStatusGood } from "react-icons/gr";
import { NextPage } from "next";
import OneTimePaymentCard from "../../components/PaymentCard";
import Title from "@/app/feedback/components/Title";
import TradeMark from "@/app/feedback/components/TradeMark";
import { tipOptions } from "@/utils/tipOptions";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const SuccessFeedback: NextPage<{
  params: { businessSlug: string };
}> = ({ params }) => {
  const router = useRouter();
  const { selectedTip, setSelectedTip } = useContext(FeedbackContext);
  const t = useTranslations("Tip");

  const handleChange = (e: any) => {
    setSelectedTip(+e.target.value);
  };

  return (
    <>
      <Title isBack={false} />
      <div className="success">
        <GrStatusGood size={100} />
        <h3>
          <b>{t("Thank you!")}</b>
        </h3>
        <p>{t("Your feedback helps us improve our service")}</p>
      </div>

      <div className="support">
        <p>
          <b>{t("Do you want to support us?")}</b>
        </p>
        <p>{t("Leave a tip for our hard working team!")}</p>

        <ul className="tip">
          {tipOptions.map((option, index) => (
            <li key={`tip-${index + 1}`}>
              <input
                type="radio"
                id={option.symbol}
                name="tip"
                value={option.value}
                onChange={handleChange}
              />
              <label htmlFor={option.symbol}>
                <Emoji symbol={option.symbol} label={option.symbol} size={25} />
                <p>
                  <b>{option.text}</b>
                </p>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="navigation">
        {selectedTip && (
          <OneTimePaymentCard
            recipient={params.businessSlug}
            amount={selectedTip}
          />
        )}

        <Button
          version="normal"
          btnText={t("No, thank you")}
          onClick={() =>
            router.push(`/feedback/thank-you/${params.businessSlug}`)
          }
        />
        <TradeMark />
      </div>
    </>
  );
};

export default SuccessFeedback;
