import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

// PUBLIC_INTERFACE
/**
 * SignUpPage component for SkillSwap Community app
 * Features:
 * - Name, email, password, and confirm password fields
 * - Form validation
 * - Password strength indicator
 * - Error handling
 * - Links to Login page
 * - Integration with AppContext
 */
const SignUpPage = () => {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  // UI state
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const { login, currentUser } = useAppContext();
  const navigate = useNavigate();
  
  // If user is already logged in, redirect to home
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);
  
  // Check password strength whenever password changes
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 1;
    
    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 1;
    
    // Contains numbers
    if (/[0-9]/.test(password)) strength += 1;
    
    // Contains special characters
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
  }, [password]);
  
  // Get color and text for password strength
  const getPasswordStrengthInfo = () => {
    switch (passwordStrength) {
      case 0: return { color: 'var(--text-tertiary)', text: 'Enter a password' };
      case 1: return { color: 'var(--error)', text: 'Very weak' };
      case 2: return { color: 'var(--error)', text: 'Weak' };
      case 3: return { color: 'var(--warning)', text: 'Moderate' };
      case 4: return { color: 'var(--secondary-color)', text: 'Strong' };
      case 5: return { color: 'var(--success)', text: 'Very strong' };
      default: return { color: 'var(--text-tertiary)', text: '' };
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Validate form
    if (!name.trim()) {
      setError('Name is required');
      setIsLoading(false);
      return;
    }
    
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
    
    if (!password) {
      setError('Password is required');
      setIsLoading(false);
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    if (!agreeTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy');
      setIsLoading(false);
      return;
    }
    
    // Mock user registration
    setTimeout(() => {
      // For demo purposes, simulate a successful registration with any valid input
      // In a real app, this would connect to a backend service
      try {
        // Create a mock user object
        const mockUser = {
          id: `user_${Date.now()}`,
          name: name,
          email: email,
          avatar: 'https://via.placeholder.com/150?text=User'
        };
        
        // Log the user in (using the existing login function from context)
        login(mockUser);
        
        // Redirect to home page
        navigate('/');
      } catch (err) {
        setError('An error occurred during registration. Please try again.');
      }
      
      setIsLoading(false);
    }, 1000);
  };
  
  // Array of skill icons and names for animation (similar to login page)
  const skillItems = [
    { name: 'Design', icon: '🎨' },
    { name: 'Music', icon: '🎵' },
    { name: 'Coding', icon: '💻' },
    { name: 'Language', icon: '🗣️' },
    { name: 'Cooking', icon: '🍳' }
  ];
  
  const [animationStep, setAnimationStep] = useState(0);
  
  // Animate skills icons
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 5);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const passwordStrengthInfo = getPasswordStrengthInfo();
  
  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-left">
          <div className="signup-branding">
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
            
            <div className="signup-tagline">
              <p>Join our community of passionate learners and teachers</p>
            </div>
          </div>
        </div>
        
        <div className="signup-right">
          <div className="signup-form-container">
            <h2>Create Account</h2>
            <p>Join SkillSwap and start your learning journey</p>
            
            {error && (
              <div className="error-message">
                <span className="error-icon">!</span> {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="signup-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Enter your full name"
                  autoComplete="name"
                />
              </div>
              
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
              
              <div className="form-group password-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-container">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Create a password"
                    autoComplete="new-password"
                  />
                  <button 
                    type="button" 
                    className="toggle-password" 
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                
                {/* Password strength indicator */}
                <div className="password-strength">
                  <div className="strength-bars">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div 
                        key={level} 
                        className={`strength-bar ${passwordStrength >= level ? 'active' : ''}`}
                        style={{ 
                          backgroundColor: passwordStrength >= level 
                            ? passwordStrengthInfo.color 
                            : 'rgba(255, 255, 255, 0.1)' 
                        }}
                      ></div>
                    ))}
                  </div>
                  <span className="strength-text" style={{ color: passwordStrengthInfo.color }}>
                    {passwordStrengthInfo.text}
                  </span>
                </div>
              </div>
              
              <div className="form-group password-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-input-container">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    id="confirmPassword" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                  />
                </div>
              </div>
              
              <div className="form-group checkbox-group">
                <div className="terms-checkbox">
                  <input 
                    type="checkbox" 
                    id="agreeTerms" 
                    checked={agreeTerms} 
                    onChange={() => setAgreeTerms(!agreeTerms)} 
                  />
                  <label htmlFor="agreeTerms">
                    I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
                  </label>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="signup-button" 
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
            
            <div className="login-prompt">
              <p>Already have an account? <Link to="/login">Sign In</Link></p>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        /* SignUp Page Styles */
        .signup-page {
          min-height: calc(100vh - 70px);
          width: 100%;
          background-color: var(--bg-dark);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0;
          box-sizing: border-box;
        }
        
        .signup-container {
          display: flex;
          width: 90%;
          max-width: 1200px;
          min-height: 600px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          margin: 2rem 0;
        }
        
        .signup-left {
          flex: 1;
          background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-color) 100%);
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        
        .signup-branding {
          text-align: center;
          z-index: 1;
        }
        
        .signup-branding h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          color: white;
        }
        
        .signup-branding p {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2rem;
        }
        
        .signup-tagline {
          margin-top: 2rem;
          text-align: center;
        }
        
        .signup-tagline p {
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
        
        .signup-right {
          flex: 1;
          background-color: var(--bg-card);
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .signup-form-container {
          max-width: 400px;
          margin: 0 auto;
          width: 100%;
        }
        
        .signup-form-container h2 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }
        
        .signup-form-container > p {
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }
        
        .signup-form {
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
        
        .password-strength {
          display: flex;
          align-items: center;
          margin-top: 0.5rem;
          gap: 0.75rem;
        }
        
        .strength-bars {
          display: flex;
          gap: 4px;
          flex-grow: 1;
        }
        
        .strength-bar {
          height: 4px;
          border-radius: 2px;
          background-color: rgba(255, 255, 255, 0.1);
          flex: 1;
          transition: background-color 0.3s ease;
        }
        
        .strength-bar.active {
          background-color: var(--primary-color);
        }
        
        .strength-text {
          font-size: 0.8rem;
          min-width: 80px;
        }
        
        .checkbox-group {
          margin-top: 0.5rem;
        }
        
        .terms-checkbox {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }
        
        .terms-checkbox input {
          margin-top: 0.3rem;
          accent-color: var(--primary-color);
        }
        
        .terms-checkbox label {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin: 0;
          line-height: 1.5;
        }
        
        .terms-checkbox a {
          color: var(--primary-color);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        
        .terms-checkbox a:hover {
          color: var(--primary-light);
          text-decoration: underline;
        }
        
        .signup-button {
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
        
        .signup-button:hover:not(:disabled) {
          background-color: var(--primary-light);
          box-shadow: var(--shadow-md);
        }
        
        .signup-button:disabled {
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
        
        /* Responsive adjustments */
        @media (max-width: 992px) {
          .signup-container {
            flex-direction: column;
            height: auto;
          }
          
          .signup-left,
          .signup-right {
            width: 100%;
            padding: 2rem;
          }
          
          .signup-left {
            padding-bottom: 1rem;
          }
          
          .signup-right {
            padding-top: 1rem;
          }
        }
        
        @media (max-width: 480px) {
          .signup-page {
            padding: 1rem;
          }
          
          .signup-container {
            width: 100%;
            margin: 0;
            border-radius: 0;
          }
          
          .signup-left,
          .signup-right {
            padding: 1.5rem;
          }
          
          .signup-branding h1 {
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

export default SignUpPage;
