"use client";

import {
  AuthContextType,
  AuthProviderProps,
  User,
  UserAPIProps,
} from "../types/auth.types";
// AuthContext.tsx
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const userIsLoggedIn = !!user?.session.access_token;

  return (
    <AuthContext.Provider value={{ user, setUser, userIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
