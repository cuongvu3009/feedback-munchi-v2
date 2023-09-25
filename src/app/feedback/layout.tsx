"use client";

import "./feedbackLayout.css";

import Title from "@/components/shared/Title";

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mobile">
      <Title />
      <div className="feedback-wrapper">{children}</div>
    </div>
  );
}
