import React, { useEffect, useState } from 'react';
import '../styles.css';

function AdminDashboard() {
  const [queries, setQueries] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch customer queries
    fetch('http://localhost:8081/api/queries/get')
      .then(response => response.json())
      .then(data => {
        console.log('Queries:', data); // Log the data to verify its structure
        setQueries(data);
      })
      .catch(error => console.error('Error fetching queries:', error));

    // Fetch room bookings
    fetch('http://localhost:8081/api/bookings')
      .then(response => response.json())
      .then(data => {
        console.log('Bookings:', data); // Log the data to verify its structure
        setBookings(data);
      })
      .catch(error => console.error('Error fetching bookings:', error));
  }, []);

  const handleReplyQuery = (queryId) => {
    // Implement logic to reply to the query
    alert(`Reply to query ${queryId}`);
  };

  const handleDeleteQuery = (queryId) => {
    fetch(`http://localhost:8081/api/queries/${queryId}`, { method: 'DELETE' })
      .then(() => {
        setQueries(queries.filter(query => query.id !== queryId));
      })
      .catch(error => console.error('Error deleting query:', error));
  };

  const handleConfirmBooking = (bookingId) => {
    fetch(`http://localhost:8081/api/bookings/${bookingId}/confirm`, { method: 'PUT' })
      .then(response => response.json())
      .then(() => {
        setBookings(bookings.filter(booking => booking.id !== bookingId));
      })
      .catch(error => console.error('Error confirming booking:', error));
  };

  const handleCancelBooking = (bookingId) => {
    fetch(`http://localhost:8081/api/bookings/${bookingId}/cancel`, { method: 'DELETE' })
      .then(() => {
        setBookings(bookings.filter(booking => booking.id !== bookingId));
      })
      .catch(error => console.error('Error canceling booking:', error));
  };

  const handleDeleteBooking = (bookingId) => {
    fetch(`http://localhost:8081/api/bookings/${bookingId}`, { method: 'DELETE' })
      .then(() => {
        setBookings(bookings.filter(booking => booking.id !== bookingId));
      })
      .catch(error => console.error('Error deleting booking:', error));
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      
      <h3>Customer Queries</h3>
      {queries.length === 0 ? (
        <p>No queries submitted yet.</p>
      ) : (
        <ul>
          {queries.map(query => (
            <li key={query.id}>
              <strong>Email:</strong> {query.email}<br />
              <strong>Query:</strong> {query.query || 'No query text'}<br />
              <button onClick={() => handleReplyQuery(query.id)}>Reply</button>
              <button onClick={() => handleDeleteQuery(query.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      
      <h3>Room Bookings</h3>
      {bookings.length === 0 ? (
        <p>No room bookings yet.</p>
      ) : (
        <ul>
          {bookings.map(booking => (
            <li key={booking.id}>
              <strong>Name:</strong> {booking.name}<br />
              <strong>Email:</strong> {booking.email}<br />
              <strong>Phone:</strong> {booking.phone}<br />
              <strong>Room Type:</strong> {booking.roomType}<br />
              <strong>Check-in Date:</strong> {new Date(booking.checkInDate).toLocaleDateString()}<br />
              <strong>Check-out Date:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}<br />
              <button onClick={() => handleConfirmBooking(booking.id)}>Confirm</button>
              <button onClick={() => handleCancelBooking(booking.id)}>Cancel</button>
              <button onClick={() => handleDeleteBooking(booking.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminDashboard;
