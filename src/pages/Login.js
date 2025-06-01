// src/pages/Login.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../auth";

export default function Login() {
  const [role, setRole] = useState("user");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const success = login(role, username, password, true); // store in sessionStorage
    if (success) {
      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="admin">Admin</option>
        <option value="user">User</option>
        <option value="driver">Driver</option>
      </select>
      <br />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginTop: 10, width: "200px" }}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginTop: 10, width: "200px" }}
      />
      <br />
      <button onClick={handleLogin} style={{ marginTop: 10 }}>
        Login
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
