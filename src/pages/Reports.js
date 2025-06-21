import React, { useEffect, useState } from "react";

const Reports = () => {
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  const BASE_URL = process.env.REACT_APP_BACKEND_URL || "https://your-backend.onrender.com";

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await fetch(`${BASE_URL}/reports`);
        const data = await res.json();
        setReport(data);
      } catch (err) {
        setError("Failed to load report.");
      }
    };

    fetchReport();
  }, [BASE_URL]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!report) return <p>Loading report...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Order Report Summary</h1>
      <ul>
        <li><strong>Total Orders:</strong> {report.totalOrders}</li>
        <li><strong>Total Sales:</strong> Ksh {report.totalSales}</li>
        <li><strong>Status Breakdown:</strong>
          <ul>
            {Object.entries(report.statusCount).map(([status, count]) => (
              <li key={status}>{status}: {count}</li>
            ))}
          </ul>
        </li>
        <li><strong>Most Ordered Items:</strong>
          <ul>
            {Object.entries(report.itemCount).map(([item, count]) => (
              <li key={item}>{item}: {count}</li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Reports;
