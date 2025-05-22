import React from 'react';
import SkillCard from './SkillCard';

// PUBLIC_INTERFACE
/**
 * SkillsList component that renders a grid of skill cards
 * @param {Object[]} skills - Array of skill objects to display
 * @param {string} title - Optional title for the skills list section
 */
const SkillsList = ({ skills = [], title }) => {
  if (!skills.length) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h3>No skills found</h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          Try adjusting your search or filters, or create a new skill yourself!
        </p>
      </div>
    );
  }
  
  return (
    <div>
      {title && <h2 style={{ marginBottom: '1.5rem' }}>{title}</h2>}
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}>
        {skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default SkillsList;
