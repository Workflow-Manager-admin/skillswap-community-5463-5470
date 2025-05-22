import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
/**
 * Footer component with site information and links
 */
const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: 'var(--kavia-dark)', 
      borderTop: '1px solid var(--border-color)',
      padding: '2rem 0',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div style={{ marginBottom: '1.5rem', minWidth: '200px' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> SkillSwap
            </div>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '300px', margin: '1rem 0' }}>
              A peer-to-peer skill exchange platform where users can teach and learn skills from each other.
            </p>
          </div>
          
          <div style={{ marginBottom: '1.5rem', minWidth: '150px' }}>
            <h4 style={{ marginBottom: '1rem' }}>Navigation</h4>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
              <li style={{ margin: '0.5rem 0' }}><Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link></li>
              <li style={{ margin: '0.5rem 0' }}><Link to="/skills" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Skills</Link></li>
              <li style={{ margin: '0.5rem 0' }}><Link to="/community" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Community</Link></li>
              <li style={{ margin: '0.5rem 0' }}><Link to="/profile" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Profile</Link></li>
            </ul>
          </div>
          
          <div style={{ marginBottom: '1.5rem', minWidth: '150px' }}>
            <h4 style={{ marginBottom: '1rem' }}>Resources</h4>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
              <li style={{ margin: '0.5rem 0' }}><Link to="/faq" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>FAQ</Link></li>
              <li style={{ margin: '0.5rem 0' }}><Link to="/terms" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Terms of Service</Link></li>
              <li style={{ margin: '0.5rem 0' }}><Link to="/privacy" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Privacy Policy</Link></li>
              <li style={{ margin: '0.5rem 0' }}><Link to="/contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>© {new Date().getFullYear()} SkillSwap Community. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
