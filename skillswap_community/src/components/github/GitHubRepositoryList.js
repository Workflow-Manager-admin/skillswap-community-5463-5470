import React, { useState, useEffect } from 'react';
import { searchRepositories } from '../../services/GitHubService';
import GitHubRepositoryCard from './GitHubRepositoryCard';

// PUBLIC_INTERFACE
/**
 * GitHubRepositoryList component that displays GitHub repositories related to a skill
 * @param {string} skillName - The skill name to search repositories for
 * @param {number} limit - The maximum number of repositories to show (default: 3)
 */
const GitHubRepositoryList = ({ skillName, limit = 3 }) => {
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Don't fetch if no skill name is provided
    if (!skillName) {
      setIsLoading(false);
      return;
    }
    
    const fetchRepositories = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await searchRepositories(skillName, limit);
        
        if (result.error) {
          setError(result);
        } else {
          setRepositories(result);
        }
      } catch (err) {
        setError({
          message: 'Failed to fetch repositories',
          details: err.message
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRepositories();
  }, [skillName, limit]);
  
  // Loading state
  if (isLoading) {
    return (
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-md)',
        textAlign: 'center',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{ 
          width: '40px',
          height: '40px',
          border: '3px solid rgba(62, 81, 181, 0.1)',
          borderTopColor: 'var(--primary-light)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 1rem'
        }} />
        <p style={{ color: 'var(--text-secondary)' }}>Loading GitHub repositories for {skillName}...</p>
        <style jsx="true">{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }
  
  // Error state (rate limit)
  if (error && error.type === 'RATE_LIMIT') {
    return (
      <div style={{
        padding: '1rem',
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        color: 'var(--text-secondary)'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          marginBottom: '0.5rem'
        }}>
          <svg height="20" width="20" viewBox="0 0 16 16" style={{ fill: 'var(--warning)' }}>
            <path fillRule="evenodd" d="M8.22 1.754a.25.25 0 00-.44 0L1.698 13.132a.25.25 0 00.22.368h12.164a.25.25 0 00.22-.368L8.22 1.754zm-1.763-.707c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0114.082 15H1.918a1.75 1.75 0 01-1.543-2.575L6.457 1.047zM9 11a1 1 0 11-2 0 1 1 0 012 0zm-.25-5.25a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z"></path>
          </svg>
          <span style={{ fontWeight: 'bold' }}>GitHub API Rate Limit Exceeded</span>
        </div>
        <p style={{ fontSize: 'var(--font-size-sm)', marginTop: '0.5rem' }}>
          GitHub limits the number of API requests. Please try again later.
        </p>
      </div>
    );
  }
  
  // Generic error state
  if (error) {
    return (
      <div style={{
        padding: '1rem',
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        color: 'var(--text-secondary)'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          marginBottom: '0.5rem'
        }}>
          <svg height="20" width="20" viewBox="0 0 16 16" style={{ fill: 'var(--error)' }}>
            <path fillRule="evenodd" d="M2.343 13.657A8 8 0 1113.657 2.343 8 8 0 012.343 13.657zM6.03 4.97a.75.75 0 00-1.06 1.06L6.94 8 4.97 9.97a.75.75 0 101.06 1.06L8 9.06l1.97 1.97a.75.75 0 101.06-1.06L9.06 8l1.97-1.97a.75.75 0 10-1.06-1.06L8 6.94 6.03 4.97z"></path>
          </svg>
          <span style={{ fontWeight: 'bold' }}>Failed to load repositories</span>
        </div>
        <p style={{ fontSize: 'var(--font-size-sm)' }}>
          {error.message || 'An error occurred while fetching GitHub repositories'}
        </p>
      </div>
    );
  }
  
  // No repositories found
  if (repositories.length === 0) {
    return (
      <div style={{
        padding: '1rem',
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        color: 'var(--text-secondary)',
        textAlign: 'center'
      }}>
        <p>No GitHub repositories found for {skillName}</p>
      </div>
    );
  }
  
  // Successfully loaded repositories
  return (
    <div>
      <h4 style={{ 
        fontSize: 'var(--font-size-md)',
        marginBottom: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <svg height="20" width="20" viewBox="0 0 16 16" style={{ fill: 'var(--text-secondary)' }}>
          <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
        Related GitHub Repositories
      </h4>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1rem',
      }}>
        {repositories.map(repo => (
          <GitHubRepositoryCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
};

export default GitHubRepositoryList;
