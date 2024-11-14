// src/middleware/auth.js
const auth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Please log in' });
  }
  
  // Attach user ID to the request object
  req.userId = req.session.userId;
  next();
};

module.exports = auth;