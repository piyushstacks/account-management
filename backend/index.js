const express = require('express');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());

// Configure CORS
app.use(cors({
  origin: process.env.CLIENT_URL, // Allow only your frontend URL
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

// Session setup
app.use(session({
  secret: 'cb0111f2e53c0d09d4688f0d5d9bfa1e8fb5542e2c2f0306e535259a8ef10424f0c676368879441a3d4934d4003ffe13c61658e01726ffce5a57e98c22169732',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Routes
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
