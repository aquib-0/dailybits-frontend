import { createContext, useContext } from "react";
import type { formValue } from "../components/LoginForm";

export interface User {
  id: number;
  username: string;
  email: string;
  user_avatar: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (param: formValue) => Promise<void>;
  register: (params: { username: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};