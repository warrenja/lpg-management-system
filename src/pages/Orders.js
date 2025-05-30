import React from "react";
import "./Orders.css";

const orders = [
  { id: 1, customer: "David", item: "6kg Cylinder", amount: "KSh 1500", status: "Delivered" },
  { id: 2, customer: "Sarah", item: "13kg Cylinder", amount: "KSh 2500", status: "Pending" },
  { id: 3, customer: "John", item: "50kg Cylinder", amount: "KSh 7000", status: "Shipped" },
  { id: 4, customer: "Mary", item: "13kg Cylinder", amount: "KSh 2500", status: "Cancelled" },
  { id: 5, customer: "Peter", item: "6kg Cylinder", amount: "KSh 1500", status: "In Transit" },
  { id: 6, customer: "Grace", item: "13kg Cylinder", amount: "KSh 2500", status: "Delivered" },
  { id: 7, customer: "Paul", item: "50kg Cylinder", amount: "KSh 7000", status: "Pending" },
  { id: 8, customer: "Esther", item: "6kg Cylinder", amount: "KSh 1500", status: "Shipped" },
  { id: 9, customer: "James", item: "13kg Cylinder", amount: "KSh 2500", status: "Delivered" },
  { id: 10, customer: "Ruth", item: "50kg Cylinder", amount: "KSh 7000", status: "Cancelled" },
  { id: 11, customer: "Philip", item: "6kg Cylinder", amount: "KSh 1500", status: "In Transit" },
  { id: 12, customer: "Anna", item: "13kg Cylinder", amount: "KSh 2500", status: "Delivered" },
  { id: 13, customer: "Michael", item: "50kg Cylinder", amount: "KSh 7000", status: "Pending" },
  { id: 14, customer: "Naomi", item: "6kg Cylinder", amount: "KSh 1500", status: "Shipped" },
  { id: 15, customer: "Simon", item: "13kg Cylinder", amount: "KSh 2500", status: "Delivered" },
  { id: 16, customer: "Leah", item: "50kg Cylinder", amount: "KSh 7000", status: "Cancelled" },
  { id: 17, customer: "Mark", item: "6kg Cylinder", amount: "KSh 1500", status: "In Transit" },
  { id: 18, customer: "Deborah", item: "13kg Cylinder", amount: "KSh 2500", status: "Delivered" },
  { id: 19, customer: "Nathan", item: "50kg Cylinder", amount: "KSh 7000", status: "Pending" },
  { id: 20, customer: "Esther", item: "6kg Cylinder", amount: "KSh 1500", status: "Shipped" },
  { id: 21, customer: "Jacob", item: "13kg Cylinder", amount: "KSh 2500", status: "Delivered" },
  { id: 22, customer: "Rachel", item: "50kg Cylinder", amount: "KSh 7000", status: "Cancelled" },
  { id: 23, customer: "Elijah", item: "6kg Cylinder", amount: "KSh 1500", status: "In Transit" },
  { id: 24, customer: "Miriam", item: "13kg Cylinder", amount: "KSh 2500", status: "Delivered" },
  { id: 25, customer: "David", item: "50kg Cylinder", amount: "KSh 7000", status: "Pending" },
  { id: 26, customer: "Hannah", item: "6kg Cylinder", amount: "KSh 1500", status: "Shipped" },
  { id: 27, customer: "Joseph", item: "13kg Cylinder", amount: "KSh 2500", status: "Delivered" },
  { id: 28, customer: "Esther", item: "50kg Cylinder", amount: "KSh 7000", status: "Cancelled" },
  { id: 29, customer: "Samuel", item: "6kg Cylinder", amount: "KSh 1500", status: "In Transit" },
  { id: 30, customer: "Naomi", item: "13kg Cylinder", amount: "KSh 2500", status: "Delivered" },
  { id: 31, customer: "Solomon", item: "50kg Cylinder", amount: "KSh 7000", status: "Pending" },
  { id: 32, customer: "Deborah", item: "6kg Cylinder", amount: "KSh 1500", status: "Shipped" },
];

const Orders = () => {
  const getStatusClass = (status) => {
    return "status-" + status.toLowerCase().replace(" ", "\\ ");
  };

  return (
    <div className="orders-page">
      <h2>Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Item</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(({ id, customer, item, amount, status }) => (
            <tr key={id} className={getStatusClass(status)}>
              <td>{id}</td>
              <td>{customer}</td>
              <td>{item}</td>
              <td>{amount}</td>
              <td>{status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
