import React, { useState, useEffect } from "react";
import "./Orders.css";
import AssignDriver from "../components/AssignDriver";
import jsPDF from "jspdf";

const itemOptions = [
  { name: "6kg Cylinder", amount: "KSh 1500" },
  { name: "13kg Cylinder", amount: "KSh 2500" },
  { name: "50kg Cylinder", amount: "KSh 7000" },
];

const Orders = ({ role, username, onPlaceOrder }) => {
  const [orders, setOrders] = useState([]);
  const [newOrderItem, setNewOrderItem] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${backendUrl}/orders`);
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, [backendUrl]);

  const getStatusClass = (status) =>
    "status-" + status.toLowerCase().replace(/\s+/g, "-");

  const generateReceipt = (order) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Smart Gas Receipt", 10, 15);

    doc.setFontSize(12);
    doc.text(`Order ID: ${order.id}`, 10, 30);
    doc.text(`Customer: ${order.customer}`, 10, 40);
    doc.text(`Item: ${order.item}`, 10, 50);
    doc.text(`Amount: ${order.amount}`, 10, 60);
    doc.text(`Status: ${order.status}`, 10, 70);
    doc.text(`Date: ${new Date().toLocaleString()}`, 10, 80);

    doc.text("Thank you for shopping with Smart Gas!", 10, 100);

    doc.save(`Receipt_Order_${order.id}.pdf`);
  };

  const filteredOrders = orders.filter((order) => {
    if (role === "admin") return true;
    if (role === "customer") return order.customerId === username;
    if (role === "driver") return order.assignedDriver === username;
    return false;
  });

  const handleAssignDriver = (orderId, driver) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, assignedDriver: driver } : order
      )
    );
  };

const handleOrderSubmit = async (e) => {
  e.preventDefault();
  if (!newOrderItem) return;

  const selectedItem = itemOptions.find((item) => item.name === newOrderItem);
  if (!selectedItem) return;

  const newOrder = {
    customerId: username,
    customer: username.charAt(0).toUpperCase() + username.slice(1),
    item: selectedItem.name,
    amount: selectedItem.amount,
    status: "Pending",
    assignedDriver: null,
  };

  setLoading(true);
  setMessage("");

try {
  const response = await fetch(`${backendUrl}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newOrder),
  });

  console.log("Response status:", response.status);
  const text = await response.text();  // 👈 read raw response text
  console.log("Raw response text:", text);

  // Then try to parse it
  const savedOrder = JSON.parse(text);
  console.log("Saved order parsed from backend:", savedOrder);

  setOrders((prevOrders) => [savedOrder, ...prevOrders]);
  setNewOrderItem("");
  setMessage("✅ Order placed successfully");

  if (onPlaceOrder) onPlaceOrder(savedOrder);
} catch (err) {
  console.error("❌ Order placement error:", err);
  setMessage("❌ Could not place order.");
} finally {
  setLoading(false);
}
};

  // Admin updates status handler
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${backendUrl}/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error("Failed to update status");

      const updatedOrder = await response.json();

      setOrders((prev) =>
        prev.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
      );
    } catch (err) {
      console.error(err);
      alert("Error updating order status");
    }
  };

  return (
    <div className="orders-page">
      <h2>Orders</h2>

      {role === "customer" && (
        <form className="order-form" onSubmit={handleOrderSubmit}>
          <h3>Place a New Order</h3>
          <label>
            Item:
            <select
              value={newOrderItem}
              onChange={(e) => setNewOrderItem(e.target.value)}
            >
              <option value="">Select</option>
              {itemOptions.map(({ name, amount }) => (
                <option key={name} value={name}>
                  {name} - {amount}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" disabled={!newOrderItem || loading}>
            {loading ? "Placing..." : "Place Order"}
          </button>
          {message && <p style={{ marginTop: "10px" }}>{message}</p>}
        </form>
      )}

      {filteredOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              {(role === "admin" || role === "driver") && <th>Customer</th>}
              <th>Item</th>
              <th>Amount</th>
              <th>Status</th>
              {role === "admin" && <th>Assign Driver</th>}
              {role === "admin" && <th>Update Status</th>}
              {(role === "admin" || role === "customer") && <th>Receipt</th>}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className={getStatusClass(order.status)}>
                <td>{order.id}</td>
                {(role === "admin" || role === "driver") && <td>{order.customer}</td>}
                <td>{order.item}</td>
                <td>{order.amount}</td>
                <td>{order.status}</td>

                {role === "admin" && (
                  <td>
                    <AssignDriver
                      orderId={order.id}
                      assignedDriver={order.assignedDriver}
                      onAssign={handleAssignDriver}
                    />
                  </td>
                )}

                {role === "admin" && (
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                )}

                {(role === "admin" || role === "customer") && (
                  <td>
                    {order.status === "Delivered" && (
                      <button onClick={() => generateReceipt(order)}>
                        Generate Receipt
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
