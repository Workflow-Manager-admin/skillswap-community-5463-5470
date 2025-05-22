import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// PUBLIC_INTERFACE
/**
 * Sidebar component for quick navigation and filters
 */
const Sidebar = () => {
  const location = useLocation();
  const categories = [
    'Technology', 
    'Art & Design', 
    'Music', 
    'Languages', 
    'Cooking', 
    'Fitness', 
    'Business', 
    'Education'
  ];
  
  // Check if the current path includes the link path
  const isActive = (path) => location.pathname.includes(path);
  
  return (
    <aside style={{ 
      width: '250px', 
      padding: 'var(--spacing-lg)', 
      borderRight: '1px solid var(--border-color)',
      backgroundColor: 'var(--bg-card)'
    }}>
      <div>
        <h3 style={{ 
          color: 'var(--text-primary)',
          fontSize: 'var(--font-size-lg)',
          marginBottom: 'var(--spacing-md)'
        }}>
          Categories
        </h3>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {categories.map((category, index) => {
            const categoryPath = `/skills/category/${category.toLowerCase().replace(/\s+/g, '-')}`;
            const active = isActive(categoryPath);
            
            return (
              <li key={index} style={{ margin: 'var(--spacing-xs) 0' }}>
                <Link 
                  to={categoryPath}
                  style={{ 
                    color: active ? 'var(--primary-light)' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontWeight: active ? '500' : 'normal',
                    padding: 'var(--spacing-xs) var(--spacing-sm)',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: active ? 'var(--active-overlay)' : 'transparent',
                    display: 'block',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {category}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      
      <div style={{ 
        marginTop: 'var(--spacing-xl)',
        padding: 'var(--spacing-md)',
        backgroundColor: 'var(--bg-elevated)',
        borderRadius: 'var(--radius-md)'
      }}>
        <h3 style={{ 
          color: 'var(--text-primary)',
          fontSize: 'var(--font-size-lg)',
          marginBottom: 'var(--spacing-md)',
          marginTop: 0
        }}>
          Quick Links
        </h3>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {[
            { to: '/skills/popular', label: 'Popular Skills' },
            { to: '/skills/new', label: 'Recently Added' },
            { to: '/community/events', label: 'Upcoming Events' }
          ].map((link, index) => {
            const active = isActive(link.to);
            
            return (
              <li key={index} style={{ margin: 'var(--spacing-xs) 0' }}>
                <Link 
                  to={link.to} 
                  style={{ 
                    color: active ? 'var(--secondary-color)' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontWeight: active ? '500' : 'normal',
                    display: 'block',
                    padding: 'var(--spacing-xs) var(--spacing-sm)',
                    borderRadius: 'var(--radius-sm)',
                    transition: 'color var(--transition-fast)'
                  }}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
