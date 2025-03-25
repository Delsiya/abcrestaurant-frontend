import React from "react";
import { Link } from "react-router-dom";
import "../css/admin-dashboard.css"; 

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
      </header>
      
      <nav className="admin-nav">
       
      </nav>

      <div className="admin-content">
        <p>Welcome to the Admin Dashboard. Choose a service to manage:</p>
      </div>
      <ul>
          <li>
            <Link to="/branch-management" aria-label="Manage Branches">Branch Management</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/blood-search" aria-label="Blood Search">Blood Search</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/donor-registration" aria-label="Donor Registration">Donor Registration</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/event-management" aria-label="Event Management">Event Management</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/blood-bank" aria-label="Blood Bank">Blood Bank</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/ambulance-management" aria-label="Ambulance Management">Ambulance Management</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/ambulance-form" aria-label="Ambulance Form">Ambulance Form</Link>
          </li>
        </ul>   
    </div>
  );
};

export default AdminDashboard;
