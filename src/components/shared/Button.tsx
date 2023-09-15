import { ButtonProps } from "../../types/feedback.types";
import React from "react";

const Button: React.FC<ButtonProps> = ({
  version = "primary",
  isDisabled = false,
  onClick,
  type = "button",
  btnText = "",
}) => {
  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`btn btn-${version}`}
      onClick={onClick}
    >
      {btnText}
    </button>
  );
};

export default Button;
