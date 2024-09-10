import React, { useEffect, useState } from 'react';

function StaffDashboard() {
  const [reservations, setReservations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [availability, setAvailability] = useState(null);
  const [loadingReservations, setLoadingReservations] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReservations();
    fetchOrders();
  }, []);

  const fetchReservations = async () => {
    setLoadingReservations(true);
    try {
      const response = await fetch('http://localhost:8081/api/reservations/all');
      if (!response.ok) throw new Error('Failed to fetch reservations');
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      setError('Error fetching reservations');
      console.error('Error fetching reservations:', error);
    } finally {
      setLoadingReservations(false);
    }
  };

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const response = await fetch('http://localhost:8081/api/orders/get');
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      console.log('Fetched Orders:', data); // Debugging line
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        console.error('Unexpected response format:', data);
        setOrders([]); // Set to empty array in case of unexpected format
      }
    } catch (error) {
      setError('Error fetching orders');
      console.error('Error fetching orders:', error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleConfirm = async (id) => {
    try {
      await fetch(`http://localhost:8081/api/reservations/${id}/confirm`, { method: 'POST' });
      fetchReservations(); // Refresh the reservations list
    } catch (error) {
      setError('Error confirming reservation');
      console.error('Error confirming reservation:', error);
    }
  };

  const handleCancel = async (id) => {
    try {
      await fetch(`http://localhost:8081/api/reservations/${id}/cancel`, { method: 'POST' });
      fetchReservations(); // Refresh the reservations list
    } catch (error) {
      setError('Error canceling reservation');
      console.error('Error canceling reservation:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8081/api/reservations/${id}`, { method: 'DELETE' });
      fetchReservations(); // Refresh the reservations list
    } catch (error) {
      setError('Error deleting reservation');
      console.error('Error deleting reservation:', error);
    }
  };

  const checkAvailability = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/reservations/availability?date=${selectedDate}`);
      if (!response.ok) throw new Error('Failed to check availability');
      const data = await response.json();
      setAvailability(data);
    } catch (error) {
      setError('Error checking availability');
      console.error('Error checking availability:', error);
    }
  };

  return (
    <div className="staff-dashboard">
      <h2>Staff Dashboard</h2>

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Loading Reservations */}
      {loadingReservations ? (
        <p>Loading reservations...</p>
      ) : (
        <>
          <h3>Reservations</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Number of Persons</th>
                <th>Date</th>
                <th>Time</th>
                <th>Phone Number</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length === 0 ? (
                <tr>
                  <td colSpan="7">No reservations available</td>
                </tr>
              ) : (
                reservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td>{reservation.name}</td>
                    <td>{reservation.numberOfPersons}</td>
                    <td>{reservation.reservationDate}</td>
                    <td>{reservation.reservationTime}</td>
                    <td>{reservation.phoneNumber}</td>
                    <td>{reservation.status}</td>
                    <td>
                      <button onClick={() => handleConfirm(reservation.id)}>Confirm</button>
                      <button onClick={() => handleCancel(reservation.id)}>Cancel</button>
                      <button onClick={() => handleDelete(reservation.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      )}

      {/* Loading Orders */}
      {loadingOrders ? (
        <p>Loading orders...</p>
      ) : (
        <>
          <h3>Orders</h3>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Delivery Type</th>
                <th>Payment Method</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Total Amount</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(orders) && orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.deliveryType}</td>
                    <td>{order.paymentMethod}</td>
                    <td>{order.address}</td>
                    <td>{order.phone}</td>
                    <td>{order.email}</td>
                    <td>${order.totalAmount.toFixed(2)}</td>
                    <td>
                      <ul>
                        {order.orderItems.map((item, index) => (
                          <li key={index}>
                            {item.name} - {item.quantity} x ${item.price.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No orders available</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}

      {/* Availability Check */}
      <div className="availability-check">
        <h3>Check Availability</h3>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button onClick={checkAvailability}>Check</button>
        {availability !== null && (
          <p>{availability ? 'Slots are available' : 'No slots available'}</p>
        )}
      </div>
    </div>
  );
}

export default StaffDashboard;
