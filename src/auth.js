// src/auth.js

const users = {
  admin: { username: "admin", password: "admin123" },
  user: { username: "user", password: "user123" },
  driver: { username: "driver", password: "driver123" },
};

export function login(role, username, password, useSession = false) {
  const user = users[role];
  if (!user) return false;
  if (user.username === username && user.password === password) {
    if (useSession) {
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("username", username);
    } else {
      localStorage.setItem("role", role);
      localStorage.setItem("username", username);
    }
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem("role");
  localStorage.removeItem("username");
  sessionStorage.removeItem("role");
  sessionStorage.removeItem("username");
}

export function currentUserRole() {
  return sessionStorage.getItem("role") || localStorage.getItem("role");
}

export function currentUsername() {
  return sessionStorage.getItem("username") || localStorage.getItem("username");
}
