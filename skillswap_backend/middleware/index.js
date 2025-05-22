/**
 * Common middleware functions
 * - Authentication middleware
 * - Request validation middleware
 * - Error handling middleware
 */
const jwt = require('jsonwebtoken');
const config = require('../config/config');

/**
 * PUBLIC_INTERFACE
 * @desc    Middleware to verify JWT token and authenticate users
 * @param   {Object} req - Express request object
 * @param   {Object} res - Express response object
 * @param   {Function} next - Express next function
 */
const auth = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'No token, authorization denied' 
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.jwt.secret);
    
    // Add user from payload to request
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ 
      success: false, 
      message: 'Token is not valid' 
    });
  }
};

module.exports = {
  auth
};
