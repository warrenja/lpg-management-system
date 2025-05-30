import React from 'react';
import './Inventory.css';
import '../styles/MainStyles.css';

const sizes = ['6kg', '13kg', '50kg'];
const statuses = ['Filled', 'Empty', 'In Transit'];
const locations = ['Nairobi', 'Kisumu', 'Mombasa', 'Nakuru', 'Eldoret'];

// Function to generate 100 cylinders with random values
const generateInventory = () => {
  const inventory = [];
  for (let i = 1; i <= 100; i++) {
    inventory.push({
      id: i,
      size: sizes[Math.floor(Math.random() * sizes.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
    });
  }
  return inventory;
};

const rowBackgrounds = ['#fafafa', '#e8f0fe'];  // alternating soft backgrounds

const Inventory = () => {
  const cylinders = generateInventory();

  return (
    <div style={{ padding: '20px' }}>
      <h2>LPG Cylinder Inventory</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Size</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Location</th>
          </tr>
        </thead>
        <tbody>
          {cylinders.map((cylinder, index) => (
            <tr
              key={cylinder.id}
              style={{ backgroundColor: rowBackgrounds[index % rowBackgrounds.length] }}
            >
              <td style={tdStyle}>{cylinder.id}</td>
              <td style={tdStyle}>{cylinder.size}</td>
              <td style={tdStyle}>{cylinder.status}</td>
              <td style={tdStyle}>{cylinder.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  textAlign: 'left',
  fontWeight: '600',
  fontSize: '16px',
  color: '#333',
};

const tdStyle = {
  padding: '8px',
  border: '1px solid #ccc',
  fontSize: '15px',
  color: '#555',
};

export default Inventory;
