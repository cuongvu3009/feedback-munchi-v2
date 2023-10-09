"use client";

import "./feedbackLayout.css";

import { ReactNode, useEffect, useState } from "react";

import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fi" }, { locale: "es" }];
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const [messages, setMessages] = useState({}); // Initialize with an empty object

  // Function to handle language change
  const handleLanguageChange = (event: any) => {
    const newLocale = event.target.value;
    // Dynamically import the translation JSON file based on the selected locale
    import(`../../../../translation/${newLocale}.json`)
      .then((module) => {
        // Set the messages when the module is loaded
        setMessages(module.default);
      })
      .catch((error) => {
        notFound(); // Handle error appropriately
      });
  };

  useEffect(() => {
    // Load initial translation messages based on the selected locale
    handleLanguageChange({ target: { value: locale } });
  }, [locale]);

  // Define a list of available languages
  const availableLanguages = [
    { locale: "en", label: "English" },
    { locale: "fi", label: "Finnish" },
    { locale: "es", label: "Estonian" },
  ];

  // Render the component with the loaded messages and language selector
  return (
    <html lang={locale}>
      <body>
        <div className="mobile">
          <div className="language-selector">
            <label htmlFor="languageSelect">Choose a language:</label>
            <select
              id="languageSelect"
              onChange={handleLanguageChange}
              value={locale}
            >
              {availableLanguages.map((langOption) => (
                <option key={langOption.locale} value={langOption.locale}>
                  {langOption.label}
                </option>
              ))}
            </select>
          </div>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
