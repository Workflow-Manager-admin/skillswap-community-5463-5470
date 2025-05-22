import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SkillCard from '../skills/SkillCard';
import GitHubRepositoryList from '../github/GitHubRepositoryList';
import { useAppContext } from '../../context/AppContext';

// PUBLIC_INTERFACE
/**
 * ProfileDetails component for displaying detailed user profile information
 * @param {Object} user - The user object containing profile information
 */
const ProfileDetails = ({ user }) => {
  // Get the GitHub repository fetching function from context
  const { fetchRepositoriesForSkill } = useAppContext();
  
  // Fetch GitHub repositories for each skill
  useEffect(() => {
    if (user) {
      const teachingSkills = user.teachingSkills || [];
      const learningSkills = user.learningSkills || [];
      
      // Get unique skill titles from both teaching and learning skills
      const allSkills = [...teachingSkills, ...learningSkills];
      const uniqueSkillTitles = [...new Set(allSkills.map(skill => skill.title))];
      
      // Fetch repositories for each unique skill
      uniqueSkillTitles.forEach(skillTitle => {
        fetchRepositoriesForSkill(skillTitle);
      });
    }
  }, [user, fetchRepositoriesForSkill]);
  
  if (!user) return null;
  
  const {
    name,
    avatar,
    title,
    bio,
    location,
    memberSince,
    website,
    social,
    teachingSkills = [],
    learningSkills = []
  } = user;
  
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Header with cover photo */}
      <div style={{ 
        height: '200px', 
        backgroundColor: 'var(--kavia-orange)',
        opacity: 0.7,
        borderRadius: '8px 8px 0 0',
        position: 'relative'
      }} />
      
      {/* Profile info section */}
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: '#252525',
        borderRadius: '0 0 8px 8px',
        border: '1px solid var(--border-color)',
        borderTop: 'none'
      }}>
        <div style={{ display: 'flex', marginTop: '-100px' }}>
          {/* Avatar */}
          <div style={{ 
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            border: '6px solid #252525',
            overflow: 'hidden',
            backgroundColor: '#181818'
          }}>
            <img 
              src={avatar || 'https://via.placeholder.com/160?text=User'}
              alt={`${name} avatar`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          
          {/* Quick info and actions */}
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            justifyContent: 'flex-end', 
            alignItems: 'flex-end',
            paddingBottom: '0.5rem'
          }}>
            <button className="btn">Contact</button>
          </div>
        </div>
        
        {/* Name and title */}
        <div style={{ marginTop: '1.5rem' }}>
          <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem' }}>{name}</h1>
          {title && <p style={{ margin: '0 0 1rem 0', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{title}</p>}
        </div>
        
        {/* Bio section */}
        {bio && (
          <div style={{ marginTop: '1.5rem' }}>
            <h3>About</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{bio}</p>
          </div>
        )}
        
        {/* Details grid */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '1.5rem',
          marginTop: '1.5rem'
        }}>
          {/* Location */}
          {location && (
            <div>
              <p style={{ margin: '0 0 0.25rem 0', fontWeight: '600' }}>Location</p>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{location}</p>
            </div>
          )}
          
          {/* Member since */}
          {memberSince && (
            <div>
              <p style={{ margin: '0 0 0.25rem 0', fontWeight: '600' }}>Member since</p>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{memberSince}</p>
            </div>
          )}
          
          {/* Website */}
          {website && (
            <div>
              <p style={{ margin: '0 0 0.25rem 0', fontWeight: '600' }}>Website</p>
              <a 
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--kavia-orange)', textDecoration: 'none' }}
              >
                {website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
        </div>
        
        {/* Social links */}
        {social && Object.keys(social).length > 0 && (
          <div style={{ marginTop: '1.5rem' }}>
            <h3>Connect</h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {Object.entries(social).map(([platform, url]) => (
                <a 
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    color: 'var(--text-color)', 
                    textDecoration: 'none',
                    padding: '0.5rem 1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '4px',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Teaching skills */}
      {teachingSkills.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Skills I Teach</h2>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginTop: '1rem'
          }}>
            {teachingSkills.map((skill) => (
              <div key={skill.id} style={{ marginBottom: '2rem' }}>
                <SkillCard skill={skill} />
                <div style={{ marginTop: '1rem' }}>
                  <GitHubRepositoryList skillName={skill.title} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Learning skills */}
      {learningSkills.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Skills I'm Learning</h2>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginTop: '1rem'
          }}>
            {learningSkills.map((skill) => (
              <div key={skill.id} style={{ marginBottom: '2rem' }}>
                <SkillCard skill={skill} />
                <div style={{ marginTop: '1rem' }}>
                  <GitHubRepositoryList skillName={skill.title} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDetails;
