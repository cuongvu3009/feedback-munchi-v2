import { EmojiProps } from "../../types/feedback.types";

const Emoji = ({ symbol, label, size }: EmojiProps) => {
  return (
    <span
      className="emoji"
      role="img"
      aria-label={label ? label : ""}
      aria-hidden={!label}
      style={{ fontSize: size }}
    >
      {symbol}
    </span>
  );
};

export default Emoji;
