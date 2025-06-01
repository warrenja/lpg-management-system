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
import AddData from './pages/AddData'; // adjust the path if needed
import Deliveries from "./pages/Deliveries";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";

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
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
        <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
        <Route path="/sales" element={<ProtectedRoute><Sales /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/add-data" element={<ProtectedRoute><AddData /></ProtectedRoute>} />
        <Route path="/deliveries" element={<ProtectedRoute><Deliveries /></ProtectedRoute>} />

        </Routes>
      </main>
    </Router>
  );
}
