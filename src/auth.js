// src/auth.js

// List of valid users
const users = {
  admin: { username: "admin", password: "admin123" },
  user: { username: "user", password: "user123" },
  driver: { username: "driver", password: "driver123" },
};

// Login function with session option
export function login(role, username, password, useSession = false) {
  const validUser = users[role];

  if (!validUser || validUser.username !== username || validUser.password !== password) {
    return false; // login failed
  }

  // Store role and username in sessionStorage
  const storage = useSession ? sessionStorage : localStorage;
  storage.setItem("role", role);
  storage.setItem("username", username);

  return true;
}

// Logout function
export function logout() {
  sessionStorage.removeItem("role");
  sessionStorage.removeItem("username");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
}

// Get current user's role
export function currentUserRole() {
  return sessionStorage.getItem("role") || localStorage.getItem("role");
}

// Get current username
export function currentUsername() {
  return sessionStorage.getItem("username") || localStorage.getItem("username");
}
