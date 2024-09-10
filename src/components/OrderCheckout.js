import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles.css';


function OrderCheckout() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderItems = location.state?.orderItems || [];
  const [deliveryType, setDeliveryType] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Calculate total amount
  const calculateTotalAmount = () => {
    return orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Handle form submission
  const handleSubmitOrder = (e) => {
    e.preventDefault();

    // Validate phone number
    if (!phone.match(/^\d+$/)) {
      setErrorMessage('Please enter a valid phone number');
      return;
    }

    // If delivery type is delivery, validate the address
    if (deliveryType === 'delivery' && !address) {
      setErrorMessage('Please enter your address for delivery');
      return;
    }

    const orderData = {
      orderItems,
      deliveryType,
      paymentMethod,
      address: deliveryType === 'delivery' ? address : 'N/A', // If pickup, set address to 'N/A'
      phone,
      email,
      totalAmount: calculateTotalAmount(),
    };

    // If payment method is online, navigate to payment page
    if (paymentMethod === 'online') {
      navigate('/payment', { state: { orderData } });
    } else {
      // For cash payment, submit the order directly
      handleOrderConfirmation(orderData);
    }
  };

  // Handle order confirmation for cash payments
  const handleOrderConfirmation = (orderData) => {
    fetch('http://localhost:8081/api/orders/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate('/order-confirmation', { state: { orderData: data } });
      })
      .catch((error) => {
        setErrorMessage('There was an issue submitting your order. Please try again.');
      });
  };

  return (
    <section id="order-checkout">
      <div className="container">
        <h2>Checkout</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form onSubmit={handleSubmitOrder}>
          <label>
            Delivery Type:
            <select value={deliveryType} onChange={(e) => setDeliveryType(e.target.value)}>
              <option value="delivery">Delivery</option>
              <option value="pickup">Pickup</option>
            </select>
          </label>
          <label>
            Payment Method:
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="online">Online Payment</option>
              <option value="cash">Cash</option>
            </select>
          </label>
          {deliveryType === 'delivery' && (
            <label>
              Address:
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
          )}
          <label>
            Phone Number:
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>
          <label>
            Email Address:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <p>Total Amount: ${calculateTotalAmount().toFixed(2)}</p>
          <button type="submit">Submit Order</button>
        </form>
      </div>
    </section>
  );
}

export default OrderCheckout;
