import React from 'react';
import { Link } from 'react-router-dom';
import "../css/home.css";  

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="header">
        <h1>Welcome to the Universe Emergency Ambulance Service</h1>
        <p>Your safety and health are our top priority. We're here to assist you in any emergency.</p>
      </header>

      <section className="services-section">
        <h2>Our Services</h2>
        <p>We offer a wide range of emergency medical services to respond to various incidents promptly.</p>
        <ul>
          <li>Emergency Ambulance Dispatch</li>
          <li>24/7 Medical Assistance</li>
          <li>Accident and Incident Response</li>
          <li>Medical Transport</li>
        </ul>
      </section>

      <section className="how-to-get-help">
        <h2>How to Get Help</h2>
        <p>If you need urgent assistance, please don't hesitate to contact us immediately. You can:</p>
        <ul>
          <li><Link to="/login">Login</Link> to report an incident.</li>
          <li><Link to="/signup">Sign Up</Link> to become a registered user for faster services.</li>
          <li>Call our hotline at <strong>123-456-789</strong> for immediate ambulance dispatch.</li>
        </ul>
      </section>

      <section className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <p>With years of experience in the emergency medical field, we pride ourselves on providing:</p>
        <ul>
          <li>Quick Response Times</li>
          <li>Highly Trained Medical Professionals</li>
          <li>Modern Medical Equipment on Board</li>
          <li>Reliable and Efficient Services</li>
        </ul>
      </section>

      {/* Ambulance Animation Section */}
      <section className="ambulance-animation-section">
        <h2>Emergency Assistance At Your Service</h2>
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBJ8DY4wLyyR7YOhGAXPtbhEypgqPGsg78zw&s" 
          alt="Ambulance" 
          className="ambulance-animation" 
        />
      </section>

      <footer className="footer">
        <p>
          <strong>We are here to help 24/7!</strong>
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
