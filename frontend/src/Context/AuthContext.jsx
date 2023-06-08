import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const isAuthfromLS = localStorage.getItem("isAuth") || false;
  const tokenFromLS = localStorage.getItem("token") || "";
  let adminFromLS = localStorage.getItem("admin") || false;

  if (adminFromLS === "true") {
    adminFromLS = true;
  } else if (adminFromLS === "false") {
    adminFromLS = false;
  }

  const [isAuth, setIsAuth] = useState(isAuthfromLS);
  const [admin, setAdmin] = useState(adminFromLS);
  const [token, setToken] = useState(tokenFromLS);

  return (
    <AuthContext.Provider
      value={{ isAuth, setIsAuth, token, setToken, admin, setAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
}
