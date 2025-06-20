// src/pages/Deliveries.js
import React, { useEffect, useState } from "react";
import "./Deliveries.css";

export default function Deliveries({ role, username }) {
  const [deliveries, setDeliveries] = useState([]);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await fetch(`${backendUrl}/orders`);
        const data = await response.json();

        const filtered = data.filter(
          (order) =>
            order.status !== "Pending" &&
            order.assignedDriver &&
            (role === "admin" || order.assignedDriver === username)
        );

        setDeliveries(filtered);
      } catch (err) {
        console.error("Failed to load deliveries", err);
      }
    };

    fetchDeliveries();
  }, [backendUrl, role, username]);

  return (
    <div className="deliveries-container">
      <h2>Deliveries</h2>
      {deliveries.length === 0 ? (
        <p>No deliveries assigned yet.</p>
      ) : (
        <table className="delivery-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Item</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Driver</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.customer}</td>
                <td>{d.item}</td>
                <td>{d.amount}</td>
                <td>{d.status}</td>
                <td>{d.assignedDriver}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
