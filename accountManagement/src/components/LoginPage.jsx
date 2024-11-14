import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate email and password
  const validate = () => {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!emailPattern.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkTheme(savedTheme === 'dark');
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await axios.post('/auth/login', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      const { token, user } = response.data;

      // Store token and user data
      if (rememberMe) {
        localStorage.setItem('token', token);
        localStorage.setItem('userData', JSON.stringify(user));
      } else {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('userData', JSON.stringify(user));
      }

      navigate('/account');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Toggle between light and dark theme
  const toggleTheme = () => {
    const newTheme = !darkTheme;
    setDarkTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <div
      className={`d-flex justify-content-center align-items-center min-vh-100 ${
        darkTheme ? 'bg-dark text-light' : 'bg-light text-dark'
      }`}
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
        <h2 className="text-center mb-4" style={{ color: darkTheme ? '#fdda0d' : '#007bff' }}>
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
              aria-describedby="emailHelp"
              style={{
                backgroundColor: darkTheme ? '#2c2f3a' : 'white',
                color: darkTheme ? 'white' : 'black',
                border: 'none',
              }}
            />
            {formErrors.email && <small className="text-danger">{formErrors.email}</small>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
              aria-describedby="passwordHelp"
              style={{
                backgroundColor: darkTheme ? '#2c2f3a' : 'white',
                color: darkTheme ? 'white' : 'black',
                border: 'none',
              }}
            />
            {formErrors.password && <small className="text-danger">{formErrors.password}</small>}
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember Me
            </label>
          </div>

          <button type="submit" className={`btn ${darkTheme ? 'btn-warning' : 'btn-primary'} w-100`} disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: darkTheme ? '#fdda0d' : '#007bff' }}>
              Register New Account
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
