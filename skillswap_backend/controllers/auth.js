const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { users } = require('../models/user');

/**
 * PUBLIC_INTERFACE
 * @desc    Login a user and return a JWT token
 * @param   {Object} req - Express request object with username/email and password
 * @param   {Object} res - Express response object
 * @returns {Object} Response with token or error
 */
exports.login = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // Validate request
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide both username/email and password' 
      });
    }

    // Check if user exists (in memory store)
    const user = users.find(user => 
      user.username === username || user.email === username
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Verify password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;
    
    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    };

    const token = jwt.sign(
      payload,
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );
    
    return res.json({
      success: true,
      message: 'Login successful',
      token,
      user: userWithoutPassword
    });
    
  } catch (error) {
    console.error('Login error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};
