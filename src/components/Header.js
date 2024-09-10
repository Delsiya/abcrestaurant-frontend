import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css'; // Adjust the path according to the location of styles.css
import logo from '../images/ABClogo.png'; // Import the logo image

function Header() {
  return (
    <header>
      <div className="container">
        <img src={logo} alt="ABC Restaurant Logo" className="logo" />
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/queries">Queries</Link></li>
            <li><Link to="/login">Login</Link></li> {/* Login link */}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
