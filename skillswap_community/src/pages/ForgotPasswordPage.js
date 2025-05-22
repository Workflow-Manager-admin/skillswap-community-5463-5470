import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

// PUBLIC_INTERFACE
/**
 * ForgotPasswordPage component for SkillSwap Community app
 * Features:
 * - Email input field for identifying user account
 * - Success confirmation messaging
 * - Clear instructions for the password reset process
 * - Error handling for invalid/non-existing emails
 * - Integration with AppContext for password reset requests
 * - Navigation back to login page
 * - Animated skill-themed visual elements (consistent with login/signup pages)
 */
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { currentUser } = useAppContext();
  const navigate = useNavigate();
  
  // If user is already logged in, redirect to home
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);
  
  // Animation-related state (matching login page)
  const [animationStep, setAnimationStep] = useState(0);
  
  // Animate skills icons
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 5);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Validate email
    if (!email.trim()) {
      setError('Email is required');
      setIsLoading(false);
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }
    
    // Mock password reset request
    setTimeout(() => {
      // For demo purposes, simulate a successful password reset request
      // In a real app, this would connect to an authentication service
      
      // Show success message
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };
  
  // Array of skill icons and names for animation (same as login page)
  const skillItems = [
    { name: 'Design', icon: '🎨' },
    { name: 'Music', icon: '🎵' },
    { name: 'Coding', icon: '💻' },
    { name: 'Language', icon: '🗣️' },
    { name: 'Cooking', icon: '🍳' }
  ];
  
  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <div className="forgot-password-left">
          <div className="forgot-password-branding">
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
            
            <div className="forgot-password-tagline">
              <p>Join our community of passionate learners and teachers</p>
            </div>
          </div>
        </div>
        
        <div className="forgot-password-right">
          {!isSubmitted ? (
            <div className="forgot-password-form-container">
              <h2>Reset Your Password</h2>
              <p>
                Enter your email address and we'll send you instructions to reset your password.
              </p>
              
              {error && (
                <div className="error-message">
                  <span className="error-icon">!</span> {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="forgot-password-form">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter your email address"
                    autoComplete="email"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="reset-password-button" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Reset Password'}
                </button>
              </form>
              
              <div className="login-prompt">
                <p>Remembered your password? <Link to="/login">Back to Sign In</Link></p>
              </div>
            </div>
          ) : (
            <div className="success-container">
              <div className="success-icon">✓</div>
              <h2>Check Your Email</h2>
              <p>
                We've sent password reset instructions to:
              </p>
              <div className="email-highlight">
                {email}
              </div>
              <p className="instructions">
                Please check your inbox and follow the link in the email to reset your password. 
                The link will expire in 24 hours.
              </p>
              <p className="note">
                If you don't see the email, please check your spam folder or 
                <button 
                  onClick={handleSubmit}
                  className="resend-button"
                >
                  click here to resend
                </button>
              </p>
              <Link to="/login" className="back-button">
                Back to Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        /* Forgot Password Page Styles */
        .forgot-password-page {
          min-height: calc(100vh - 70px);
          width: 100%;
          background-color: var(--bg-dark);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0;
          box-sizing: border-box;
        }
        
        .forgot-password-container {
          display: flex;
          width: 90%;
          max-width: 1200px;
          min-height: 600px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          margin: 2rem 0;
        }
        
        .forgot-password-left {
          flex: 1;
          background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-color) 100%);
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        
        .forgot-password-branding {
          text-align: center;
          z-index: 1;
        }
        
        .forgot-password-branding h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          color: white;
        }
        
        .forgot-password-branding p {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2rem;
        }
        
        .forgot-password-tagline {
          margin-top: 2rem;
          text-align: center;
        }
        
        .forgot-password-tagline p {
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
        
        .forgot-password-right {
          flex: 1;
          background-color: var(--bg-card);
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .forgot-password-form-container {
          max-width: 400px;
          margin: 0 auto;
          width: 100%;
        }
        
        .forgot-password-form-container h2 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }
        
        .forgot-password-form-container > p {
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }
        
        .forgot-password-form {
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
        
        .reset-password-button {
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
        
        .reset-password-button:hover:not(:disabled) {
          background-color: var(--primary-light);
          box-shadow: var(--shadow-md);
        }
        
        .reset-password-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .login-prompt {
          margin-top: 2rem;
          text-align: center;
          color: var(--text-secondary);
        }
        
        .login-prompt a {
          color: var(--primary-color);
          text-decoration: none;
          font-weight: 500;
        }
        
        .login-prompt a:hover {
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
        
        /* Success view styles */
        .success-container {
          max-width: 400px;
          margin: 0 auto;
          text-align: center;
        }
        
        .success-icon {
          width: 64px;
          height: 64px;
          background-color: var(--success);
          border-radius: 50%;
          margin: 0 auto 1.5rem auto;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: white;
        }
        
        .success-container h2 {
          font-size: 1.75rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }
        
        .success-container p {
          color: var(--text-secondary);
          margin-bottom: 1rem;
        }
        
        .email-highlight {
          background-color: rgba(38, 198, 218, 0.1);
          color: var(--secondary-color);
          padding: 0.75rem;
          border-radius: var(--radius-sm);
          margin: 1rem 0;
          font-weight: 500;
          word-break: break-all;
        }
        
        .instructions {
          margin: 1.5rem 0;
          line-height: 1.6;
        }
        
        .note {
          color: var(--text-tertiary);
          font-size: 0.9rem;
          margin-bottom: 2rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.25rem;
        }
        
        .resend-button {
          background: none;
          border: none;
          color: var(--primary-color);
          font-size: 0.9rem;
          padding: 0;
          cursor: pointer;
          text-decoration: underline;
          font-family: inherit;
        }
        
        .back-button {
          background-color: transparent;
          border: 1px solid var(--primary-color);
          color: var(--primary-color);
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-sm);
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-block;
          text-decoration: none;
        }
        
        .back-button:hover {
          background-color: var(--active-overlay);
        }
        
        /* Responsive adjustments */
        @media (max-width: 992px) {
          .forgot-password-container {
            flex-direction: column;
            height: auto;
          }
          
          .forgot-password-left,
          .forgot-password-right {
            width: 100%;
            padding: 2rem;
          }
          
          .forgot-password-left {
            padding-bottom: 1rem;
          }
          
          .forgot-password-right {
            padding-top: 1rem;
          }
        }
        
        @media (max-width: 480px) {
          .forgot-password-page {
            padding: 1rem;
          }
          
          .forgot-password-container {
            width: 100%;
            margin: 0;
            border-radius: 0;
          }
          
          .forgot-password-left,
          .forgot-password-right {
            padding: 1.5rem;
          }
          
          .forgot-password-branding h1 {
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

export default ForgotPasswordPage;
