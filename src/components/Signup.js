// src/components/Signup.js
import React, { useState } from "react";

export default function Signup({ onSignupSuccess }) {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("customer"); // default to customer
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim()) {
      setError("Username is required");
      return;
    }
    if (!role) {
      setError("Please select a role");
      return;
    }
    setError(null);
    // Simulate signup success:
    onSignupSuccess({ username: username.trim(), role });
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto", padding: 20, backgroundColor: "#fff", borderRadius: 8 }}>
      <h2>Create Account</h2>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", padding: 8, margin: "8px 0" }}
          placeholder="Enter username"
        />
      </label>

      <label>
        Role:
        <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: "100%", padding: 8, margin: "8px 0" }}>
          <option value="customer">Customer</option>
          <option value="driver">Driver</option>
          <option value="admin">Admin</option>
        </select>
      </label>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" style={{ padding: "10px 20px", marginTop: 10 }}>
        Sign Up
      </button>
    </form>
  );
}
