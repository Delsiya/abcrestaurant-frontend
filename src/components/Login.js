import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Adjust the path according to the location of styles.css

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('staff'); // Default to staff
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Mock login function: Replace with actual authentication logic
    if (username && password) {
      // Redirect based on user type
      switch(userType) {
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'staff':
        default:
          navigate('/staff-dashboard');
          break;
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <span>User Type:</span>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="staff">Restaurant Staff</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
