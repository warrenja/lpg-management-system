// src/pages/Login.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../auth";

export default function Login() {
  const [selectedRole, setSelectedRole] = useState("user");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username.trim()) {
      alert("Please enter your username");
      return;
    }
    login(selectedRole, username.trim(), true);  // store in sessionStorage
    navigate("/");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Select Role and Login</h2>
      <div style={{ marginBottom: 10 }}>
        <label>
          Username:{" "}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </label>
      </div>
      <div style={{ marginBottom: 20 }}>
        <label>
          Role:{" "}
          <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="driver">Driver</option>
          </select>
        </label>
      </div>
      <button onClick={handleLogin} style={{ marginLeft: 10 }}>
        Login
      </button>
    </div>
  );
}
