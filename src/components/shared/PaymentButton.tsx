import { PaymentButtonProps } from "../../types/feedback.types";

const PaymentButton = ({
  btnText,
  paymentLink,
  btnVersion,
}: PaymentButtonProps) => {
  return (
    <a href={paymentLink} className={`btn-${btnVersion}`}>
      <button>{btnText}</button>
    </a>
  );
};

export default PaymentButton;
