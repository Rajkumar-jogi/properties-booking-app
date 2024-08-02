// src/components/ViewOrders.js
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/viewOrders.css';

const ViewOrders = () => {
  const { orders } = useContext(CartContext);

  const isValidDate = (date) => !isNaN(new Date(date).getTime());

  const validOrders = orders.filter(order => isValidDate(order.date));

  return (
    <div className="orders-container">
      <h2>Order History</h2>
      {validOrders.length === 0 ? (
        <p>No valid orders found.</p>
      ) : (
        <ul>
          {validOrders.map((order, index) => (
            <li key={order.id || index}>
              <h3>Order #{index + 1}</h3>
              <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <h4>Items:</h4>
              <ul>
                {order.items.map(item => (
                  <li key={item.id}>{item.title} - ₹{item.price}</li>
                ))}
              </ul>
              <h4>Total Amount: ₹{order.totalAmount}/-</h4>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewOrders;
