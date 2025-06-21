// src/pages/Reports.js
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Reports = () => {
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const fetchReport = async () => {
    try {
      const url = new URL(`${backendUrl}/reports`);
      if (from) url.searchParams.append("from", from);
      if (to) url.searchParams.append("to", to);

      const response = await fetch(url);
      const data = await response.json();
      setReport(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch reports");
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("SmartGas Report", 14, 15);
    doc.setFontSize(12);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 25);
    doc.text(`Total Orders: ${report.totalOrders}`, 14, 35);
    doc.text(`Total Revenue: KSh ${report.totalRevenue}`, 14, 45);

    let y = 55;

    for (const [status, orders] of Object.entries(report.groupedByStatus)) {
      doc.text(`${status} Orders`, 14, y);
      y += 5;

      const tableData = orders.map((o) => [
        o.id,
        o.customer,
        o.item,
        o.amount,
        o.date,
        o.time,
      ]);

      doc.autoTable({
        head: [["ID", "Customer", "Item", "Amount", "Date", "Time"]],
        body: tableData,
        startY: y,
        styles: { fontSize: 9 },
        margin: { top: 10, left: 14, right: 14 },
      });

      y = doc.lastAutoTable.finalY + 10;
    }

    doc.save(`SmartGas_Report_${new Date().toISOString().split("T")[0]}.pdf`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Reports</h1>

      <div style={{ marginBottom: "20px" }}>
        <label>
          From:{" "}
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </label>
        <label style={{ marginLeft: "20px" }}>
          To:{" "}
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </label>
        <button onClick={fetchReport} style={{ marginLeft: "20px" }}>
          🔄 Load Report
        </button>
        <button onClick={handlePDF} disabled={!report} style={{ marginLeft: "10px" }}>
          ⬇ Download PDF
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {report && (
        <>
          <p>Total Orders: {report.totalOrders}</p>
          <p>Total Revenue: KSh {report.totalRevenue}</p>

          {Object.entries(report.groupedByStatus).map(([status, orders]) => (
            <div key={status} style={{ marginBottom: "30px" }}>
              <h3>{status} Orders</h3>
              <table border="1" cellPadding="6" cellSpacing="0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Item</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.item}</td>
                      <td>{order.amount}</td>
                      <td>{order.date}</td>
                      <td>{order.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Reports;
