import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

// PUBLIC_INTERFACE
/**
 * Custom LoginPage component for SkillSwap Community app
 * Features:
 * - Username/email and password fields
 * - Show/Hide password toggle
 * - Remember Me checkbox
 * - Error handling for failed logins
 * - Links for Forgot Password and Sign Up
 * - Animated skill-themed visual elements
 */
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, currentUser } = useAppContext();
  const navigate = useNavigate();
  
  // If user is already logged in, redirect to home
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);
  
  // Animation-related state
  const [animationStep, setAnimationStep] = useState(0);
  
  // Animate skills icons
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 5);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Client-side validation - both fields are required
    if (!email.trim()) {
      setError('Email or username is required');
      setIsLoading(false);
      return;
    }
    
    if (!password.trim()) {
      setError('Password is required');
      setIsLoading(false);
      return;
    }
    
    try {
      // Call login function from context with username/email and password
      const result = await login(email, password);
      
      if (result.success) {
        // If "Remember Me" is checked, save to localStorage
        if (rememberMe) {
          localStorage.setItem('skillswap_user_email', email);
        } else {
          localStorage.removeItem('skillswap_user_email');
        }
        
        // Redirect to home page on successful login
        navigate('/');
      } else {
        // Display appropriate error message based on the status code
        if (result.status === 401) {
          setError('Invalid username/email or password');
        } else if (result.status === 400) {
          setError('Both username/email and password are required');
        } else {
          setError(result.message || 'Login failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Check for saved email on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('skillswap_user_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);
  
  // Array of skill icons and names for animation
  const skillItems = [
    { name: 'Design', icon: '🎨' },
    { name: 'Music', icon: '🎵' },
    { name: 'Coding', icon: '💻' },
    { name: 'Language', icon: '🗣️' },
    { name: 'Cooking', icon: '🍳' }
  ];
  
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <div className="login-branding">
            <h1>SkillSwap</h1>
            <p>Connect. Learn. Share.</p>
            
            {/* Animated skills illustration */}
            <div className="skills-animation">
              {skillItems.map((skill, index) => (
                <div 
                  key={index} 
                  className={`skill-item ${animationStep === index ? 'active' : ''}`}
                >
                  <span className="skill-icon">{skill.icon}</span>
                  <span className="skill-name">{skill.name}</span>
                </div>
              ))}
              
              {/* Animated connecting lines between skills */}
              <div className="connecting-lines">
                <div className={`line line-1 ${animationStep === 1 || animationStep === 4 ? 'active' : ''}`}></div>
                <div className={`line line-2 ${animationStep === 2 ? 'active' : ''}`}></div>
                <div className={`line line-3 ${animationStep === 3 ? 'active' : ''}`}></div>
                <div className={`line line-4 ${animationStep === 0 ? 'active' : ''}`}></div>
              </div>
            </div>
            
            <div className="login-tagline">
              <p>Join our community of passionate learners and teachers</p>
            </div>
          </div>
        </div>
        
        <div className="login-right">
          <div className="login-form-container">
            <h2>Welcome Back</h2>
            <p>Sign in to continue your learning journey</p>
            
            {error && (
              <div className="error-message">
                <span className="error-icon">!</span> {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email or Username</label>
                <input 
                  type="text" 
                  id="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Enter your email or username"
                />
              </div>
              
              <div className="form-group password-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-container">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Enter your password"
                  />
                  <button 
                    type="button" 
                    className="toggle-password" 
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              
              <div className="form-extras">
                <div className="remember-me">
                  <input 
                    type="checkbox" 
                    id="rememberMe" 
                    checked={rememberMe} 
                    onChange={() => setRememberMe(!rememberMe)} 
                  />
                  <label htmlFor="rememberMe">Remember Me</label>
                </div>
                
                <Link to="/forgot-password" className="forgot-password">
                  Forgot Password?
                </Link>
              </div>
              
              <button 
                type="submit" 
                className="login-button" 
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
            
            <div className="signup-prompt">
              <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        /* Login Page Styles */
        .login-page {
          min-height: calc(100vh - 70px);
          width: 100%;
          background-color: var(--bg-dark);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0;
          box-sizing: border-box;
        }
        
        .login-container {
          display: flex;
          width: 90%;
          max-width: 1200px;
          min-height: 600px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          margin: 2rem 0;
        }
        
        .login-left {
          flex: 1;
          background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-color) 100%);
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        
        .login-branding {
          text-align: center;
          z-index: 1;
        }
        
        .login-branding h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          color: white;
        }
        
        .login-branding p {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2rem;
        }
        
        .login-tagline {
          margin-top: 2rem;
          text-align: center;
        }
        
        .login-tagline p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.1rem;
          line-height: 1.5;
        }
        
        .skills-animation {
          position: relative;
          height: 220px;
          width: 220px;
          margin: 2rem auto;
        }
        
        .skill-item {
          position: absolute;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          transition: all 0.5s ease;
          opacity: 0.7;
          transform: scale(0.9);
        }
        
        .skill-item.active {
          background-color: rgba(255, 255, 255, 0.25);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
          opacity: 1;
        }
        
        .skill-icon {
          font-size: 1.8rem;
          margin-bottom: 0.25rem;
        }
        
        .skill-name {
          font-size: 0.7rem;
          color: white;
        }
        
        /* Position the skills in a circle */
        .skill-item:nth-child(1) { /* Design */
          top: 0;
          left: 50%;
          transform: translateX(-50%);
        }
        
        .skill-item:nth-child(2) { /* Music */
          top: 30%;
          right: 0;
        }
        
        .skill-item:nth-child(3) { /* Coding */
          bottom: 0;
          right: 30%;
        }
        
        .skill-item:nth-child(4) { /* Language */
          bottom: 0;
          left: 30%;
        }
        
        .skill-item:nth-child(5) { /* Cooking */
          top: 30%;
          left: 0;
        }
        
        .skill-item.active:nth-child(1) {
          transform: translateX(-50%) scale(1.1);
        }
        
        .connecting-lines {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
        
        .line {
          position: absolute;
          background-color: rgba(255, 255, 255, 0.1);
          height: 2px;
          transition: all 0.5s ease;
        }
        
        .line.active {
          background-color: rgba(255, 255, 255, 0.6);
        }
        
        .line-1 {
          width: 50%;
          top: 30px;
          left: 25%;
          transform: rotate(45deg);
        }
        
        .line-2 {
          width: 50%;
          top: 30px;
          right: 25%;
          transform: rotate(-45deg);
        }
        
        .line-3 {
          width: 50%;
          bottom: 80px;
          right: 25%;
          transform: rotate(45deg);
        }
        
        .line-4 {
          width: 50%;
          bottom: 80px;
          left: 25%;
          transform: rotate(-45deg);
        }
        
        .login-right {
          flex: 1;
          background-color: var(--bg-card);
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .login-form-container {
          max-width: 400px;
          margin: 0 auto;
          width: 100%;
        }
        
        .login-form-container h2 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }
        
        .login-form-container > p {
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }
        
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
        }
        
        .form-group label {
          margin-bottom: 0.5rem;
          color: var(--text-secondary);
        }
        
        .form-group input {
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          background-color: var(--bg-dark);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          font-size: 1rem;
          transition: all 0.2s ease;
        }
        
        .form-group input:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 2px rgba(62, 81, 181, 0.2);
        }
        
        .password-group {
          position: relative;
        }
        
        .password-input-container {
          position: relative;
        }
        
        .toggle-password {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 0.9rem;
          padding: 0;
        }
        
        .toggle-password:hover {
          color: var(--primary-color);
        }
        
        .form-extras {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        
        .remember-me {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .remember-me input {
          accent-color: var(--primary-color);
        }
        
        .remember-me label {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        
        .forgot-password {
          color: var(--primary-color);
          font-size: 0.9rem;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        
        .forgot-password:hover {
          color: var(--primary-light);
          text-decoration: underline;
        }
        
        .login-button {
          background-color: var(--primary-color);
          color: white;
          border: none;
          padding: 1rem;
          border-radius: var(--radius-sm);
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }
        
        .login-button:hover:not(:disabled) {
          background-color: var(--primary-light);
          box-shadow: var(--shadow-md);
        }
        
        .login-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .signup-prompt {
          margin-top: 2rem;
          text-align: center;
          color: var(--text-secondary);
        }
        
        .signup-prompt a {
          color: var(--primary-color);
          text-decoration: none;
          font-weight: 500;
        }
        
        .signup-prompt a:hover {
          text-decoration: underline;
          color: var(--primary-light);
        }
        
        .error-message {
          background-color: rgba(244, 67, 54, 0.1);
          color: var(--error);
          padding: 1rem;
          border-radius: var(--radius-sm);
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .error-icon {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: var(--error);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.8rem;
        }
        
        /* Responsive adjustments */
        @media (max-width: 992px) {
          .login-container {
            flex-direction: column;
            height: auto;
          }
          
          .login-left,
          .login-right {
            width: 100%;
            padding: 2rem;
          }
          
          .login-left {
            padding-bottom: 1rem;
          }
          
          .login-right {
            padding-top: 1rem;
          }
        }
        
        @media (max-width: 480px) {
          .login-page {
            padding: 1rem;
          }
          
          .login-container {
            width: 100%;
            margin: 0;
            border-radius: 0;
          }
          
          .login-left,
          .login-right {
            padding: 1.5rem;
          }
          
          .login-branding h1 {
            font-size: 2rem;
          }
          
          .skills-animation {
            height: 180px;
            width: 180px;
          }
          
          .skill-item {
            width: 50px;
            height: 50px;
          }
          
          .skill-icon {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
