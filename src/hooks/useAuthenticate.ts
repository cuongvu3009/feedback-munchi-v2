"use client";

import { User } from "../types/auth.types";
import { useLocalStorage } from "./useLocalStorage";
import { useUser } from "./useUser";

export const useAuthenticate = () => {
  const { user, addUser, removeUser } = useUser();
  const { removeItem } = useLocalStorage();

  const login = (user: User) => {
    addUser(user);
  };

  const logout = () => {
    removeUser();
    removeItem("business");
    removeItem("businessId");
  };

  return { user, login, logout };
};
