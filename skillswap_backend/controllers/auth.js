const bcrypt = require('bcryptjs');
const { users } = require('../models/user');

/**
 * PUBLIC_INTERFACE
 * @desc    Login a user
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

    // For now, just return user data (without password)
    // TODO: Implement JWT token generation
    const { password: _, ...userWithoutPassword } = user;
    
    return res.json({
      success: true,
      message: 'Login successful',
      user: userWithoutPassword,
      // token will be added when JWT is implemented
    });
    
  } catch (error) {
    console.error('Login error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};
