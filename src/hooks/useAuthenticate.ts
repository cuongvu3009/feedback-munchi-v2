"use client";

import { User } from "../types/auth.types";
import { useBusinessContext } from "@/context/BusinessContext";
import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useUser } from "./useUser";

export const useAuthenticate = () => {
  const { user, addUser, removeUser } = useUser();
  const { setBusinessId } = useBusinessContext();
  const { getItem, removeItem } = useLocalStorage();

  useEffect(() => {
    const user = getItem("user");
    if (user) {
      addUser(JSON.parse(user));
    }
  }, []);

  const login = (user: User) => {
    addUser(user);
  };

  const logout = () => {
    removeUser();
    setBusinessId(undefined);
    removeItem("business");
    removeItem("businessId");
  };

  return { user, login, logout };
};
