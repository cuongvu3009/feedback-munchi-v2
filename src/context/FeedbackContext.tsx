"use client";

import { createContext, useContext, useState } from "react";

export interface FeedbackContextProps {
  emojiServiceContext: string | null;
  setEmojiServiceContext: (value: string | null) => void;
  emojiOrderContext: string | null;
  setEmojiOrderContext: (value: string | null) => void;
  selectedTip: number | undefined;
  setSelectedTip: (value: number) => void;
}

const FeedbackContext = createContext<FeedbackContextProps>({
  emojiServiceContext: null,
  setEmojiServiceContext: function (value: string | null): void {
    throw new Error("Function not implemented.");
  },
  emojiOrderContext: null,
  setEmojiOrderContext: function (value: string | null): void {
    throw new Error("Function not implemented.");
  },
  selectedTip: undefined,
  setSelectedTip: function (value: number): void {
    throw new Error("Function not implemented.");
  },
});
export const useFeedbackContext = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error(
      "useFeedbackContext must be used within an FeedbackProvider"
    );
  }
  return context;
};
export const FeedbackProvider = ({ children }: any) => {
  const [emojiServiceContext, setEmojiServiceContext] = useState<string | null>(
    null
  );
  const [emojiOrderContext, setEmojiOrderContext] = useState<string | null>(
    null
  );
  const [selectedTip, setSelectedTip] = useState<number | undefined>(undefined);

  return (
    <FeedbackContext.Provider
      value={{
        emojiServiceContext,
        setEmojiServiceContext,
        emojiOrderContext,
        setEmojiOrderContext,
        selectedTip,
        setSelectedTip,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
export default FeedbackContext;
