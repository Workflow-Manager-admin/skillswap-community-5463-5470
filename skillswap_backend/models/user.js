const bcrypt = require('bcryptjs');

/**
 * In-memory user storage
 * This is a stub and should be replaced with a database in production
 */

// Pre-hash a default password for our test users
const hashedPassword = bcrypt.hashSync('password123', 10);

// Sample users with hashed passwords
const users = [
  {
    id: '1',
    username: 'johndoe',
    email: 'john@example.com',
    password: hashedPassword,
    fullName: 'John Doe',
    role: 'user',
    createdAt: new Date()
  },
  {
    id: '2',
    username: 'janedoe',
    email: 'jane@example.com',
    password: hashedPassword,
    fullName: 'Jane Doe',
    role: 'user',
    createdAt: new Date()
  }
];

module.exports = {
  users
};
