import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
/**
 * Sidebar component for quick navigation and filters
 */
const Sidebar = () => {
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
  
  return (
    <aside style={{ width: '250px', padding: '20px', borderRight: '1px solid var(--border-color)' }}>
      <div>
        <h3>Categories</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {categories.map((category, index) => (
            <li key={index} style={{ margin: '8px 0' }}>
              <Link 
                to={`/skills/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                style={{ color: 'var(--text-color)', textDecoration: 'none' }}
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <h3>Quick Links</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ margin: '8px 0' }}>
            <Link to="/skills/popular" style={{ color: 'var(--text-color)', textDecoration: 'none' }}>Popular Skills</Link>
          </li>
          <li style={{ margin: '8px 0' }}>
            <Link to="/skills/new" style={{ color: 'var(--text-color)', textDecoration: 'none' }}>Recently Added</Link>
          </li>
          <li style={{ margin: '8px 0' }}>
            <Link to="/community/events" style={{ color: 'var(--text-color)', textDecoration: 'none' }}>Upcoming Events</Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
