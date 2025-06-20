// src/pages/Reports.js
import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import "./Reports.css";

const COLORS = ["#00C49F", "#FFBB28", "#0088FE", "#FF8042", "#FF6384", "#36A2EB"];

const Reports = () => {
  const [customerLocationData, setCustomerLocationData] = useState([]);
  const [inventorySizeData, setInventorySizeData] = useState([]);
  const [cylinderStatusData, setCylinderStatusData] = useState([]);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchReportsData = async () => {
      try {
        // Fetch customers or sales data for location analysis
        const salesRes = await fetch(`${backendUrl}/sales`);
        const sales = await salesRes.json();

        const locationCount = {};
        const cylinderSizeCount = {};
        let filled = 0, empty = 0;

        sales.forEach((sale) => {
          const location = sale.location || "Unknown"; // optional location field
          const size = sale.item?.replace(" Cylinder", "") || "Unknown";

          // Location
          if (locationCount[location]) {
            locationCount[location]++;
          } else {
            locationCount[location] = 1;
          }

          // Inventory size
          if (cylinderSizeCount[size]) {
            cylinderSizeCount[size]++;
          } else {
            cylinderSizeCount[size] = 1;
          }

          // Basic simulation for status breakdown (for example only)
          const isFilled = sale.status === "Delivered" || sale.status === "Filled";
          if (isFilled) filled++;
          else empty++;
        });

        // Build chart datasets
        setCustomerLocationData(
          Object.entries(locationCount).map(([name, customers]) => ({ name, customers }))
        );

        setInventorySizeData(
          Object.entries(cylinderSizeCount).map(([size, count]) => ({ size, count }))
        );

        setCylinderStatusData([
          { status: "Filled", count: filled },
          { status: "Empty", count: empty },
        ]);
      } catch (err) {
        console.error("❌ Failed to fetch report data:", err);
      }
    };

    fetchReportsData();
  }, [backendUrl]);

  return (
    <div className="reports-page">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Analytics Dashboard</h2>

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
                  <Cell key={`size-${index}`} fill={COLORS[index % COLORS.length]} />
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
                  <Cell key={`status-${index}`} fill={COLORS[index % COLORS.length]} />
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
