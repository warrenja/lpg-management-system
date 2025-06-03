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

const initialUsers = [
  { username: "janice", password: "Janice94", role: "admin" },
  { username: "warren", password: "Warren42", role: "driver" },
  // You might want to add a default customer for testing, e.g.
  { username: "john", password: "John123", role: "customer" },
];

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [users, setUsers] = useState(initialUsers);
  const [orderNotifications, setOrderNotifications] = useState([]); // NEW

  const contentStyle = {
    marginTop: "60px",
    marginLeft: sidebarOpen ? "220px" : "0",
    padding: "20px",
    transition: "margin-left 0.3s ease-in-out",
    minHeight: "calc(100vh - 60px)",
    backgroundColor: "#f5f5f5",
    overflowX: "hidden",
  };

  const handleSignupSuccess = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    setShowSignup(false);
  };

  // Called when a new order is placed to add notification
  const handleNewOrder = (order) => {
    setOrderNotifications((prev) => [...prev, order]);
  };

  const LoginForm = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const foundUser = users.find(
        (u) =>
          u.username.toLowerCase() === formData.username.toLowerCase() &&
          u.password === formData.password
      );
      if (foundUser) {
        setUser(foundUser);
        setError("");
      } else {
        setError("Invalid username or password");
      }
    };

    return (
      <div style={{ maxWidth: 300, margin: "auto", padding: 20 }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Log In</button>
        </form>
        <p style={{ marginTop: 20 }}>
          No account?{" "}
          <button onClick={() => setShowSignup(true)}>Sign Up</button>
        </p>
      </div>
    );
  };

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
          <LoginForm />
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
                <Route
                  path="/orders"
                  element={
                    <Orders
                      role={role}
                      username={user.username}
                      notifications={orderNotifications}
                      onPlaceOrder={handleNewOrder} // pass handler to Orders
                    />
                  }
                />
                <Route path="/deliveries" element={<Deliveries />} />
              </>
            )}

            {/* Customer Routes */}
            {role === "customer" && (
              <>
                <Route path="/inventory" element={<Inventory />} />
                <Route
                  path="/orders"
                  element={
                    <Orders
                      role={role}
                      username={user.username}
                      onPlaceOrder={handleNewOrder}
                    />
                  }
                />
                <Route path="/deliveries" element={<Deliveries />} />
              </>
            )}

            {/* Driver Routes */}
            {role === "driver" && (
              <>
                <Route path="/deliveries" element={<Deliveries />} />
                <Route
                  path="/orders"
                  element={<Orders role={role} username={user.username} />}
                />
              </>
            )}

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      )}
    </Router>
  );
}
