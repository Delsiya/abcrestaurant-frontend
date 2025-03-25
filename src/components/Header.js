import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css'; 
import logo from '../images/ABClogo.png'; 

function Header() {
  return (
    <header>
      <div className="container">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/signup">signup</Link></li>
            <li><Link to="/login">Login</Link></li> {/* Login link */}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
