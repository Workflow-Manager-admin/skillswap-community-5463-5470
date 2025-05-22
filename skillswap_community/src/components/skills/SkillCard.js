import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
/**
 * SkillCard component that displays information about a skill
 * @param {Object} skill - The skill to display
 * @param {string} skill.id - The unique identifier for the skill
 * @param {string} skill.title - The title of the skill
 * @param {string} skill.description - A short description of the skill
 * @param {string} skill.category - The category the skill belongs to
 * @param {Object} skill.instructor - The user who teaches this skill
 * @param {string} skill.image - URL to an image representing the skill
 */
const SkillCard = ({ skill }) => {
  if (!skill) return null;
  
  const { id, title, description, category, instructor, image } = skill;
  
  return (
    <div style={{
      backgroundColor: '#252525',
      borderRadius: '8px',
      overflow: 'hidden',
      transition: 'transform 0.3s ease',
      border: '1px solid var(--border-color)',
      height: '100%',
    }}>
      {/* Skill Image */}
      <div style={{
        height: '160px',
        backgroundImage: `url(${image || 'https://via.placeholder.com/300x160?text=Skill'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} />
      
      <div style={{ padding: '1.25rem' }}>
        {/* Skill Category */}
        <div style={{ 
          display: 'inline-block',
          backgroundColor: 'var(--kavia-orange)',
          color: 'white',
          fontSize: '0.75rem',
          padding: '0.25rem 0.5rem',
          borderRadius: '4px',
          marginBottom: '0.75rem'
        }}>
          {category}
        </div>
        
        {/* Skill Title */}
        <h3 style={{ 
          margin: '0 0 0.75rem 0',
          fontSize: '1.25rem',
          fontWeight: '600'
        }}>
          <Link to={`/skills/${id}`} style={{ color: 'var(--text-color)', textDecoration: 'none' }}>
            {title}
          </Link>
        </h3>
        
        {/* Skill Description */}
        <p style={{ 
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          margin: '0 0 1rem 0',
          lineHeight: '1.5'
        }}>
          {description && description.length > 100 
            ? `${description.substring(0, 100)}...` 
            : description}
        </p>
        
        {/* Instructor Info */}
        {instructor && (
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            borderTop: '1px solid var(--border-color)',
            paddingTop: '1rem',
            marginTop: 'auto'
          }}>
            <div style={{ 
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              overflow: 'hidden',
              marginRight: '0.75rem'
            }}>
              <img 
                src={instructor.avatar || 'https://via.placeholder.com/32?text=User'}
                alt={`${instructor.name} avatar`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '0.85rem' }}>Instructor</p>
              <p style={{ margin: 0, fontWeight: '500' }}>{instructor.name}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillCard;
