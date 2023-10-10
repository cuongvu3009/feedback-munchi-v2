"use client";

import "./feedbackLayout.css";

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mobile">{children}</div>;
}
