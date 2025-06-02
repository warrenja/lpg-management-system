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
