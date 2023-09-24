"use client";

import "./successfeedback.css";

import Button from "@/components/shared/Button";
import Emoji from "@/components/shared/Emoji";
import FeedbackContext from "@/context/FeedbackContext";
import { GrStatusGood } from "react-icons/gr";
import PaymentButton from "@/components/shared/PaymentButton";
import TradeMark from "@/app/feedback/components/TradeMark";
import { getLinkByTip } from "@/lib/getStripeLinkByTipAmount";
import { tipOptions } from "@/utils/tipOptions";
import { useContext } from "react";
import { useRouter } from "next/navigation";

const SuccessFeedback = ({ params }: { params: { businessSlug: string } }) => {
  const router = useRouter();
  const { selectedTip, setSelectedTip } = useContext(FeedbackContext);

  const handleChange = (e: any) => {
    setSelectedTip(+e.target.value);
  };

  return (
    <>
      <div className="success">
        <GrStatusGood size={100} />
        <h3>
          <b>Thank you!</b>
        </h3>
        <p>Your feedback helps us improve our service.</p>
      </div>

      <div className="support">
        <p>
          <b>Do you want to support us?</b>
        </p>
        <p>Leave a tip for our hard working team!</p>

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
        {selectedTip ? (
          <PaymentButton
            btnVersion="full"
            btnText="Give tip"
            paymentLink={getLinkByTip(selectedTip)}
          />
        ) : (
          <Button isDisabled={true} version="full" btnText="Give tip" />
        )}
        <Button
          version="normal"
          btnText="No, thank you"
          onClick={() => router.push(`/feedback/end`)}
        />
        <TradeMark />
      </div>
    </>
  );
};

export default SuccessFeedback;
