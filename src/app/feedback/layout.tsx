"use client";

import "./feedbackLayout.css";

import { ReactNode, useEffect, useState } from "react";

import { NextIntlClientProvider } from "next-intl";
import engTranslation from "../../../translation/en.json";
import { useLocale } from "@/context/LocaleContext";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fi" }, { locale: "es" }];
}

export default function LocaleLayout({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState(engTranslation); // 1: Initialize with an english as default
  const { locale, setLocale } = useLocale();

  const handleLanguageChange = (event: any) => {
    const newLocale = event.target.value;
    setLocale(newLocale); // 2: Update the selected locale
    // 3: Import locale translation package JSON
    import(`../../../translation/${newLocale}.json`)
      .then((module) => {
        setMessages(module.default);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const availableLanguages = [
    { locale: "en", label: "English" },
    { locale: "fi", label: "Suomi" },
    { locale: "es", label: "Estonian" },
  ];

  return (
    // 4: locale is now stored in contextAPI which later be used for redirecting
    <html lang={locale}>
      <body>
        <div className="mobile">
          <div className="language-selector">
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
