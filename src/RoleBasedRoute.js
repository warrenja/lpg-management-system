// src/RoleBasedRoute.js

import React from "react";
import { Navigate } from "react-router-dom";
import { currentUserRole } from "./auth";

export default function RoleBasedRoute({ allowedRoles, children }) {
  const role = currentUserRole();

  if (allowedRoles.includes(role)) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
}
