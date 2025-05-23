import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import LoginPage from './pages/LoginPage';

// Mock fetch globally
global.fetch = jest.fn();

// Mock localStorage
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn(key => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

// Helper function to render component within required providers
const renderLoginPage = () => {
  return render(
    <AppProvider>
      <Router>
        <LoginPage />
      </Router>
    </AppProvider>
  );
};

// Reset mocks before each test
beforeEach(() => {
  fetch.mockClear();
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.removeItem.mockClear();
});

describe('Login functionality tests', () => {
  
  test('Login form elements render correctly', () => {
    renderLoginPage();
    
    expect(screen.getByLabelText(/email or username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/remember me/i)).toBeInTheDocument();
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
  });
  
  test('Login with correct credentials shows success and issues JWT token', async () => {
    // Mock successful login response with token
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        success: true,
        token: 'mock-jwt-token',
        user: { id: '1', username: 'johndoe' },
        message: 'Login successful'
      })
    });
    
    renderLoginPage();
    
    // Fill the form
    fireEvent.change(screen.getByLabelText(/email or username/i), {
      target: { value: 'johndoe' }
    });
    
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    // Check if fetch was called with correct data
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'johndoe', password: 'password123' })
      });
    });
    
    // Check localStorage for token
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'skillswap_token', 
        'mock-jwt-token'
      );
    });
  });
  
  test('Login with incorrect password shows error message', async () => {
    // Mock failed login response
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({
        success: false,
        message: 'Invalid credentials'
      })
    });
    
    renderLoginPage();
    
    // Fill the form with incorrect password
    fireEvent.change(screen.getByLabelText(/email or username/i), {
      target: { value: 'johndoe' }
    });
    
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpassword' }
    });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    // Check if error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/invalid username\/email or password/i)).toBeInTheDocument();
    });
    
    // Check that token was not stored
    expect(localStorageMock.setItem).not.toHaveBeenCalledWith(
      'skillswap_token',
      expect.anything()
    );
  });
  
  test('Login with blank password shows validation error', async () => {
    renderLoginPage();
    
    // Fill email but leave password empty
    fireEvent.change(screen.getByLabelText(/email or username/i), {
      target: { value: 'johndoe' }
    });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    // Check if validation error is displayed
    await waitFor(() => {
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
    
    // Check that fetch was not called
    expect(fetch).not.toHaveBeenCalled();
  });
  
  test('Login with non-existent user shows error', async () => {
    // Mock 401 response for non-existent user
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({
        success: false,
        message: 'Invalid credentials'
      })
    });
    
    renderLoginPage();
    
    // Fill the form with non-existent user
    fireEvent.change(screen.getByLabelText(/email or username/i), {
      target: { value: 'nonexistentuser' }
    });
    
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    // Check if error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/invalid username\/email or password/i)).toBeInTheDocument();
    });
  });
  
  test('Remember me functionality works correctly', async () => {
    // Mock successful login
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        success: true,
        token: 'mock-jwt-token',
        user: { id: '1', username: 'johndoe' }
      })
    });
    
    renderLoginPage();
    
    // Fill the form
    fireEvent.change(screen.getByLabelText(/email or username/i), {
      target: { value: 'johndoe' }
    });
    
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });
    
    // Check "Remember Me"
    fireEvent.click(screen.getByLabelText(/remember me/i));
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    // Check if localStorage saves email
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'skillswap_user_email',
        'johndoe'
      );
    });
  });
});