import React, { useEffect, useState } from "react";

const Receipts = () => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/receipts`);
        if (!response.ok) {
          throw new Error(`Failed to fetch receipts: ${response.statusText}`);
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
  }, [BASE_URL]);

  if (loading) return <p>Loading receipts...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h1>Receipts</h1>
      {receipts.length === 0 ? (
        <p>No receipts found.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {receipts.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.orderId}</td>
                <td>{r.customer}</td>
                <td>${r.amount}</td>
                <td>{r.paymentMethod}</td>
                <td>{new Date(r.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Receipts;
