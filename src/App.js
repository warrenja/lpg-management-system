// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";
import AddData from "./pages/AddData";
import Deliveries from "./pages/Deliveries";

import Signup from "./components/Signup";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null); // { username: "...", role: "admin" | "driver" | "customer" }
  const [showSignup, setShowSignup] = useState(false);

  const contentStyle = {
    marginTop: "60px",
    marginLeft: sidebarOpen ? "220px" : "0",
    padding: "20px",
    transition: "margin-left 0.3s ease-in-out",
    minHeight: "calc(100vh - 60px)",
    backgroundColor: "#f5f5f5",
    overflowX: "hidden",
  };

  function handleSignupSuccess(newUser) {
    setUser(newUser); // newUser: { username, role }
    setShowSignup(false);
  }

  const role = user?.role;

  return (
    <Router>
      <Header
        username={user?.username || "Guest"}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onSignupClick={() => setShowSignup(true)}
      />
      {user && <Sidebar isOpen={sidebarOpen} role={role} />}

      {!user && !showSignup && (
        <main style={{ ...contentStyle, marginLeft: 0 }}>
          <h2>Welcome to Smart Gas</h2>
          <p>Please sign up to access features.</p>
        </main>
      )}

      {showSignup && (
        <div style={{ ...contentStyle, marginLeft: 0 }}>
          <Signup onSignupSuccess={handleSignupSuccess} />
        </div>
      )}

      {user && (
        <main style={contentStyle}>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Admin Routes */}
            {role === "admin" && (
              <>
                <Route path="/customers" element={<Customers />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/add-data" element={<AddData />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/deliveries" element={<Deliveries />} />
              </>
            )}

            {/* Customer Routes */}
            {role === "customer" && (
              <>
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/deliveries" element={<Deliveries />} />
              </>
            )}

            {/* Driver Routes */}
            {role === "driver" && (
              <>
                <Route path="/deliveries" element={<Deliveries />} />
              </>
            )}

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      )}
    </Router>
  );
}
