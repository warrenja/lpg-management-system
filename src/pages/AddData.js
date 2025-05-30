import React, { useState } from "react";

const AddData = () => {
  const [activeTab, setActiveTab] = useState("customer");

  // State for New Customer
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  // State for New Inventory
  const [inventorySize, setInventorySize] = useState("6kg");
  const [inventoryStatus, setInventoryStatus] = useState("Filled");
  const [inventoryLocation, setInventoryLocation] = useState("Nairobi");

  // State for New Order
  const [orderCustomer, setOrderCustomer] = useState("");
  const [orderItem, setOrderItem] = useState("6kg Cylinder");
  const [orderAmount, setOrderAmount] = useState("");
  const [orderStatus, setOrderStatus] = useState("Pending");

  // Example options for dropdowns
  const sizes = ["6kg", "13kg", "50kg"];
  const statuses = ["Filled", "Empty", "In Transit"];
  const locations = ["Nairobi", "Kisumu", "Mombasa", "Nakuru", "Eldoret"];
  const orderStatuses = ["Pending", "Shipped", "Delivered", "Cancelled", "In Transit"];

  // Dummy customers list for order dropdown
  const customers = ["David", "Sarah", "John", "Mary", "Peter"];

  // Handlers for form submission
  const handleCustomerSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim()) {
      alert("Customer name is required");
      return;
    }
    // Do your logic here to save customer
    alert(`Customer added: ${customerName}, Phone: ${customerPhone}, Email: ${customerEmail}`);
    // Clear form
    setCustomerName("");
    setCustomerPhone("");
    setCustomerEmail("");
  };

  const handleInventorySubmit = (e) => {
    e.preventDefault();
    // Do your logic here to save inventory
    alert(`Inventory added: Size ${inventorySize}, Status ${inventoryStatus}, Location ${inventoryLocation}`);
    // Clear form (or reset to defaults)
    setInventorySize("6kg");
    setInventoryStatus("Filled");
    setInventoryLocation("Nairobi");
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!orderCustomer) {
      alert("Select a customer");
      return;
    }
    if (!orderAmount || isNaN(orderAmount)) {
      alert("Enter a valid order amount");
      return;
    }
    // Do your logic here to save order
    alert(`Order added: Customer ${orderCustomer}, Item ${orderItem}, Amount KSh ${orderAmount}, Status ${orderStatus}`);
    // Clear form
    setOrderCustomer("");
    setOrderItem("6kg Cylinder");
    setOrderAmount("");
    setOrderStatus("Pending");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Add New Data</h2>
      <div style={{ marginBottom: "20px" }}>
        <button
          style={activeTab === "customer" ? activeBtnStyle : btnStyle}
          onClick={() => setActiveTab("customer")}
        >
          New Customer
        </button>
        <button
          style={activeTab === "inventory" ? activeBtnStyle : btnStyle}
          onClick={() => setActiveTab("inventory")}
        >
          New Inventory
        </button>
        <button
          style={activeTab === "order" ? activeBtnStyle : btnStyle}
          onClick={() => setActiveTab("order")}
        >
          New Order
        </button>
      </div>

      {activeTab === "customer" && (
        <form onSubmit={handleCustomerSubmit}>
          <div style={formGroup}>
            <label>Name:</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>
          <div style={formGroup}>
            <label>Phone:</label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
          </div>
          <div style={formGroup}>
            <label>Email:</label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
          </div>
          <button type="submit" style={submitBtn}>
            Add Customer
          </button>
        </form>
      )}

      {activeTab === "inventory" && (
        <form onSubmit={handleInventorySubmit}>
          <div style={formGroup}>
            <label>Size:</label>
            <select
              value={inventorySize}
              onChange={(e) => setInventorySize(e.target.value)}
            >
              {sizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div style={formGroup}>
            <label>Status:</label>
            <select
              value={inventoryStatus}
              onChange={(e) => setInventoryStatus(e.target.value)}
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div style={formGroup}>
            <label>Location:</label>
            <select
              value={inventoryLocation}
              onChange={(e) => setInventoryLocation(e.target.value)}
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" style={submitBtn}>
            Add Inventory
          </button>
        </form>
      )}

      {activeTab === "order" && (
        <form onSubmit={handleOrderSubmit}>
          <div style={formGroup}>
            <label>Customer:</label>
            <select
              value={orderCustomer}
              onChange={(e) => setOrderCustomer(e.target.value)}
              required
            >
              <option value="">-- Select Customer --</option>
              {customers.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div style={formGroup}>
            <label>Item:</label>
            <select
              value={orderItem}
              onChange={(e) => setOrderItem(e.target.value)}
            >
              {sizes.map((s) => (
                <option key={s} value={`${s} Cylinder`}>
                  {s} Cylinder
                </option>
              ))}
            </select>
          </div>
          <div style={formGroup}>
            <label>Amount (KSh):</label>
            <input
              type="number"
              min="0"
              value={orderAmount}
              onChange={(e) => setOrderAmount(e.target.value)}
              required
            />
          </div>
          <div style={formGroup}>
            <label>Status:</label>
            <select
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
            >
              {orderStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" style={submitBtn}>
            Add Order
          </button>
        </form>
      )}
    </div>
  );
};

const btnStyle = {
  padding: "10px 15px",
  marginRight: "10px",
  backgroundColor: "#eee",
  border: "1px solid #ccc",
  cursor: "pointer",
};

const activeBtnStyle = {
  ...btnStyle,
  backgroundColor: "#1976d2",
  color: "white",
  fontWeight: "bold",
};

const formGroup = {
  marginBottom: "15px",
  display: "flex",
  flexDirection: "column",
};

const submitBtn = {
  backgroundColor: "#1976d2",
  color: "white",
  border: "none",
  padding: "10px 20px",
  cursor: "pointer",
  borderRadius: "4px",
};

export default AddData;
