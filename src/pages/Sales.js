// src/pages/Sales.js
import React, { useState, useEffect } from "react";
import "./Sales.css";

export default function Sales() {
  const [salesData, setSalesData] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await fetch(`${backendUrl}/sales`);
        if (!res.ok) throw new Error("Failed to fetch sales");
        const data = await res.json();
        setSalesData(data);
      } catch (err) {
        console.error("❌ Error fetching sales:", err);
      }
    };

    fetchSales();
  }, [backendUrl]);

  return (
    <div className="sales-container">
      <h2>Sales Records</h2>
      <table className="sales-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Item</th>
            <th>Amount (KSh)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map(({ id, customer, item, amount, date }, index) => (
            <tr key={id || index}>
              <td>{index + 1}</td>
              <td>{customer}</td>
              <td>{item}</td>
              <td>{amount}</td>
              <td>{new Date(date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
