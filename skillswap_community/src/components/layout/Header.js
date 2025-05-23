import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import ThemeToggle from './ThemeToggle';

// PUBLIC_INTERFACE
/**
 * Header component with navigation and user actions
 */
const Header = () => {
  const { currentUser, logout } = useAppContext();
  const location = useLocation();
  
  // Check if the current path matches the link path
  const isActive = (path) => location.pathname === path;
  
  return (
    <header className="navbar">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className="logo">
              <span className="logo-symbol">⬢</span> SkillSwap
            </div>
          </Link>
          
          <nav style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/skills" 
              className={`nav-link ${isActive('/skills') || location.pathname.includes('/skills/') ? 'active' : ''}`}
            >
              Skills
            </Link>
            <Link 
              to="/community" 
              className={`nav-link ${isActive('/community') || location.pathname.includes('/community/') ? 'active' : ''}`}
            >
              Community
            </Link>
          </nav>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
            <ThemeToggle />
            
            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                <Link 
                  to="/profile" 
                  className={`nav-link ${isActive('/profile') || location.pathname.includes('/profile/') ? 'active' : ''}`}
                >
                  Profile
                </Link>
                <button className="btn btn-accent" onClick={logout}>Logout</button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                <Link to="/login" className="btn">Login</Link>
                <Link to="/register" className="btn btn-outline">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
