import React, { useEffect, useState } from "react";

const Receipts = () => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/receipts`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch receipts");
        return res.json();
      })
      .then((data) => {
        setReceipts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [BASE_URL]);

  if (loading) return <p>Loading receipts...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

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
