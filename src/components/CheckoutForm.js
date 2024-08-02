import React, { useState, useContext, useCallback } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/checkoutForm.css';

const CheckoutForm = ({ onOrderSuccess }) => {
  const { totalAmount, cartItems } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: ''
  });
  const [errors, setErrors] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.paymentMethod) newErrors.paymentMethod = "Payment method is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setShowSuccessPopup(true);
    setTimeout(() => {
      onOrderSuccess(); // Call onOrderSuccess after showing the success popup
      setShowSuccessPopup(false); // Hide the popup after a short delay
    }, 1000); // Adjust delay as needed
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries({
          name: 'Name',
          email: 'Email',
          phone: 'Phone',
          address: 'Address',
          paymentMethod: 'Payment Method'
        }).map(([field, label]) => (
          <div className="form-group" key={field}>
            <label htmlFor={field}>{label}:</label>
            {field === 'paymentMethod' ? (
              <select id={field} name={field} value={formData[field]} onChange={handleChange}>
                <option value="">Select</option>
                <option value="creditCard">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="cashondelivery">Cash On Delivery</option>
              </select>
            ) : (
              <input type={field === 'email' ? 'email' : 'text'} id={field} name={field} value={formData[field]} onChange={handleChange} />
            )}
            {errors[field] && <span className="error">{errors[field]}</span>}
          </div>
        ))}
        <button type="submit">Book Now</button>
      </form>
      {showSuccessPopup && (
        <div className="popup">
          <p>Booking Successfully Completed!</p>
        </div>
      )}
      <div className="checkout-summary">
        <h3>Cart Summary</h3>
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>{item.title} - ₹{item.price}</li>
          ))}
        </ul>
        <h4>Total Amount: ₹{totalAmount}/-</h4>
      </div>
    </div>
  );
};

export default CheckoutForm;
