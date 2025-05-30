import React from "react";
import './Sales.css';

const salesData = [
  { id: 1, customer: "David", cylinderSize: "6kg", quantity: 1, price: 500, date: "2025-05-01" },
  { id: 2, customer: "Mary", cylinderSize: "13kg", quantity: 2, price: 2400, date: "2025-05-02" },
  { id: 3, customer: "Peter", cylinderSize: "12.5kg", quantity: 1, price: 1100, date: "2025-05-02" },
  { id: 4, customer: "Sarah", cylinderSize: "6kg", quantity: 3, price: 1500, date: "2025-05-03" },
  { id: 5, customer: "Joseph", cylinderSize: "13kg", quantity: 1, price: 1200, date: "2025-05-03" },
  { id: 6, customer: "Esther", cylinderSize: "6kg", quantity: 2, price: 1000, date: "2025-05-04" },
  { id: 7, customer: "Jonah", cylinderSize: "12.5kg", quantity: 1, price: 1100, date: "2025-05-05" },
  { id: 8, customer: "Ruth", cylinderSize: "13kg", quantity: 1, price: 1200, date: "2025-05-05" },
  { id: 9, customer: "Matthew", cylinderSize: "6kg", quantity: 4, price: 2000, date: "2025-05-06" },
  { id: 10, customer: "Deborah", cylinderSize: "12.5kg", quantity: 2, price: 2200, date: "2025-05-06" },
  { id: 11, customer: "Abigail", cylinderSize: "13kg", quantity: 1, price: 1200, date: "2025-05-07" },
  { id: 12, customer: "Elijah", cylinderSize: "6kg", quantity: 1, price: 500, date: "2025-05-07" },
  { id: 13, customer: "Martha", cylinderSize: "12.5kg", quantity: 3, price: 3300, date: "2025-05-08" },
  { id: 14, customer: "Samuel", cylinderSize: "6kg", quantity: 2, price: 1000, date: "2025-05-08" },
  { id: 15, customer: "Rebecca", cylinderSize: "13kg", quantity: 2, price: 2400, date: "2025-05-09" },
  { id: 16, customer: "Isaiah", cylinderSize: "12.5kg", quantity: 1, price: 1100, date: "2025-05-09" },
  { id: 17, customer: "Naomi", cylinderSize: "6kg", quantity: 3, price: 1500, date: "2025-05-10" },
  { id: 18, customer: "Elisha", cylinderSize: "13kg", quantity: 1, price: 1200, date: "2025-05-10" },
  { id: 19, customer: "Solomon", cylinderSize: "6kg", quantity: 2, price: 1000, date: "2025-05-11" },
  { id: 20, customer: "Hannah", cylinderSize: "12.5kg", quantity: 1, price: 1100, date: "2025-05-11" },
  { id: 21, customer: "Joshua", cylinderSize: "13kg", quantity: 1, price: 1200, date: "2025-05-12" },
  { id: 22, customer: "Lydia", cylinderSize: "6kg", quantity: 2, price: 1000, date: "2025-05-12" },
  { id: 23, customer: "Gideon", cylinderSize: "12.5kg", quantity: 3, price: 3300, date: "2025-05-13" },
  { id: 24, customer: "Priscilla", cylinderSize: "6kg", quantity: 1, price: 500, date: "2025-05-13" },
  { id: 25, customer: "Barnabas", cylinderSize: "13kg", quantity: 2, price: 2400, date: "2025-05-14" },
  { id: 26, customer: "Moses", cylinderSize: "6kg", quantity: 1, price: 500, date: "2025-05-14" },
  { id: 27, customer: "Phoebe", cylinderSize: "12.5kg", quantity: 2, price: 2200, date: "2025-05-15" },
  { id: 28, customer: "Joel", cylinderSize: "6kg", quantity: 3, price: 1500, date: "2025-05-15" },
  { id: 29, customer: "Anna", cylinderSize: "13kg", quantity: 1, price: 1200, date: "2025-05-16" },
  { id: 30, customer: "Zechariah", cylinderSize: "6kg", quantity: 2, price: 1000, date: "2025-05-16" },
  { id: 31, customer: "Timothy", cylinderSize: "12.5kg", quantity: 1, price: 1100, date: "2025-05-17" },
  { id: 32, customer: "Eve", cylinderSize: "6kg", quantity: 3, price: 1500, date: "2025-05-17" },
  { id: 33, customer: "Nehemiah", cylinderSize: "13kg", quantity: 1, price: 1200, date: "2025-05-18" },
  { id: 34, customer: "Tabitha", cylinderSize: "6kg", quantity: 2, price: 1000, date: "2025-05-18" },
  { id: 35, customer: "Philip", cylinderSize: "12.5kg", quantity: 1, price: 1100, date: "2025-05-19" },
  { id: 36, customer: "Esther", cylinderSize: "13kg", quantity: 2, price: 2400, date: "2025-05-19" },
  { id: 37, customer: "Jacob", cylinderSize: "6kg", quantity: 1, price: 500, date: "2025-05-20" },
  { id: 38, customer: "Susanna", cylinderSize: "12.5kg", quantity: 3, price: 3300, date: "2025-05-20" },
  { id: 39, customer: "Caleb", cylinderSize: "13kg", quantity: 1, price: 1200, date: "2025-05-21" },
  { id: 40, customer: "Deborah", cylinderSize: "6kg", quantity: 2, price: 1000, date: "2025-05-21" },
  { id: 41, customer: "Aaron", cylinderSize: "12.5kg", quantity: 1, price: 1100, date: "2025-05-22" },
  { id: 42, customer: "Miriam", cylinderSize: "6kg", quantity: 3, price: 1500, date: "2025-05-22" },
  { id: 43, customer: "Elijah", cylinderSize: "13kg", quantity: 1, price: 1200, date: "2025-05-23" },
  { id: 44, customer: "Naomi", cylinderSize: "6kg", quantity: 2, price: 1000, date: "2025-05-23" },
  { id: 45, customer: "Simon", cylinderSize: "12.5kg", quantity: 1, price: 1100, date: "2025-05-24" },
  { id: 46, customer: "Joanna", cylinderSize: "6kg", quantity: 4, price: 2000, date: "2025-05-24" },
  { id: 47, customer: "Judas", cylinderSize: "13kg", quantity: 2, price: 2400, date: "2025-05-25" },
  { id: 48, customer: "Elizabeth", cylinderSize: "6kg", quantity: 1, price: 500, date: "2025-05-25" },
  { id: 49, customer: "Thomas", cylinderSize: "12.5kg", quantity: 3, price: 3300, date: "2025-05-26" },
  { id: 50, customer: "Rachel", cylinderSize: "13kg", quantity: 1, price: 1200, date: "2025-05-26" },
  { id: 51, customer: "Ezra", cylinderSize: "6kg", quantity: 2, price: 1000, date: "2025-05-27" },
  { id: 52, customer: "Deborah", cylinderSize: "12.5kg", quantity: 1, price: 1100, date: "2025-05-27" },
  { id: 53, customer: "Malachi", cylinderSize: "6kg", quantity: 3, price: 1500, date: "2025-05-28" },
  { id: 54, customer: "Jesse", cylinderSize: "13kg", quantity: 1, price: 1200, date: "2025-05-28" },
  { id: 55, customer: "Nehemiah", cylinderSize: "6kg", quantity: 2, price: 1000, date: "2025-05-29" },
  { id: 56, customer: "Susanna", cylinderSize: "12.5kg", quantity: 1, price: 1100, date: "2025-05-29" },
  { id: 57, customer: "Joel", cylinderSize: "6kg", quantity: 4, price: 2000, date: "2025-05-30" },
  { id: 58, customer: "Tabitha", cylinderSize: "13kg", quantity: 1, price: 1200, date: "2025-05-30" },
  { id: 59, customer: "Aaron", cylinderSize: "6kg", quantity: 2, price: 1000, date: "2025-05-31" },
  { id: 60, customer: "Miriam", cylinderSize: "12.5kg", quantity: 3, price: 3300, date: "2025-05-31" },
  { id: 61, customer: "Isaiah", cylinderSize: "13kg", quantity: 1, price: 1200, date: "2025-06-01" },
  { id: 62, customer: "Rebecca", cylinderSize: "6kg", quantity: 2, price: 1000, date: "2025-06-01" },
  { id: 63, customer: "Gideon", cylinderSize: "12.5kg", quantity: 1, price: 1100, date: "2025-06-02" },
  { id: 64, customer: "Priscilla", cylinderSize: "6kg", quantity: 3, price: 1500, date: "2025-06-02" },
  { id: 65, customer: "Jacob", cylinderSize: "13kg", quantity: 1, price: 1200, date: "2025-06-03" },
  { id: 66, customer: "Susanna", cylinderSize: "6kg", quantity: 2, price: 1000, date: "2025-06-03" },
  { id: 67, customer: "Caleb", cylinderSize: "12.5kg", quantity: 1, price: 1100, date: "2025-06-04" },
  { id: 68, customer: "Deborah", cylinderSize: "6kg", quantity: 4, price: 2000, date: "2025-06-04" },
];

export default function Sales() {
  return (
    <div className="sales-container">
      <h2>Sales Records</h2>
      <table className="sales-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Cylinder Size</th>
            <th>Quantity</th>
            <th>Price (Ksh)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map(({ id, customer, cylinderSize, quantity, price, date }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{customer}</td>
              <td>{cylinderSize}</td>
              <td>{quantity}</td>
              <td>{price}</td>
              <td>{date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
