/**
 * Configuration settings for the application
 */
module.exports = {
  // Environment settings are loaded from .env file via dotenv
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // JWT configuration with secret from environment variable
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '24h'
  }
};
