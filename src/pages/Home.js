import React from "react";
import './Home.css';
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaBoxes,
  FaCashRegister,
  FaChartBar,
  FaClipboardList
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar
} from "recharts";

// Icon colors
const iconColors = ["#ff1744", "#00e676", "#ff9100", "#2979ff", "#6a1b9a"];

const sidebarItems = [
  { name: "Customers", path: "/customers", icon: <FaUsers />, color: iconColors[0] },
  { name: "Inventory", path: "/inventory", icon: <FaBoxes />, color: iconColors[1] },
  { name: "Sales", path: "/sales", icon: <FaCashRegister />, color: iconColors[2] },
  { name: "Reports", path: "/reports", icon: <FaChartBar />, color: iconColors[3] },
  { name: "Orders", path: "/orders", icon: <FaClipboardList />, color: iconColors[4] },
];

const pieData = [
  { name: "Sales", value: 400 },
  { name: "Inventory", value: 300 },
  { name: "Customers", value: 300 },
  { name: "Reports", value: 200 },
];

const lineData = [
  { month: "Jan", sales: 400, inventory: 240 },
  { month: "Feb", sales: 300, inventory: 139 },
  { month: "Mar", sales: 500, inventory: 480 },
  { month: "Apr", sales: 278, inventory: 390 },
  { month: "May", sales: 189, inventory: 480 },
  { month: "Jun", sales: 239, inventory: 380 },
  { month: "Jul", sales: 349, inventory: 430 },
];

const pieColors = ["#e63946", "#1d3557", "#2a9d8f", "#f4a261"];

export default function Home() {
  const iconSize = 110;

  const commonBackgroundStyle = {
    backgroundColor: "#fff",
    padding: "30px 40px",
    borderRadius: 20,
    display: "inline-block",
    marginBottom: "40px",
    width: "700px",   // Add fixed width to make it wider
    maxWidth: "90%",  // Optionally limit max width on smaller screens
  };

  const iconGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // 3 columns only
    rowGap: "60px",
    columnGap: "120px",
    justifyItems: "center",
    alignItems: "center",
    fontWeight: "600",
  };

  const iconTextStyle = {
    fontSize: "24px",
    marginTop: "14px",
    color: "#333",
  };

  return (
    <div>
{/* Icons Grid */}
<div style={{ display: "flex", justifyContent: "center" }}>
  <div style={commonBackgroundStyle}>
    <div style={iconGridStyle}>
      {sidebarItems.map(({ name, path, icon, color }) => (
        <Link
          key={name}
          to={path}
          style={{ textDecoration: "none", textAlign: "center", color: color }}
        >
          <div style={{ fontSize: iconSize }}>{icon}</div>
          <div style={iconTextStyle}>{name}</div>
        </Link>
      ))}
    </div>
  </div>
</div>

      {/* Pie Chart */}
      <div style={{ width: "100%", height: 300, marginBottom: "40px" }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
<div style={{ width: "100%", height: 300, marginBottom: "40px" }}>
  <ResponsiveContainer>
    <BarChart data={lineData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="sales" fill="#8884d8" />
      <Bar dataKey="inventory" fill="#82ca9d" />
    </BarChart>
  </ResponsiveContainer>
</div>

      {/* Line Chart */}
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={lineData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#e63946" />
            <Line type="monotone" dataKey="inventory" stroke="#2a9d8f" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
