import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Form from "../Pages/Form";
import PrivateRoute from "./PrivateRoute";
import AdminPrivateRoute from "./AdminPrivate";
import Admin from "../Pages/Admin";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route
        path="/admin"
        element={
          <AdminPrivateRoute>
            <Admin />
          </AdminPrivateRoute>
        }
      ></Route>
      <Route
        path="/form"
        element={
          <PrivateRoute>
            <Form />
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
}
