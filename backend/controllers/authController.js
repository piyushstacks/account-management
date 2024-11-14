// authController.js
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');

// In-memory storage (replace with your database in production)
const users = [];

// Helper to remove password from user object
const sanitizeUser = (user) => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Authentication middleware
const auth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Please log in' });
  }
  next();
};

const authController = {
  // Register new user
  register: async (req, res) => {
    try {
      const { email, password, name, phone, address } = req.body;

      if (users.find(user => user.email === email)) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      const user = {
        id: users.length + 1,
        email,
        password: await bcrypt.hash(password, 10),
        name,
        phone,
        address,
        createdAt: new Date()
      };

      users.push(user);

      // Start session
      req.session.userId = user.id;

      res.status(201).json({
        message: 'Registration successful',
        user: sanitizeUser(user)
      });
    } catch (error) {
      console.error('Registration error:', error); // Log the error for debugging
      res.status(500).json({ message: 'Registration failed' });
    }
  },

  // Login user
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = users.find(u => u.email === email);

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Start session
      req.session.userId = user.id;

      res.json({
        message: 'Login successful',
        user: sanitizeUser(user)
      });
    } catch (error) {
      console.error('Login error:', error); // Log the error for debugging
      res.status(500).json({ message: 'Login failed' });
    }
  },

  // Logout user
  logout: (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logged out successfully' });
  },

  // Get user profile
  getProfile: async (req, res) => {
    try {
      const user = users.find(u => u.id === req.session.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ user: sanitizeUser(user) });
    } catch (error) {
      console.error('Get profile error:', error); // Log the error for debugging
      res.status(500).json({ message: 'Error fetching profile' });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const user = users.find(u => u.id === req.session.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update fields based on provided data
      const { name, phone, address } = req.body;
      if (name) user.name = name;
      if (phone) user.phone = phone;
      if (address) user.address = address;

      res.json({
        message: 'Profile updated successfully',
        user: sanitizeUser(user)
      });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ message: 'Error updating profile' });
    }
  }
};

module.exports = { auth, authController };
