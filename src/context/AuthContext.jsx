import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, setAuthToken } from "../services/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("auth_user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("auth_token") || null);
  const navigate = useNavigate();

  useEffect(() => {
    setAuthToken(token);
    if (token) localStorage.setItem("auth_token", token);
    else localStorage.removeItem("auth_token");
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem("auth_user", JSON.stringify(user));
    else localStorage.removeItem("auth_user");
  }, [user]);

  const login = async ({ email, password }) => {
    const data = await loginUser({ email, password });
    // json-server-auth returns { accessToken, user }
    setToken(data?.accessToken || data?.token || null);
    setUser(data?.user || null);
    return data;
  };

  const register = async (payload) => {
    const data = await registerUser(payload);
    // after registering, some setups return user; don't auto-login here
    return data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, setToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
