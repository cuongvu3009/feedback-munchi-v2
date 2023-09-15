export interface Feedback {
  id?: string;
  createdAt?: Date | string;
  emoji: any;
  comment: string;
}

export interface FeedbackContextProps {
  feedback: Feedback[];
  isLoading: boolean;
  selectedTip: number | undefined;
  setSelectedTip: (value: number) => void;
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
