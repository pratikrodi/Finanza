import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Add this import
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory(); // Initialize useHistory hook

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to backend server for authentication
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      // Assuming backend returns user data upon successful login
      const userData = response.data;
      console.log('User data:', userData);
      // Redirect user to dashboard or another page upon successful login
      history.push('/'); // Redirect to dashboard page
    } catch (err) {
      // Handle login error
      setError(err.response.data.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <h2>Client Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default LoginForm;
