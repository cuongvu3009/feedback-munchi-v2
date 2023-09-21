export interface Feedback {
  id?: string;
  createdAt: string;
  emojiService: string;
  emojiOrder: string;
  commentService: string;
  commentOrder: string;
  businessSlug: string;
  serviceTags: string[];
  orderTags: string[];
}

export interface FeedbackContextProps {
  feedbacks: Feedback[];
  isLoading: boolean;
  selectedTip: number | undefined;
  setSelectedTip: (value: number) => void;
  setFeedbacks: (value: Feedback[]) => void;
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
