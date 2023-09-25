"use client";

import { AuthContextType, AuthProviderProps } from "../types/auth.types";
// AuthContext.tsx
import React, { createContext, useContext } from "react";

import { usePersistState } from "@/hooks/usePersistState";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // const [user, setUser] = useState<User | null>(null);
  // const userIsLoggedIn = !!user?.session.access_token;
  const [user, setUser] = usePersistState("user", null);
  const userIsLoggedIn = !!user?.session.access_token;

  return (
    <AuthContext.Provider value={{ user, setUser, userIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
