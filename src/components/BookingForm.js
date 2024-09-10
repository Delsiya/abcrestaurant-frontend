import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function BookingForm() {
  const { roomType } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',  // Added phone
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = 'http://localhost:8081/api/bookings/create';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomType,
          ...formData,
          checkInDate: new Date(formData.checkInDate).toISOString(),  // Ensure correct date format
          checkOutDate: new Date(formData.checkOutDate).toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Booking submission failed');
      }

      const data = await response.json();
      console.log('Booking successful:', data);

      setSuccessMessage('Booking successful!');
      setErrorMessage('');

      setFormData({
        name: '',
        email: '',
        phone: '',  // Reset phone field
        checkInDate: '',
        checkOutDate: '',
        numberOfGuests: 1,
      });

    } catch (error) {
      setErrorMessage('Error submitting booking: ' + error.message);
      setSuccessMessage('');
      console.error('Error submitting booking:', error);
    }
  };

  return (
    <section id="booking-form">
      <div className="container">
        <h2>Book {roomType.replace('-', ' ').toUpperCase()}</h2>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Check-In Date:
            <input
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Check-Out Date:
            <input
              type="date"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Number of Guests:
            <input
              type="number"
              name="numberOfGuests"
              value={formData.numberOfGuests}
              onChange={handleChange}
              min="1"
              required
            />
          </label>
          <button type="submit">Confirm Booking</button>
        </form>
      </div>
    </section>
  );
}

export default BookingForm;
