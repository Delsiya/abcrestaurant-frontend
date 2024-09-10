import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import SingleRoom from '../images/singleroom.jpg';
import DoubleRoom from '../images/double.jpg';
import FamilyRoom from '../images/familyroom.jpg';

function Rooms() {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleBookNowClick = (roomType) => {
    setSelectedRoom(roomType);
  };

  return (
    <section id="rooms">
      <div className="container">
        <h2>Rooms</h2>
        <p>Stay in our comfortable and well-equipped rooms, perfect for a relaxing getaway or a business trip. We offer a variety of room types to suit your needs.</p>

        <h3>Room Types</h3>

        <div className="room">
          <h4>Single Room</h4>
          <p>Ideal for solo travelers, our Single Rooms offer a cozy atmosphere with modern amenities, including a comfortable bed, free Wi-Fi, and a private bathroom.</p>
          <img src={SingleRoom} alt="Single Room" />
          <button onClick={() => handleBookNowClick('single-room')}>Book Now</button>
        </div>

        <div className="room">
          <h4>Double Room</h4>
          <p>Perfect for couples or friends, our Double Rooms feature a spacious layout with two beds, a work desk, free Wi-Fi, and a private bathroom.</p>
          <img src={DoubleRoom} alt="Double Room" />
          <button onClick={() => handleBookNowClick('double-room')}>Book Now</button>
        </div>

        <div className="room">
          <h4>Family Suite</h4>
          <p>Our Family Suites are designed for larger groups or families, offering two bedrooms, a living area, a kitchenette, and modern amenities for a comfortable stay.</p>
          <img src={FamilyRoom} alt="Family Suite" />
          <button onClick={() => handleBookNowClick('family-suite')}>Book Now</button>
        </div>

        {/* Display booking page based on selected room */}
        {selectedRoom && (
          <div>
            <h3>Booking for {selectedRoom.replace('-', ' ').toUpperCase()}</h3>
            <p>Please proceed to the booking page.</p>
            <Link to={`/booking/${selectedRoom}`}>
              <button>Proceed to Booking</button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default Rooms;
