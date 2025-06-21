import React, { useEffect, useState } from "react";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";

const Reports = () => {
  const [reports, setReports] = useState(null);
  const [range, setRange] = useState("all");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch(`${BASE_URL}/reports?range=${range}`);
        if (!res.ok) throw new Error("Failed to fetch reports");
        const data = await res.json();
        setReports(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchReports();
  }, [range]);

  const handleDownloadCSV = () => {
    if (!reports) return;
    let csv = "Status,Order ID,Customer,Item,Amount,Date,Time\n";

    Object.entries(reports.groupedByStatus).forEach(([status, orders]) => {
      orders.forEach((order) => {
        csv += `${status},${order.id},${order.customer},${order.item},${order.amount},${order.date},${order.time}\n`;
      });
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `report_${range}_${new Date().toISOString()}.csv`;
    link.click();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Detailed Order Reports</h1>

      <div style={{ marginBottom: "20px" }}>
        <label>Time Range: </label>
        <select value={range} onChange={(e) => setRange(e.target.value)}>
          <option value="all">All Time</option>
          <option value="weekly">This Week</option>
          <option value="monthly">This Month</option>
          <option value="yearly">This Year</option>
        </select>
        <button onClick={handleDownloadCSV} style={{ marginLeft: "20px" }}>
          📥 Download CSV
        </button>
      </div>

      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : !reports ? (
        <p>Loading reports...</p>
      ) : (
        <div>
          <p>
            <strong>Total Orders:</strong> {reports.totalOrders}
          </p>
          {Object.entries(reports.groupedByStatus).map(([status, orders]) => (
            <div key={status} style={{ marginBottom: "30px" }}>
              <h2>{status} Orders ({orders.length})</h2>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  boxShadow: "0 0 10px rgba(0,0,0,0.05)",
                }}
              >
                <thead style={{ background: "#f8f8f8" }}>
                  <tr>
                    <th style={th}>Order ID</th>
                    <th style={th}>Customer</th>
                    <th style={th}>Item</th>
                    <th style={th}>Amount</th>
                    <th style={th}>Date</th>
                    <th style={th}>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td style={td}>{order.id}</td>
                      <td style={td}>{order.customer}</td>
                      <td style={td}>{order.item}</td>
                      <td style={td}>{order.amount}</td>
                      <td style={td}>{order.date}</td>
                      <td style={td}>{order.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const th = {
  padding: "10px",
  textAlign: "left",
  borderBottom: "2px solid #ccc",
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};

export default Reports;
