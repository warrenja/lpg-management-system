import React, { useEffect, useState } from "react";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Receipts = ({ role, username }) => {
  const [receipts, setReceipts] = useState([]);
  const [newReceipt, setNewReceipt] = useState({
    orderId: "",
    customer: "",
    amount: "",
    paymentMethod: "Cash",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch receipts on mount
  useEffect(() => {
    setLoading(true);
    fetch(`${backendUrl}/receipts`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch receipts");
        return res.json();
      })
      .then((data) => {
        // If user is customer, filter their receipts only
        if (role === "customer") {
          setReceipts(data.filter((r) => r.customer === username));
        } else {
          setReceipts(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [role, username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReceipt((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    newReceipt.orderId.trim() &&
    newReceipt.customer.trim() &&
    !isNaN(parseFloat(newReceipt.amount)) &&
    parseFloat(newReceipt.amount) > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      setError("Please fill out all fields correctly.");
      return;
    }

    setError("");
    fetch(`${backendUrl}/receipts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReceipt),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add receipt");
        return res.json();
      })
      .then((data) => {
        setReceipts((prev) => [data, ...prev]);
        setNewReceipt({ orderId: "", customer: "", amount: "", paymentMethod: "Cash" });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="receipts-page">
      <h2>Receipts</h2>

      <form className="receipt-form" onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          name="orderId"
          placeholder="Order ID"
          value={newReceipt.orderId}
          onChange={handleChange}
          required
        />
        <input
          name="customer"
          placeholder="Customer"
          value={newReceipt.customer}
          onChange={handleChange}
          required
          disabled={role === "customer"} // customers cannot change customer field
        />
        <input
          name="amount"
          placeholder="Amount"
          value={newReceipt.amount}
          onChange={handleChange}
          required
          type="number"
          min="0"
          step="0.01"
        />
        <select name="paymentMethod" value={newReceipt.paymentMethod} onChange={handleChange}>
          <option value="Cash">Cash</option>
          <option value="MPesa">MPesa</option>
          <option value="Card">Card</option>
        </select>
        <button type="submit" disabled={!isFormValid}>
          Add Receipt
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading ? (
        <p>Loading receipts...</p>
      ) : receipts.length === 0 ? (
        <p>No receipts found.</p>
      ) : (
        <table className="receipts-table" border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {receipts.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.orderId}</td>
                <td>{r.customer}</td>
                <td>${parseFloat(r.amount).toFixed(2)}</td>
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
