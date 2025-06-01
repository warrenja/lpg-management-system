import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaClipboardList,
  FaBoxes,
  FaCashRegister,
  FaChartBar,
  FaPlus,
} from "react-icons/fa";
import "./Sidebar.css";

const sidebarItems = [
  { name: "Home", path: "/", icon: <FaHome /> },
  { name: "Customers", path: "/customers", icon: <FaUsers /> },
  { name: "Orders", path: "/orders", icon: <FaClipboardList />, color: "#6a1b9a" },
  { name: "Inventory", path: "/inventory", icon: <FaBoxes /> },
  { name: "Sales", path: "/sales", icon: <FaCashRegister /> },
  { name: "Reports", path: "/reports", icon: <FaChartBar /> },
  { name: "Deliveries", path: "/deliveries", icon: <FaClipboardList />, color: "#6a1b9a" },
  { name: "Add Data", path: "/add-data", icon: <FaPlus />, color: "#8e44ad" },
];

export default function Sidebar({ isOpen }) {
  const location = useLocation();

  return (
    <nav
      className={`sidebar ${isOpen ? "expanded" : "collapsed"}`}
      aria-label="Sidebar Navigation"
    >
      {sidebarItems.map(({ name, path, icon }) => {
        const isActive = location.pathname === path;
        return (
          <Link
            key={name}
            to={path}
            className={`sidebar-link ${isActive ? "active" : ""}`}
            style={{
              fontSize: isOpen ? "18px" : "22px",
              justifyContent: isOpen ? "flex-start" : "center",
              paddingLeft: isOpen ? "20px" : "0",
              color: "white", // Ensure font is pure white
            }}
            title={name}
          >
            <span
              className="sidebar-icon"
              style={{
                fontSize: isOpen ? "24px" : "28px",
                marginRight: isOpen ? 15 : 0,
              }}
            >
              {icon}
            </span>
            {isOpen && <span>{name}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
