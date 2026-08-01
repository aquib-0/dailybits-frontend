import { useState } from "react";
import type { ReactNode } from "react";
import type { formValue } from "../components/LoginForm";
import { loginUser, registerUser } from "../utils/authService";
import { AuthContext,type User } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state lazily on initial render to avoid cascading renders in useEffect
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;
    try {
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState<boolean>(true);

  const login = async (param: formValue) => {
    const data = await loginUser(param);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setLoading(false);
  };

  const register = async ({ username, email, password }: { username: string; email: string; password: string }) => {
    await registerUser(username, email, password);
    await login({ email, password });
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};