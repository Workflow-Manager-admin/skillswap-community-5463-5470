/**
 * Configuration settings for the application
 */
module.exports = {
  // Environment settings are loaded from .env file via dotenv
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // This is a placeholder for JWT configuration which will be implemented later
  jwt: {
    secret: process.env.JWT_SECRET || 'temporarysecret',
    expiresIn: '24h'
  }
};
