import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

// PUBLIC_INTERFACE
/**
 * Header component with navigation and user actions
 */
const Header = () => {
  const { currentUser, logout } = useAppContext();
  
  return (
    <header className="navbar">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <div className="logo">
            <span className="logo-symbol">*</span> SkillSwap
          </div>
          
          <nav style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/" style={{ color: 'var(--text-color)', textDecoration: 'none' }}>Home</Link>
            <Link to="/skills" style={{ color: 'var(--text-color)', textDecoration: 'none' }}>Skills</Link>
            <Link to="/community" style={{ color: 'var(--text-color)', textDecoration: 'none' }}>Community</Link>
          </nav>
          
          <div>
            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link to="/profile" style={{ color: 'var(--text-color)', textDecoration: 'none' }}>
                  Profile
                </Link>
                <button className="btn" onClick={logout}>Logout</button>
              </div>
            ) : (
              <div>
                <button className="btn">Login</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
