import React, { useState } from 'react';
import '../styles.css';


function Reservation() {
  const [name, setName] = useState('');
  const [numberOfPersons, setNumberOfPersons] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');

  const handleReservation = async (e) => {
    e.preventDefault();
    const reservation = { name, numberOfPersons, phoneNumber, reservationDate, reservationTime };

    console.log('Form submitted');
    console.log('Reservation data:', reservation);

    try {
      const response = await fetch('http://localhost:8081/api/reservations/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservation),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      alert('Reservation made successfully!');
    } catch (error) {
      console.error('Error making reservation:', error);
    }
  };

  return (
    <section id="reservations">
      <div className="container">
        <h2>Make a Reservation</h2>
        <form onSubmit={handleReservation}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Number of Persons:
            <input
              type="number"
              value={numberOfPersons}
              onChange={(e) => setNumberOfPersons(e.target.value)}
              required
              min="1"
            />
          </label>
          <label>
            Phone Number:
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              pattern="[0-9]{10}"
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              value={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
              required
            />
          </label>
          <label>
            Time:
            <input
              type="time"
              value={reservationTime}
              onChange={(e) => setReservationTime(e.target.value)}
              required
            />
          </label>
          <button type="submit">Reserve</button>
        </form>
      </div>
    </section>
  );
}

export default Reservation;
