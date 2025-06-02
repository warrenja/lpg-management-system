import React, { useState } from "react";

export default function Signup({ onSignupSuccess }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    alert(`Account created for ${formData.username}!`);
    onSignupSuccess(formData.username);
    setFormData({ username: "", email: "", password: "", confirmPassword: "" });
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "20px auto" }}>
      <h2>Create an Account</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>Username</label>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          autoFocus
        />
      </div>
      <div>
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" style={{ marginTop: 10 }}>
        Sign Up
      </button>
    </form>
  );
}
