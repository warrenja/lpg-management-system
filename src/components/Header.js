// src/components/Header.js
import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaUserCircle, FaBell } from "react-icons/fa";
import "./Header.css"; // Make sure .notification-badge exists in this CSS file

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
  right: 0,
  top: 60,
  backgroundColor: "white",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  borderRadius: "6px",
  width: "160px",
  zIndex: 1300,
};

const dropdownItemStyle = {
  padding: "10px 15px",
  cursor: "pointer",
  borderBottom: "1px solid #eee",
  fontWeight: "600",
  color: "#000",
  backgroundColor: "#fff",
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function Header({
  username,
  user,
  onToggleSidebar,
  onSignupClick,
  onLogout,
  newOrderNotifications = 0,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

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
          style={{ cursor: "pointer", fontSize: "24px", marginRight: 20 }}
          title="Toggle Sidebar"
        />
        <span>
          Welcome to Smart Gas — {getGreeting()} {username}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
        {/* Notification Bell */}
        <div style={{ position: "relative", marginRight: 20 }}>
          <FaBell style={{ fontSize: "24px", cursor: "pointer" }} title="Notifications" />
          {newOrderNotifications > 0 && (
            <span className="notification-badge">{newOrderNotifications}</span>
          )}
        </div>

        {/* Profile Icon and Dropdown */}
        <div style={{ position: "relative" }} ref={dropdownRef}>
          <FaUserCircle
            style={{ fontSize: "30px", cursor: "pointer" }}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            title="Profile"
          />
          {dropdownOpen && (
            <div style={profileDropdownStyle}>
              {!user && (
                <>
                  <div style={dropdownItemStyle} onClick={onSignupClick}>
                    Sign Up
                  </div>
                  <div
                    style={dropdownItemStyle}
                    onClick={() => (window.location.href = "/login")}
                  >
                    Login
                  </div>
                </>
              )}
              {user && (
                <div style={dropdownItemStyle} onClick={onLogout}>
                  Logout
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
