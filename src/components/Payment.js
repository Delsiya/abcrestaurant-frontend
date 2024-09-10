import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderData } = location.state || {};  // Get orderData from the previous page

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setIsPaymentProcessing(true);

    // Simulate payment processing delay
    setTimeout(() => {
      if (orderData) {
        handleOrderConfirmation(orderData);  // Once payment is "processed," submit the order
      } else {
        console.error("No order data provided");
      }
    }, 2000);
  };

  const handleOrderConfirmation = (orderData) => {
    // Simulate API call to save order to backend after payment
    fetch('http://localhost:8081/api/orders/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),  // Submit orderData to backend
    })
      .then(response => response.json())
      .then(data => {
        console.log('Order submitted successfully:', data);
        setIsPaymentProcessing(false);  // Stop the loading indicator

        // Navigate to Order Confirmation page after payment
        navigate('/order-confirmation', { state: { orderData: data } });
      })
      .catch(error => {
        console.error('Error submitting order:', error);
        setIsPaymentProcessing(false);  // Stop loading if there's an error
      });
  };

  return (
    <section id="payment">
      <div className="container">
        <h2>Payment</h2>
        <form onSubmit={handlePayment}>
          <label>
            Card Number:
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </label>
          <label>
            Expiry Date:
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </label>
          <label>
            CVV:
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
          </label>
          <button type="submit" disabled={isPaymentProcessing}>
            {isPaymentProcessing ? 'Processing Payment...' : 'Pay Now'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Payment;
