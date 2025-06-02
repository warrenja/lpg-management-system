import React, { useState } from "react";
import "./Orders.css";
import AssignDriver from "../components/AssignDriver";
import jsPDF from "jspdf"; // 👉 NEW: Import jsPDF

const initialOrders = [
  { id: 1, customerId: "david", customer: "David", item: "6kg Cylinder", amount: "KSh 1500", status: "Delivered", assignedDriver: "driver1" },
  { id: 2, customerId: "sarah", customer: "Sarah", item: "13kg Cylinder", amount: "KSh 2500", status: "Pending", assignedDriver: null },
  { id: 3, customerId: "john", customer: "John", item: "50kg Cylinder", amount: "KSh 7000", status: "Shipped", assignedDriver: "driver2" },
  { id: 4, customerId: "mary", customer: "Mary", item: "13kg Cylinder", amount: "KSh 2500", status: "Cancelled", assignedDriver: null },
  { id: 5, customerId: "peter", customer: "Peter", item: "6kg Cylinder", amount: "KSh 1500", status: "In Transit", assignedDriver: "driver1" },
  { id: 6, customerId: "grace", customer: "Grace", item: "13kg Cylinder", amount: "KSh 2500", status: "Delivered", assignedDriver: null },
  { id: 7, customerId: "paul", customer: "Paul", item: "50kg Cylinder", amount: "KSh 7000", status: "Pending", assignedDriver: "driver3" },
  { id: 8, customerId: "esther", customer: "Esther", item: "6kg Cylinder", amount: "KSh 1500", status: "Shipped", assignedDriver: null },
  { id: 9, customerId: "james", customer: "James", item: "13kg Cylinder", amount: "KSh 2500", status: "Delivered", assignedDriver: "driver2" },
  { id: 10, customerId: "ruth", customer: "Ruth", item: "50kg Cylinder", amount: "KSh 7000", status: "Cancelled", assignedDriver: null },
];

const itemOptions = [
  { name: "6kg Cylinder", amount: "KSh 1500" },
  { name: "13kg Cylinder", amount: "KSh 2500" },
  { name: "50kg Cylinder", amount: "KSh 7000" },
];

const Orders = ({ role, username }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [newOrderItem, setNewOrderItem] = useState("");

  // 👉 Receipt Generator Function
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

  const getStatusClass = (status) =>
    "status-" + status.toLowerCase().replace(/\s+/g, "-");

  const filteredOrders = orders.filter((order) => {
    if (role === "admin") return true;
    if (role === "customer") return order.customerId === username;
    if (role === "driver") return order.assignedDriver === username;
    return false;
  });

  const handleAssignDriver = (orderId, driver) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, assignedDriver: driver || null } : order
      )
    );
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!newOrderItem) return;

    const selectedItem = itemOptions.find((item) => item.name === newOrderItem);
    if (!selectedItem) return;

    const nextId = orders.length > 0 ? Math.max(...orders.map((o) => o.id)) + 1 : 1;
    const customerName = username.charAt(0).toUpperCase() + username.slice(1);

    const newOrder = {
      id: nextId,
      customerId: username,
      customer: customerName,
      item: selectedItem.name,
      amount: selectedItem.amount,
      status: "Pending",
      assignedDriver: null,
    };

    setOrders([newOrder, ...orders]);
    setNewOrderItem("");
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
          <button type="submit" disabled={!newOrderItem}>
            Place Order
          </button>
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
              {(role === "admin" || role === "customer") && <th>Receipt</th>}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(
              (order) => (
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
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
