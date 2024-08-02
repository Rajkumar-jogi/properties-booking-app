import React, { createContext, useState } from 'react';

// Create the context
export const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [orders, setOrders] = useState([]);

  const addToCart = (property) => {
    setCartItems((prevItems) => [...prevItems, property]);
    setTotalAmount((prevTotal) => prevTotal + property.price);
  };

  const removeFromCart = (propertyId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== propertyId));
    const removedProperty = cartItems.find(item => item.id === propertyId);
    if (removedProperty) {
      setTotalAmount((prevTotal) => prevTotal - removedProperty.price);
    }
  };

  const addOrder = (order) => {
    setOrders((prevOrders) => [...prevOrders, order]);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, totalAmount, addToCart, removeFromCart, calculateTotal, orders, addOrder, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
