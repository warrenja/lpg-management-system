import React, { useEffect, useState } from "react";

const AssignDriver = ({ orderId, assignedDriver, onAssign }) => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/drivers`);
        if (!response.ok) throw new Error("Failed to fetch drivers");
        const data = await response.json();
        setDrivers(data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchDrivers();
  }, []);

  const handleChange = (e) => {
    onAssign(orderId, e.target.value);
  };

  return (
    <select value={assignedDriver || ""} onChange={handleChange}>
      <option value="">Unassigned</option>
      {drivers.map((driver) => (
        <option key={driver.username} value={driver.username}>
          {driver.username}
        </option>
      ))}
    </select>
  );
};

export default AssignDriver;
