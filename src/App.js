import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Services from './components/Services';
import Reservations from './components/Reservations';
import Queries from './components/Queries';
import LoginPage from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import StaffDashboard from './components/StaffDashboard';
import OrderNow from './components/OrderNow';
import OrderCheckout from './components/OrderCheckout';
import Payment from './components/Payment';
import OrderConfirmation from './components/OrderConfirmation';
import Rooms from './components/Rooms';
import BookingForm from './components/BookingForm';
import WeddingHall from './components/WeddingHall';  // Import WeddingHall

function App() {
  // State to manage order items shared between OrderNow and OrderCheckout
  const [orderItems, setOrderItems] = useState([]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/queries" element={<Queries />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/staff-dashboard" element={<StaffDashboard />} />
        <Route path="/order-now" element={<OrderNow setOrderItems={setOrderItems} />} />
        <Route path="/order-checkout" element={<OrderCheckout orderItems={orderItems} />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/booking/:roomType" element={<BookingForm />} />
        <Route path="/wedding-hall" element={<WeddingHall />} />  {/* Add route for WeddingHall */}
      </Routes>
    </Router>
  );
}

export default App;
