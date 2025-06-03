import React, { useState } from 'react';

export default function OrderForm() {
  const [formData, setFormData] = useState({
    customerName: '',
    product: '',
    quantity: 1,
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to place order');

      const data = await response.json();

      alert('Order placed! Your order ID is: ' + data._id);

      setFormData({ customerName: '', product: '', quantity: 1 });
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="customerName"
        placeholder="Your Name"
        value={formData.customerName}
        onChange={handleChange}
        required
      />
      <input
        name="product"
        placeholder="Product (e.g. LPG Cylinder)"
        value={formData.product}
        onChange={handleChange}
        required
      />
      <input
        name="quantity"
        type="number"
        min="1"
        value={formData.quantity}
        onChange={handleChange}
        required
      />
      <button type="submit">Place Order</button>
    </form>
  );
}
