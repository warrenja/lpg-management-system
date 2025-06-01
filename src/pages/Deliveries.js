// src/pages/Deliveries.js
import React, { useState } from "react";
import "./Deliveries.css";

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [form, setForm] = useState({
    customer: "",
    address: "",
    cylinderSize: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDeliveries([...deliveries, form]);
    setForm({ customer: "", address: "", cylinderSize: "", status: "Pending" });
  };

  return (
    <div className="deliveries-container">
      <h2>Deliveries</h2>

      <form onSubmit={handleSubmit} className="delivery-form">
        <input
          type="text"
          name="customer"
          placeholder="Customer Name"
          value={form.customer}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Delivery Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cylinderSize"
          placeholder="Cylinder Size (e.g. 6kg, 13kg)"
          value={form.cylinderSize}
          onChange={handleChange}
          required
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option>Pending</option>
          <option>Delivered</option>
          <option>In Transit</option>
        </select>
        <button type="submit">Add Delivery</button>
      </form>

      <table className="delivery-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Address</th>
            <th>Cylinder Size</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((d, i) => (
            <tr key={i}>
              <td>{d.customer}</td>
              <td>{d.address}</td>
              <td>{d.cylinderSize}</td>
              <td>{d.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
