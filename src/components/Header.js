// src/components/Header.js

import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import "./Header.css";
import { currentUsername } from "../auth";

const headerStyle = {
  height: "60px",
  backgroundColor: "#1976d2",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 20px",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  fontWeight: "600",
  fontSize: "20px",
  zIndex: 1200,
  userSelect: "none",
};

const profileDropdownStyle = {
  position: "absolute",
  right: 20,
  top: 60,
  backgroundColor: "white",
  boxShadow: "0 2px 5px rgb(245, 239, 239)",
  borderRadius: "6px",
  width: "150px",
  zIndex: 1300,
};

const dropdownItemStyle = {
  padding: "10px 15px",
  cursor: "pointer",
  borderBottom: "1px solid #eee",
  fontWeight: "600",
  color: "#000",
};

function getGreeting() {
  const now = new Date();
  const hour = now.getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function Header({ onToggleSidebar }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const username = currentUsername() || "Guest";

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header style={headerStyle}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <FaBars
          onClick={onToggleSidebar}
          style={{ cursor: "pointer", fontSize: "24px", marginRight: 20, color: "#fff" }}
          title="Toggle Sidebar"
        />
        <span>
          Welcome to Smart Gas — {getGreeting()} {username}
        </span>
      </div>
      <div style={{ position: "relative" }} ref={dropdownRef}>
        <FaUserCircle
          style={{ fontSize: "30px", cursor: "pointer", color: "#fff" }}
          onClick={() => setDropdownOpen(!dropdownOpen)}
          title="Profile"
        />
        {dropdownOpen && (
          <div style={profileDropdownStyle}>
            <div style={dropdownItemStyle} onClick={() => alert("Profile clicked")}>
              Profile
            </div>
            <div style={dropdownItemStyle} onClick={() => alert("Logout clicked")}>
              Logout
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
