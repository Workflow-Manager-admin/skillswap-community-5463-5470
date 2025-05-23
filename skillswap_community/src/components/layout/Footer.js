import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
/**
 * Footer component with site information and links
 */
const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: 'var(--bg-elevated)', 
      borderTop: '1px solid var(--border-color)',
      padding: 'var(--spacing-xl) 0',
      marginTop: 'auto',
      width: '100%',
      position: 'relative',
      zIndex: 5
    }}>
      <div className="container">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          flexWrap: 'wrap', 
          gap: 'var(--spacing-xl)' 
        }}>
          <div style={{ 
            marginBottom: 'var(--spacing-lg)', 
            minWidth: '200px',
            flex: '1 1 300px' 
          }}>
            <div className="logo" style={{ marginBottom: 'var(--spacing-md)' }}>
              <span className="logo-symbol">⬢</span> SkillSwap
            </div>
            <p style={{ 
              color: 'var(--text-secondary)', 
              maxWidth: '400px', 
              margin: 'var(--spacing-md) 0',
              fontSize: 'var(--font-size-md)',
              lineHeight: '1.6'
            }}>
              A peer-to-peer skill exchange platform where users can teach and learn skills from each other.
            </p>
            
            <div style={{ 
              display: 'flex', 
              gap: 'var(--spacing-md)', 
              marginTop: 'var(--spacing-lg)' 
            }}>
              {/* Social media links - placeholder icons */}
              {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map((social) => (
                <a 
                  key={social} 
                  href={`#${social.toLowerCase()}`}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-circle)',
                    backgroundColor: 'var(--bg-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontSize: 'var(--font-size-sm)',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>
          
          <div style={{ 
            marginBottom: 'var(--spacing-lg)', 
            minWidth: '150px',
            flex: '1 1 150px' 
          }}>
            <h4 style={{ 
              marginBottom: 'var(--spacing-md)',
              fontSize: 'var(--font-size-lg)',
              fontWeight: '600',
              color: 'var(--text-primary)'
            }}>
              Navigation
            </h4>
            <ul style={{ 
              listStyleType: 'none', 
              padding: 0, 
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-sm)'
            }}>
              {[
                { to: '/', label: 'Home' },
                { to: '/skills', label: 'Skills' },
                { to: '/community', label: 'Community' },
                { to: '/profile', label: 'Profile' }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.to} 
                    style={{ 
                      color: 'var(--text-secondary)', 
                      textDecoration: 'none',
                      fontSize: 'var(--font-size-md)',
                      transition: 'color var(--transition-fast)',
                      display: 'inline-block',
                      padding: 'var(--spacing-xs) 0'
                    }}
                    onMouseOver={(e) => e.target.style.color = 'var(--primary-light)'}
                    onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div style={{ 
            marginBottom: 'var(--spacing-lg)', 
            minWidth: '150px',
            flex: '1 1 150px'
          }}>
            <h4 style={{ 
              marginBottom: 'var(--spacing-md)',
              fontSize: 'var(--font-size-lg)',
              fontWeight: '600',
              color: 'var(--text-primary)'
            }}>
              Resources
            </h4>
            <ul style={{ 
              listStyleType: 'none', 
              padding: 0, 
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-sm)'
            }}>
              {[
                { to: '/faq', label: 'FAQ' },
                { to: '/terms', label: 'Terms of Service' },
                { to: '/privacy', label: 'Privacy Policy' },
                { to: '/contact', label: 'Contact Us' }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.to} 
                    style={{ 
                      color: 'var(--text-secondary)', 
                      textDecoration: 'none',
                      fontSize: 'var(--font-size-md)',
                      transition: 'color var(--transition-fast)',
                      display: 'inline-block',
                      padding: 'var(--spacing-xs) 0'
                    }}
                    onMouseOver={(e) => e.target.style.color = 'var(--primary-light)'}
                    onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div style={{ 
          borderTop: '1px solid var(--border-color)', 
          paddingTop: 'var(--spacing-lg)', 
          marginTop: 'var(--spacing-lg)', 
          textAlign: 'center' 
        }}>
          <p style={{ 
            color: 'var(--text-tertiary)',
            fontSize: 'var(--font-size-sm)'
          }}>
            © {new Date().getFullYear()} SkillSwap Community. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
