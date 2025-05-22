# SkillSwap Backend

This is the backend API for the SkillSwap community platform.

## Features

- Authentication API with login endpoint and JWT support
- Secure password handling with bcrypt
- In-memory user storage (for development)
- JWT-based protected routes
- Ready for extension (database, registration)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following content:
   ```
   PORT=5000
   NODE_ENV=development
   ```

3. Start the development server:
   ```
   npm run dev
   ```

The API will be available at http://localhost:5000

## API Endpoints

### Authentication

**Login**
- URL: `POST /api/auth/login`
- Description: Authenticate a user and get JWT token
- Request Body:
  ```json
  {
    "username": "johndoe", // or email
    "password": "password123"
  }
  ```
- Success Response:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "1",
      "username": "johndoe",
      "email": "john@example.com",
      "fullName": "John Doe",
      "role": "user",
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
  }
  ```
- Error Response:
  ```json
  {
    "success": false,
    "message": "Invalid credentials"
  }
  ```

**Authentication for Protected Routes**
- All protected routes require a valid JWT token
- Include token in request header: `x-auth-token`
- Example:
  ```
  headers: {
    'x-auth-token': 'your-jwt-token-here'
  }
  ```

## Project Structure

```
skillswap_backend/
├── config/             # Configuration files
│   └── config.js       # App configuration
├── controllers/        # Request controllers
│   └── auth.js         # Authentication controller
├── middleware/         # Express middleware
│   └── index.js        # Middleware functions
├── models/             # Data models
│   └── user.js         # User model (in-memory)
├── routes/             # API routes
│   └── auth.js         # Auth routes
├── .env                # Environment variables
├── package.json        # Dependencies and scripts
├── README.md           # Project documentation
└── server.js           # Main entry point
```

## Future Extensions

- Database integration (MongoDB/PostgreSQL)
- JWT token-based authentication
- User registration endpoint
- Password reset functionality
- Profile management
- Skills CRUD operations
