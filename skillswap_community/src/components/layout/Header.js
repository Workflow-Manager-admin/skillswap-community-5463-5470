import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import ThemeToggle from './ThemeToggle';

// PUBLIC_INTERFACE
/**
 * Header component with navigation, user actions, and responsive menu
 * @param {Object} props - Component props
 * @param {Function} props.toggleSidebar - Function to toggle sidebar visibility
 * @param {Boolean} props.isMobile - Flag indicating if viewport is mobile size
 */
const Header = ({ toggleSidebar, isMobile }) => {
  const { currentUser, logout } = useAppContext();
  const location = useLocation();
  
  // Check if the current path matches the link path
  const isActive = (path) => location.pathname === path;
  
  return (
    <header className="navbar">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
            {isMobile && (
              <button 
                onClick={toggleSidebar}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px',
                  marginRight: '4px'
                }}
                aria-label="Toggle sidebar menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            )}
            <Link to="/" style={{ textDecoration: 'none' }}>
              <div className="logo">
                <span className="logo-symbol">⬢</span> SkillSwap
              </div>
            </Link>
          </div>
          
          {!isMobile && (
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
          )}
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
            <ThemeToggle />
            
            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                {!isMobile && (
                  <Link 
                    to="/profile" 
                    className={`nav-link ${isActive('/profile') || location.pathname.includes('/profile/') ? 'active' : ''}`}
                  >
                    Profile
                  </Link>
                )}
                <button className="btn btn-accent" onClick={logout}>Logout</button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                <Link to="/login" className="btn">Login</Link>
                {!isMobile && (
                  <Link to="/register" className="btn btn-outline">Sign Up</Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
