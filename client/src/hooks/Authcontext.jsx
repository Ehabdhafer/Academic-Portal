import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(Cookies.get("token") || null);
  const [roleId, setRoleId] = useState(Cookies.get("role_id") || null);

  const login = (token, role_id) => {
    setAuthToken(token);
    setRoleId(role_id);
    Cookies.set("token", token);
    Cookies.set("role_id", role_id);
  };

  const logout = () => {
    setAuthToken(null);
    setRoleId(null);
    Cookies.remove("token");
    Cookies.remove("role_id");
  };

  const isAuthenticated = () => {
    return !!authToken;
  };

  return (
    <AuthContext.Provider
      value={{ authToken, roleId, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
