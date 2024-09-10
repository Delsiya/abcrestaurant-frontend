import React from 'react';
import { Link } from 'react-router-dom';
import dineInImage from '../images/Dinein.jpg';
// Replace with your image path
import foodOrderImage from '../images/food.jpg'; // Replace with your image path
import weddingHallImage from '../images/wedding hall.jpg'; // Replace with your image path
import roomsImage from '../images/rooms.webp'; // Replace with your image path
import '../styles.css'; // Ensure you have the correct path for your CSS

function Services() {
  return (
    <section id="services">
      <div className="container">
        <h2>Our Services</h2>
        <ul>
          <li>
            <h3>Reserve Table</h3>
            <img src={dineInImage} alt="Dine-In" /><br></br>
            <Link to="/reservations">
              <button>Dine-In</button>
            </Link>
            <p>Enjoy a delightful dining experience with a variety of cuisines in our elegant restaurant setting.</p>
          </li>
          <li>
            <h3>Food Order</h3>
            <img src={foodOrderImage} alt="Food Order" /><br></br>
            <Link to="/order-now">
              <button>Order Now</button>
            </Link>
            <p>Order your favorite dishes online and get them delivered straight to your door, or opt for pickup.</p>
          </li>
          <li>
            <h3>Wedding Halls</h3>
            <img src={weddingHallImage} alt="Wedding Hall" /><br></br>
            <Link to="/wedding-hall">
              <button>View Wedding Hall</button>
            </Link>
            <p>Book our spacious and beautifully decorated wedding hall for your special day, with full-service catering.</p>
          </li>
          <li>
            <h3>Rooms</h3>
            <img src={roomsImage} alt="Rooms" /><br></br>
            <Link to="/Rooms">
              <button>View Rooms</button>
            </Link>
            <p>Stay in our comfortable and well-equipped rooms, perfect for a relaxing getaway or business trip.</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Services;
