// src/pages/Login.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../auth";

export default function Login() {
  const [selectedRole, setSelectedRole] = useState("user");
  const navigate = useNavigate();

  const handleLogin = () => {
    login(selectedRole);
    navigate("/");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Select Role and Login</h2>
      <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
        <option value="admin">Admin</option>
        <option value="user">User</option>
        <option value="driver">Driver</option>
      </select>
      <button onClick={handleLogin} style={{ marginLeft: 10 }}>
        Login
      </button>
    </div>
  );
}
