import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useLocation, useParams } from 'react-router-dom';
import SkillsList from '../components/skills/SkillsList';

// PUBLIC_INTERFACE
/**
 * SkillsExplorer component for browsing and searching skills
 */
const SkillsExplorer = () => {
  const { skills } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const location = useLocation();
  const { categoryId } = useParams();
  
  // Set initial category and view type based on route
  useEffect(() => {
    if (categoryId) {
      setSelectedCategory(categoryId.replace(/-/g, ' '));
    } else if (location.pathname.includes('/skills/popular')) {
      // Handle popular skills view
      setSelectedCategory('all');
    } else if (location.pathname.includes('/skills/new')) {
      // Handle new skills view
      setSelectedCategory('all');
    }
  }, [location, categoryId]);
  
  const categories = [
    'all',
    'technology', 
    'art & design', 
    'music', 
    'languages', 
    'cooking', 
    'fitness', 
    'business', 
    'education'
  ];
  
  // Filter skills based on search term and category
  const filteredSkills = skills.filter(skill => {
    const matchesSearch = searchTerm === '' || 
      skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = selectedCategory === 'all' || 
      skill.category.toLowerCase() === selectedCategory.toLowerCase();
      
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div>
      <h1>Explore Skills</h1>
      
      {/* Search and filter bar */}
      <div style={{ 
        backgroundColor: '#252525',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '2rem',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{ 
          display: 'flex', 
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          {/* Search input */}
          <div style={{ flex: 1 }}>
            <input
              type="text"
              placeholder="Search for skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                backgroundColor: '#1A1A1A',
                border: '1px solid var(--border-color)',
                borderRadius: '4px',
                color: 'var(--text-color)',
                fontSize: '1rem'
              }}
            />
          </div>
          
          {/* Category dropdown */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: '#1A1A1A',
                border: '1px solid var(--border-color)',
                borderRadius: '4px',
                color: 'var(--text-color)',
                fontSize: '1rem',
                height: '100%'
              }}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Category quick filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '50px',
                border: 'none',
                backgroundColor: category === selectedCategory 
                  ? 'var(--kavia-orange)' 
                  : 'rgba(255, 255, 255, 0.1)',
                color: category === selectedCategory 
                  ? 'white' 
                  : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.9rem',
                textTransform: 'capitalize'
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Results */}
      <div>
        <div style={{ marginBottom: '1.5rem' }}>
          <p>
            <strong>{filteredSkills.length}</strong> 
            {' '}skills found
            {selectedCategory !== 'all' && ` in "${selectedCategory}"`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>
        
        <SkillsList skills={filteredSkills} />
      </div>
      
      {/* Empty state */}
      {skills.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem',
          backgroundColor: '#252525',
          borderRadius: '8px',
          border: '1px solid var(--border-color)'
        }}>
          <h3>No skills available yet</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Be the first to add a skill to our community!
          </p>
          <button className="btn btn-large">Add Your Skill</button>
        </div>
      )}
    </div>
  );
};

export default SkillsExplorer;
