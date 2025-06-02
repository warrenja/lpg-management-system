import React, { useState } from "react";
import "./Orders.css";
import AssignDriver from "../components/AssignDriver";

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
  const [newOrder, setNewOrder] = useState({ item: "", amount: "" });

  const getStatusClass = (status) => {
    return "status-" + status.toLowerCase().replace(" ", "-");
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
        order.id === orderId ? { ...order, assignedDriver: driver || null } : order
      )
    );
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!newOrder.item) return;

    const selected = itemOptions.find((opt) => opt.name === newOrder.item);
    const nextId = orders.length ? Math.max(...orders.map((o) => o.id)) + 1 : 1;
    const customerName = username.charAt(0).toUpperCase() + username.slice(1);

    const order = {
      id: nextId,
      customerId: username,
      customer: customerName,
      item: selected.name,
      amount: selected.amount,
      status: "Pending",
      assignedDriver: null,
    };

    setOrders([order, ...orders]);
    setNewOrder({ item: "", amount: "" });
  };

  return (
    <div className="orders-page">
      <h2>Orders</h2>

      {/* Customer Form */}
      {role === "customer" && (
        <form className="order-form" onSubmit={handleOrderSubmit}>
          <h3>Place a New Order</h3>
          <label>
            Item:
            <select
              value={newOrder.item}
              onChange={(e) => setNewOrder({ ...newOrder, item: e.target.value })}
            >
              <option value="">Select</option>
              {itemOptions.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name} - {item.amount}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Place Order</button>
        </form>
      )}

      {/* Orders Table */}
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
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(({ id, customer, item, amount, status, assignedDriver }) => (
              <tr key={id} className={getStatusClass(status)}>
                <td>{id}</td>
                {(role === "admin" || role === "driver") && <td>{customer}</td>}
                <td>{item}</td>
                <td>{amount}</td>
                <td>{status}</td>
                {role === "admin" && (
                  <td>
                    <AssignDriver
                      orderId={id}
                      assignedDriver={assignedDriver}
                      onAssign={handleAssignDriver}
                    />
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
