import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminPrivateRoute({ children }) {
  const { admin } = useContext(AuthContext);

  if (!admin) {
    return <Navigate to="/" />;
  }

  return children;
}
