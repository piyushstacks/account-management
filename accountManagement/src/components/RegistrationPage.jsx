import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const RegistrationPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [darkTheme, setDarkTheme] = useState(true); // Theme state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/auth/register', {
        email,
        password,
        name,
        phone,
        address,
      }, {
        withCredentials: true // Important for session-based authentication
      });

      if (response.data.message === 'Registration successful') {
        navigate('/login');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <div
      className={`d-flex justify-content-center align-items-center min-vh-100 ${darkTheme ? 'bg-dark text-light' : 'bg-light text-dark'}`}
    >
      <div className="position-absolute top-0 end-0 m-3">
        <button onClick={toggleTheme} className="btn btn-outline-secondary">
          {darkTheme ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <div
        className="card p-4"
        style={{
          width: '22rem',
          backgroundColor: darkTheme ? '#1c1e2a' : '#f8f9fa',
          borderRadius: '10px',
          color: darkTheme ? 'white' : 'black',
        }}
      >
        <h2 className="text-center mb-4" style={{ color: darkTheme ? '#fdda0d' : '#007bff' }}>Register</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ backgroundColor: darkTheme ? '#2c2f3a' : 'white', color: darkTheme ? 'white' : 'black', border: 'none' }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ backgroundColor: darkTheme ? '#2c2f3a' : 'white', color: darkTheme ? 'white' : 'black', border: 'none' }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ backgroundColor: darkTheme ? '#2c2f3a' : 'white', color: darkTheme ? 'white' : 'black', border: 'none' }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input
              type="tel"
              id="phone"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={{ backgroundColor: darkTheme ? '#2c2f3a' : 'white', color: darkTheme ? 'white' : 'black', border: 'none' }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              id="address"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              style={{ backgroundColor: darkTheme ? '#2c2f3a' : 'white', color: darkTheme ? 'white' : 'black', border: 'none' }}
            />
          </div>

          <button type="submit" className={`btn ${darkTheme ? 'btn-warning' : 'btn-primary'} w-100`}>
            Register
          </button>
        </form>
        <div className="text-center mt-3">
          <small>
            Existing user?{' '}
            <Link to="/login" style={{ color: darkTheme ? '#fdda0d' : '#007bff' }}>
              Login
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
