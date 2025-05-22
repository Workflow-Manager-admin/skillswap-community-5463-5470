import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
/**
 * ProfileCard component for displaying user profile information in a card format
 * @param {Object} user - The user object containing profile information
 * @param {boolean} compact - Whether to show the compact version of the card
 */
const ProfileCard = ({ user, compact = false }) => {
  if (!user) return null;
  
  const {
    id,
    name,
    avatar,
    title,
    skills = [],
    rating,
    location
  } = user;
  
  if (compact) {
    // Compact version for sidebars and lists
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0.75rem',
        borderRadius: '8px',
        backgroundColor: '#252525',
        marginBottom: '0.75rem',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{ 
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          overflow: 'hidden',
          marginRight: '0.75rem'
        }}>
          <img 
            src={avatar || 'https://via.placeholder.com/40?text=User'}
            alt={`${name} avatar`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div>
          <Link to={`/profile/${id}`} style={{ color: 'var(--text-color)', textDecoration: 'none' }}>
            <h4 style={{ margin: 0, fontSize: '1rem' }}>{name}</h4>
          </Link>
          {title && <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{title}</p>}
        </div>
      </div>
    );
  }
  
  // Regular profile card with more details
  return (
    <div style={{
      backgroundColor: '#252525',
      borderRadius: '8px',
      overflow: 'hidden',
      border: '1px solid var(--border-color)'
    }}>
      {/* Cover/background */}
      <div style={{ 
        height: '80px', 
        backgroundColor: 'var(--kavia-orange)',
        opacity: 0.7
      }} />
      
      {/* Profile info */}
      <div style={{ padding: '0 1.5rem 1.5rem', position: 'relative' }}>
        {/* Avatar */}
        <div style={{ 
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          border: '4px solid #252525',
          overflow: 'hidden',
          marginTop: '-40px',
          backgroundColor: '#181818'
        }}>
          <img 
            src={avatar || 'https://via.placeholder.com/80?text=User'}
            alt={`${name} avatar`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        
        {/* User details */}
        <div style={{ marginTop: '1rem' }}>
          <Link to={`/profile/${id}`} style={{ color: 'var(--text-color)', textDecoration: 'none' }}>
            <h3 style={{ margin: '0 0 0.25rem 0' }}>{name}</h3>
          </Link>
          
          {title && <p style={{ margin: '0 0 0.75rem 0', color: 'var(--text-secondary)' }}>{title}</p>}
          
          {location && (
            <div style={{ display: 'flex', alignItems: 'center', margin: '0.75rem 0', color: 'var(--text-secondary)' }}>
              <span style={{ marginLeft: '0.25rem', fontSize: '0.9rem' }}>{location}</span>
            </div>
          )}
          
          {rating && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              margin: '0.75rem 0'
            }}>
              <span style={{ color: '#FFD700' }}>★</span>
              <span style={{ marginLeft: '0.25rem', color: 'var(--text-color)' }}>{rating}</span>
              <span style={{ marginLeft: '0.25rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>/5.0</span>
            </div>
          )}
          
          {/* Skills list */}
          {skills.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <p style={{ fontWeight: '500', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Top skills:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {skills.slice(0, 3).map((skill, index) => (
                  <span key={index} style={{ 
                    backgroundColor: 'rgba(232, 122, 65, 0.2)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                  }}>
                    {skill}
                  </span>
                ))}
                {skills.length > 3 && (
                  <span style={{ 
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)'
                  }}>
                    +{skills.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
