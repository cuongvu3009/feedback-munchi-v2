"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";

// Define the shape of the context data
interface LocaleContextType {
  locale: string;
  setLocale: (locale: string) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}

// Create a provider component for the LocaleContext
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState("en"); // Initialize with a default locale

  const updateLocale = (newLocale: string) => {
    setLocale(newLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale: updateLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}
