import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Customers from "./pages/Customers";
import Orders from './pages/Orders';
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";
import AddData from './pages/AddData';
import Deliveries from "./pages/Deliveries";
import Login from "./pages/Login";

import ProtectedRoute from "./ProtectedRoute";
import RoleBasedRoute from "./RoleBasedRoute";
import { currentUserRole } from "./auth"; // <- Added

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const contentStyle = {
    marginTop: "60px",
    marginLeft: sidebarOpen ? "220px" : "60px",
    padding: "20px",
    transition: "margin-left 0.3s ease-in-out",
    minHeight: "calc(100vh - 60px)",
    backgroundColor: "#f5f5f5",
    overflowX: "hidden",
  };

  return (
    <Router>
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} />
      <main style={contentStyle}>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Publicly protected home route */}
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />

          {/* Admin only */}
          <Route path="/customers" element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["admin"]}>
                <Customers />
              </RoleBasedRoute>
            </ProtectedRoute>
          } />
          <Route path="/sales" element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["admin"]}>
                <Sales />
              </RoleBasedRoute>
            </ProtectedRoute>
          } />
          <Route path="/reports" element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["admin"]}>
                <Reports />
              </RoleBasedRoute>
            </ProtectedRoute>
          } />
          <Route path="/add-data" element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["admin"]}>
                <AddData />
              </RoleBasedRoute>
            </ProtectedRoute>
          } />

          {/* Admin + User */}
          <Route path="/inventory" element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["admin", "user"]}>
                <Inventory />
              </RoleBasedRoute>
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["admin", "user"]}>
                <Orders />
              </RoleBasedRoute>
            </ProtectedRoute>
          } />

          {/* Admin + Driver */}
          <Route path="/deliveries" element={
            <ProtectedRoute>
              <RoleBasedRoute allowedRoles={["admin", "driver"]}>
                <Deliveries />
              </RoleBasedRoute>
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </Router>
  );
}
