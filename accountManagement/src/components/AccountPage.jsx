import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true); // Theme state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/auth/profile', {
          withCredentials: true, // Include session cookies
        });
        setUser(res.data.user);
        setName(res.data.user.name || '');
        setPhone(res.data.user.phone || '');
        setAddress(res.data.user.address || '');
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 401) {
          setError('Session expired. Please log in again.');
        } else {
          setError('Failed to fetch user data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    setUpdating(true);

    try {
      const res = await axios.put(
        '/auth/profile',
        { name, phone, address },
        { withCredentials: true }
      );
      setUser(res.data.user);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      setError('Failed to update user data');
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div
      className={`app-container ${darkTheme ? 'bg-dark text-light' : 'bg-light text-dark'} d-flex justify-content-center align-items-center`}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '2rem',
      }}
    >
      <div className="position-absolute top-0 end-0 m-3">
        <button onClick={toggleTheme} className="btn btn-outline-secondary">
          {darkTheme ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <h2 className="mb-4" style={{ color: darkTheme ? '#fdda0d' : '#007bff' }}>Account Information</h2>
      
      {isEditing ? (
        <form onSubmit={handleUpdate} style={{ width: '100%', maxWidth: '400px' }}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                backgroundColor: darkTheme ? '#2c2f3a' : 'white',
                color: darkTheme ? 'white' : 'black',
                border: 'none'
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={{
                backgroundColor: darkTheme ? '#2c2f3a' : 'white',
                color: darkTheme ? 'white' : 'black',
                border: 'none'
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              style={{
                backgroundColor: darkTheme ? '#2c2f3a' : 'white',
                color: darkTheme ? 'white' : 'black',
                border: 'none'
              }}
            />
          </div>
          <button type="submit" className={`btn ${darkTheme ? 'btn-warning' : 'btn-primary'} w-100`} disabled={updating}>
            {updating ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => setIsEditing(false)}
            disabled={updating}
          >
            Cancel
          </button>
        </form>
      ) : (
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <p><strong>Email:</strong> {user.email || 'Not available'}</p>
          <p><strong>Name:</strong> {user.name || 'Not available'}</p>
          <p><strong>Phone:</strong> {user.phone || 'Not available'}</p>
          <p><strong>Address:</strong> {user.address || 'Not available'}</p>
          <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </div>
      )}

      <button onClick={handleLogout} className="btn btn-danger mt-3">
        Logout
      </button>
    </div>
  );
};

export default AccountPage;