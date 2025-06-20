import React, { useEffect, useState } from "react";
import "./Deliveries.css";

export default function Deliveries({ role, username }) {
  const [deliveries, setDeliveries] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const res = await fetch(`${backendUrl}/deliveries`);
        const data = await res.json();

        const filtered = data.filter(
          (d) => role === "admin" || d.driver === username
        );

        setDeliveries(filtered);
      } catch (err) {
        console.error("Failed to fetch deliveries", err);
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
              <th>Delivery ID</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Item</th>
              <th>Status</th>
              <th>Driver</th>
              <th>Assigned At</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((d) => (
              <tr key={d._id}>
                <td>{d._id}</td>
                <td>{d.orderId}</td>
                <td>{d.customer}</td>
                <td>{d.item}</td>
                <td>{d.status}</td>
                <td>{d.driver}</td>
                <td>{new Date(d.assignedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
