"use client";

import "./feedbackLayout.css";

import { ReactNode, useEffect, useState } from "react";

import { NextIntlClientProvider } from "next-intl";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fi" }, { locale: "es" }];
}

export default function LocaleLayout({
  children,
  params: { locale: propLocale }, // Rename prop.locale to avoid naming conflicts
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const [locale, setLocale] = useState(propLocale); // Initialize with the prop value
  const [messages, setMessages] = useState(undefined);

  const handleLanguageChange = (event: any) => {
    const newLocale = event.target.value;
    setLocale(newLocale); // Update the selected locale
    import(`../../../../translation/${newLocale}.json`)
      .then((module) => {
        setMessages(module.default);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // Load initial translation messages based on the selected locale
    handleLanguageChange({ target: { value: propLocale } });
  }, [propLocale]);

  const availableLanguages = [
    { locale: "en", label: "English" },
    { locale: "fi", label: "Finnish" },
    { locale: "es", label: "Estonian" },
  ];

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
