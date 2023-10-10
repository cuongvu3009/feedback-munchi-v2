import "./globals.css";

import { AuthProvider } from "@/context/AuthContext";
import { BusinessProvider } from "@/context/BusinessContext";
import { DM_Sans } from "next/font/google";
import { FeedbackProvider } from "@/context/FeedbackContext";
import { LocaleProvider } from "@/context/LocaleContext";
import type { Metadata } from "next";

const sans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Munchi Feedback",
  description: "Munchi feedback manager",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sans.className}>
        <LocaleProvider>
          <FeedbackProvider>
            <AuthProvider>
              <BusinessProvider>{children}</BusinessProvider>
            </AuthProvider>
          </FeedbackProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
