import React from "react";

const drivers = ["driver1", "driver2", "driver3"];

const AssignDriver = ({ orderId, assignedDriver, onAssign }) => {
  const handleChange = (e) => {
    onAssign(orderId, e.target.value);
  };

  return (
    <select value={assignedDriver || ""} onChange={handleChange}>
      <option value="">Unassigned</option>
      {drivers.map((driver) => (
        <option key={driver} value={driver}>
          {driver}
        </option>
      ))}
    </select>
  );
};

export default AssignDriver;
