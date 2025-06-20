import React, { useEffect, useState } from "react";

const Receipts = () => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await fetch("/receipts");
        if (!response.ok) {
          throw new Error("Failed to fetch receipts");
        }
        const data = await response.json();
        setReceipts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReceipts();
  }, []);

  if (loading) return <p>Loading receipts...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Receipts & Reports</h1>
      {receipts.length === 0 ? (
        <p>No receipts found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <thead style={{ backgroundColor: "#f8f8f8" }}>
            <tr>
              <th style={th}>Receipt ID</th>
              <th style={th}>Order ID</th>
              <th style={th}>Customer</th>
              <th style={th}>Total (Ksh)</th>
              <th style={th}>Date</th>
            </tr>
          </thead>
          <tbody>
            {receipts.map((r) => (
              <tr key={r._id}>
                <td style={td}>{r._id}</td>
                <td style={td}>{r.orderId}</td>
                <td style={td}>{r.customerName}</td>
                <td style={td}>Ksh {r.totalAmount}</td>
                <td style={td}>
                  {new Date(r.dateGenerated).toLocaleDateString()}{" "}
                  {new Date(r.dateGenerated).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default Receipts;
