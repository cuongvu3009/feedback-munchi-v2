"use client";

import { useState } from "react";

export const useLocalStorage = () => {
  const [value, setValue] = useState<string | null>(null);

  const setItem = (key: string, value: string) => {
    // By adding these checks (typeof window !== "undefined") before accessing localStorage, you ensure that the code is only executed on the client side, where localStorage is defined.
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
    setValue(value);
  };

  const getItem = (key: string) => {
    if (typeof window !== "undefined") {
      const value = localStorage.getItem(key);
      setValue(value);
      return value;
    }
    return null;
  };

  const removeItem = (key: string) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
    setValue(null);
  };

  return { value, setItem, getItem, removeItem };
};
