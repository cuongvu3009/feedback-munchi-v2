import { ReactNode } from "react";

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  level: string;
  publicId: string;
  verifyToken: string;
  refreshToken: string;
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  userIsLoggedIn: boolean;
}

export interface AuthProviderProps {
  children: ReactNode;
}
