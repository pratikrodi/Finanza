import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CustomerDashboard from "./pages/CustomerDashboard";
import CADashboard from "./pages/CADashboard";
import AdminDashboard from "./pages/AdminDashboard";
import RegisterCA from "./pages/RegisterCA";
import ProfilePage from "./pages/ProfilePage";
import Notifications from "./pages/Notifications";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/register_ca" element={<RegisterCA />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/notifications" element={<Notifications />} />
        

        {user?.role === "customer" && (
          <Route path="/dashboard" element={<CustomerDashboard />} />
        )}
        {user?.role === "ca" && (
          <Route path="/dashboard" element={<CADashboard />} />
        )}
        {user?.role === "admin" && (
          <Route path="/dashboard" element={<AdminDashboard />} />
        )}

        {/* Redirect if not logged in */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
