// src/auth.js

// Mock login function (called after successful login)
// If useSession is true, store role in sessionStorage, else in localStorage
export function login(role, useSession = false) {
  if (useSession) {
    sessionStorage.setItem("role", role);
  } else {
    localStorage.setItem("role", role);
  }
}

// Logout function - clear role from both storages just to be safe
export function logout() {
  localStorage.removeItem("role");
  sessionStorage.removeItem("role");
}

// Get the current user's role - check sessionStorage first, then localStorage
export function currentUserRole() {
  return sessionStorage.getItem("role") || localStorage.getItem("role");
}
