import React, { createContext, useState, useEffect, useCallback } from "react";
import { login, logout, check } from "@/api-services/auth.service";

export const AuthCtx = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const checkAuth = useCallback(async () => {
    try {
      const { response, data } = await check();
      if (!response.ok) throw new Error();
      setUser(data.data);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const isAdmin = user?.role === "admin";

  const isAuthenticated = !!user;

  const loginAuth = async (email, password) => {
    await login({ email, password });
    await checkAuth();
  };

  const logoutAuth = async () => {
    await logout();
    setUser(null);
  };

  return (
    <AuthCtx.Provider
      value={{
        user,
        isAdmin,
        isAuthenticated,
        login: loginAuth,
        logout: logoutAuth,
        check: checkAuth,
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
};
