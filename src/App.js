import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
  const [username, setUsername] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  const contentStyle = {
    marginTop: "60px",
    marginLeft: sidebarOpen ? "220px" : "60px",
    padding: "20px",
    transition: "margin-left 0.3s ease-in-out",
    minHeight: "calc(100vh - 60px)",
    backgroundColor: "#f5f5f5",
    overflowX: "hidden",
  };

  function handleSignupSuccess(newUsername) {
    setUsername(newUsername);
    setShowSignup(false);
  }

  return (
    <Router>
      <Header username={username || "Guest"} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} />

      {/* Show signup prompt if not signed in */}
      {!username && !showSignup && (
        <div style={{ padding: "20px", marginLeft: sidebarOpen ? "220px" : "60px" }}>
          <button onClick={() => setShowSignup(true)} style={{ padding: "10px 20px", fontSize: "16px" }}>
            Create Account to Order
          </button>
        </div>
      )}

      {/* Show Signup form */}
      {showSignup && (
        <div style={{ marginLeft: sidebarOpen ? "220px" : "60px" }}>
          <Signup onSignupSuccess={handleSignupSuccess} />
        </div>
      )}

      {/* Always show page routes */}
      <main style={contentStyle}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/add-data" element={<AddData />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/deliveries" element={<Deliveries />} />
        </Routes>
      </main>
    </Router>
  );
}
