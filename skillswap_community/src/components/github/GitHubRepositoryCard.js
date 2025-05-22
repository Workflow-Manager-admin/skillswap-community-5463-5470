import React from 'react';

// PUBLIC_INTERFACE
/**
 * GitHubRepositoryCard component displays details for a single GitHub repository
 * @param {Object} repo - The GitHub repository object
 */
const GitHubRepositoryCard = ({ repo }) => {
  if (!repo) return null;
  
  const {
    name,
    fullName,
    description,
    url,
    stars,
    forks,
    language,
    owner
  } = repo;
  
  // Format large numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  
  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      borderRadius: 'var(--radius-md)',
      padding: '1rem',
      border: '1px solid var(--border-color)',
      transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)',
      display: 'flex',
      flexDirection: 'column'
    }}
    className="card"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        {/* GitHub icon */}
        <svg 
          height="20" 
          width="20" 
          viewBox="0 0 16 16" 
          style={{ fill: 'var(--text-secondary)' }}
        >
          <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
        
        {/* Repository name with link */}
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{
            color: 'var(--primary-light)',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: 'var(--font-size-md)',
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
          title={fullName}
        >
          {fullName}
        </a>
      </div>
      
      {/* Repository description */}
      {description && (
        <p style={{
          color: 'var(--text-secondary)',
          margin: '0.5rem 0 1rem',
          fontSize: 'var(--font-size-sm)',
          lineHeight: '1.4',
          flex: 1,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {description}
        </p>
      )}
      
      {/* Repository stats */}
      <div style={{ 
        display: 'flex', 
        marginTop: 'auto',
        gap: '1rem', 
        fontSize: 'var(--font-size-xs)', 
        color: 'var(--text-tertiary)'
      }}>
        {/* Programming language */}
        {language && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ 
              width: '0.75rem',
              height: '0.75rem',
              borderRadius: '50%',
              backgroundColor: 'var(--secondary-color)',
              display: 'inline-block'
            }}></span>
            <span>{language}</span>
          </div>
        )}
        
        {/* Stars count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <svg height="16" width="16" viewBox="0 0 16 16" style={{ fill: 'var(--text-tertiary)' }}>
            <path fillRule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
          </svg>
          <span>{formatNumber(stars)}</span>
        </div>
        
        {/* Forks count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <svg height="16" width="16" viewBox="0 0 16 16" style={{ fill: 'var(--text-tertiary)' }}>
            <path fillRule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
          </svg>
          <span>{formatNumber(forks)}</span>
        </div>
      </div>
    </div>
  );
};

export default GitHubRepositoryCard;
