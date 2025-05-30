import React from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import './Reports.css'; // optional for custom styling

const Reports = () => {
  // Sample data
  const customerLocationData = [
    { name: 'Nairobi', customers: 5 },
    { name: 'Mombasa', customers: 4 },
    { name: 'Kisumu', customers: 3 },
    { name: 'Eldoret', customers: 4 },
    { name: 'Meru', customers: 4 },
  ];

  const inventorySizeData = [
    { size: '6kg', count: 30 },
    { size: '13kg', count: 40 },
    { size: '50kg', count: 30 },
  ];

  const cylinderStatusData = [
    { status: 'Filled', count: 60 },
    { status: 'Empty', count: 40 },
  ];

  const COLORS = ['#00C49F', '#FFBB28', '#0088FE', '#FF8042'];

  return (
    <div className="reports-page">
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Analytics Dashboard</h2>

      <div className="chart-container">
        <div className="chart-box">
          <h4>Customer Distribution by Location</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={customerLocationData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="customers" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h4>Inventory by Cylinder Size</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={inventorySizeData}
                dataKey="count"
                nameKey="size"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {inventorySizeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h4>Cylinder Status Overview</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={cylinderStatusData}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {cylinderStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports;
