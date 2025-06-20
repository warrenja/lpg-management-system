// src/pages/Deliveries.js
import React, { useState, useEffect } from "react";
import "./Deliveries.css";

export default function Deliveries({ role, username }) {
  const [deliveries, setDeliveries] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const res = await fetch(`${backendUrl}/deliveries`);
        if (!res.ok) throw new Error("Failed to fetch deliveries");
        const data = await res.json();
        setDeliveries(data);
      } catch (err) {
        console.error("❌ Error loading deliveries:", err);
      }
    };

    fetchDeliveries();
  }, [backendUrl]);

  // Filter based on user role
  const filtered = deliveries.filter((d) => {
    if (role === "admin") return true;
    if (role === "driver") return d.driverId === username;
    if (role === "customer") return d.customerId === username;
    return false;
  });

  return (
    <div className="deliveries-container">
      <h2>Deliveries</h2>

      {filtered.length === 0 ? (
        <p>No deliveries found.</p>
      ) : (
        <table className="delivery-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Driver</th>
              <th>Status</th>
              <th>Scheduled</th>
              <th>Delivered</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d, i) => (
              <tr key={i}>
                <td>{d.orderId}</td>
                <td>{d.customerId}</td>
                <td>{d.driverId || "Unassigned"}</td>
                <td>{d.status}</td>
                <td>{new Date(d.scheduledAt).toLocaleString()}</td>
                <td>
                  {d.deliveredAt
                    ? new Date(d.deliveredAt).toLocaleString()
                    : "Not yet"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
