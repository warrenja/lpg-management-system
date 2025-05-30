import React from "react";
import './Customers.css';

const customers = [
  { id: 1, name: "Abel", phone: "0712345678", location: "Nairobi" },
  { id: 2, name: "Beth", phone: "0723456789", location: "Mombasa" },
  { id: 3, name: "Charles", phone: "0734567890", location: "Kisumu" },
  { id: 4, name: "Diana", phone: "0745678901", location: "Nakuru" },
  { id: 5, name: "Elias", phone: "0756789012", location: "Eldoret" },
  { id: 6, name: "Faith", phone: "0767890123", location: "Thika" },
  { id: 7, name: "George", phone: "0778901234", location: "Nanyuki" },
  { id: 8, name: "Hannah", phone: "0789012345", location: "Garissa" },
  { id: 9, name: "Isaac", phone: "0790123456", location: "Meru" },
  { id: 10, name: "Joyce", phone: "0701234567", location: "Kitale" },
  { id: 11, name: "Kevin", phone: "0712345670", location: "Malindi" },
  { id: 12, name: "Linda", phone: "0723456701", location: "Busia" },
  { id: 13, name: "Michael", phone: "0734567012", location: "Kakamega" },
  { id: 14, name: "Njeri", phone: "0745670123", location: "Naivasha" },
  { id: 15, name: "Oscar", phone: "0756701234", location: "Kitui" },
  { id: 16, name: "Patricia", phone: "0767012345", location: "Kisii" },
  { id: 17, name: "Quentin", phone: "0770123456", location: "Voi" },
  { id: 18, name: "Rachel", phone: "0781234567", location: "Nyeri" },
  { id: 19, name: "Samuel", phone: "0792345678", location: "Embu" },
  { id: 20, name: "Tina", phone: "0703456789", location: "Murang'a" },
];

const rowColors = [
  "#fde2e2", // light pink
  "#f9f7f7", // off-white
  "#e2f0cb", // light green
  "#ffdac1", // light orange
  "#cce5ff", // light blue
];

export default function Customers() {
  return (
    <div className="customers-container">
      <h2>Customers List</h2>
      <table className="customers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(({ id, name, phone, location }, index) => (
            <tr key={id} style={{ backgroundColor: rowColors[index % rowColors.length] }}>
              <td>{name}</td>
              <td>{phone}</td>
              <td>{location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
