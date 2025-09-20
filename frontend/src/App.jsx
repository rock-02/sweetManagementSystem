import { Route, Routes } from "react-router-dom";
import "./App.css";
import React from "react";
import Signup from "./auth/signup/SignUp";
import Login from "./auth/login/Login";
import Dashboard from "./user/DashBoard";
import AdminDashboard from "./admin/AdminBoard";

function App() {
  const token = localStorage.getItem("token");

  const isAdmin = localStorage.getItem("role") === "ADMIN";

  console.log("Role from localStorage:", localStorage.getItem("role"));

  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        <Route path="/user" element={token && <Dashboard />} />

        <Route path="/admin" element={isAdmin && token && <AdminDashboard />} />

        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
