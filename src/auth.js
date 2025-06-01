// src/auth.js

// Mock login function (called after successful login)
// If useSession is true, store role and username in sessionStorage, else in localStorage
export function login(role, username, useSession = false) {
  if (useSession) {
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("username", username);
  } else {
    localStorage.setItem("role", role);
    localStorage.setItem("username", username);
  }
}

// Logout function - clear role and username from both storages just to be safe
export function logout() {
  localStorage.removeItem("role");
  localStorage.removeItem("username");
  sessionStorage.removeItem("role");
  sessionStorage.removeItem("username");
}

// Get the current user's role - check sessionStorage first, then localStorage
export function currentUserRole() {
  return sessionStorage.getItem("role") || localStorage.getItem("role");
}

// Get the current user's username - check sessionStorage first, then localStorage
export function currentUsername() {
  return sessionStorage.getItem("username") || localStorage.getItem("username");
}
