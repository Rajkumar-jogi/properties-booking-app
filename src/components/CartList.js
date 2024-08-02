import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import CheckoutForm from './CheckoutForm';
import '../styles/cartList.css';

const CartList = () => {
  const { cartItems, removeFromCart, totalAmount, addOrder, setCartItems } = useContext(CartContext);

  const handleOrderSuccess = () => {
    const newOrder = {
      items: cartItems,
      totalAmount,
      status: 'Order Placed',
      date: new Date().toISOString(),
    };
    addOrder(newOrder);
    setCartItems([]); // Clear cart items after successful order
  };

  return (
    <div className="cart-container">
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-list">
          <h2>Your Cart</h2>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={require(`../assets/${item.image}`)} alt={item.title} />
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p><strong>Price:</strong> ₹{item.price}/-</p>
                <button onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total Amount: ₹{totalAmount}/-</h3>
          </div>
          <Popup trigger={<button className="checkout-button">Proceed to Checkout</button>} modal>
            {close => (
              <CheckoutForm onOrderSuccess={() => { handleOrderSuccess(); close(); }} />
            )}
          </Popup>
        </div>
      )}
    </div>
  );
};

export default CartList;
