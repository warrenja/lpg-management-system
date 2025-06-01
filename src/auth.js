// src/auth.js

// Mock login function (called after successful login)
export function login(role) {
  localStorage.setItem("role", role);
}

// Logout function
export function logout() {
  localStorage.removeItem("role");
}

// Get the current user's role
export function currentUserRole() {
  return localStorage.getItem("role");
}
