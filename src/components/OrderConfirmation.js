import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles.css';


function OrderConfirmation() {
  const location = useLocation();
  const { orderData } = location.state || {};  // Get the order data from state

  return (
    <section id="order-confirmation">
      <div className="container">
        <h2>Order Confirmation</h2>
        {orderData ? (
          <div>
            <p>Thank you for your order!</p>
            {/* Display more order details as needed */}
          </div>
        ) : (
          <p>No order details available.</p>
        )}
      </div>
    </section>
  );
}

export default OrderConfirmation;
