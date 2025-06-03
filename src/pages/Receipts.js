import React, { useState, useEffect } from "react";

const mockUser = {
  id: 1,
  role: "admin", // Change to "customer" to test role-based access
  name: "Admin User",
};

export default function Receipts() {
  const [receipts, setReceipts] = useState([]);
  const [formData, setFormData] = useState({
    orderId: "",
    customer: "",
    amount: "",
    paymentMethod: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch receipts from backend
  useEffect(() => {
    fetch("https://your-backend-url/receipts") // Replace with your backend URL
      .then((res) => res.json())
      .then(setReceipts)
      .catch((err) => setError("Failed to load receipts"));
  }, []);

  // Handle form input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Handle receipt creation form submit
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("https://your-backend-url/receipts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create receipt");
      }

      const newReceipt = await res.json();
      setReceipts((prev) => [newReceipt, ...prev]);
      setFormData({ orderId: "", customer: "", amount: "", paymentMethod: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "1rem", maxWidth: 600, margin: "auto" }}>
      <h2>Receipts</h2>

      {/* Show receipt creation form only for admin */}
      {mockUser.role === "admin" && (
        <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
          <h3>Create Receipt</h3>
          <div>
            <label>
              Order ID:
              <input
                type="text"
                name="orderId"
                value={formData.orderId}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Customer:
              <input
                type="text"
                name="customer"
                value={formData.customer}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Amount:
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
              />
            </label>
          </div>
          <div>
            <label>
              Payment Method:
              <input
                type="text"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Receipt"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      )}

      <h3>All Receipts</h3>
      {error && !loading && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {receipts.map((r) => (
          <li key={r.id} style={{ marginBottom: "1rem" }}>
            <strong>Receipt #{r.id}</strong> — Order: {r.orderId}, Customer:{" "}
            {r.customer}, Amount: ${r.amount}, Payment: {r.paymentMethod}, Date:{" "}
            {new Date(r.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
