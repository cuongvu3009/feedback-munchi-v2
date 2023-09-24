export interface Feedback {
  id: number;
  emoji: any;
  businessSlug: string;
  comment: string;
  tags: string;
  createdAt: string;
  updatedAt: string;
  type: string;
}

export interface ButtonProps {
  version?: "primary" | "secondary" | "full" | "normal";
  type?: "submit" | "button" | "reset";
  isDisabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  btnText: string;
}

export interface EmojiProps {
  symbol: any;
  label: string;
  size: number;
}

export interface PaymentButtonProps {
  btnText: string;
  paymentLink: string;
  btnVersion: string;
}

export interface SvgProps {
  size: number;
}
