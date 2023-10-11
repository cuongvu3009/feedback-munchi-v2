import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "@/context/AuthContext";
import { BusinessProvider } from "@/context/BusinessContext";
import { DM_Sans } from "next/font/google";
import { FeedbackProvider } from "@/context/FeedbackContext";
import { LocaleProvider } from "@/context/LocaleContext";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";

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
              <BusinessProvider>
                {children}
                <ToastContainer
                  position="bottom-center"
                  autoClose={1000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
              </BusinessProvider>
            </AuthProvider>
          </FeedbackProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
