import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
/**
 * CommunityFeed component for displaying community activity posts
 * @param {Object[]} posts - Array of community posts to display
 */
const CommunityFeed = ({ posts = [] }) => {
  if (!posts.length) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', borderRadius: '8px', backgroundColor: '#252525' }}>
        <h3>No community activity yet</h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          Be the first to post something or join an event!
        </p>
        <button className="btn" style={{ marginTop: '1rem' }}>Create Post</button>
      </div>
    );
  }
  
  return (
    <div>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Community Feed</h2>
        <button className="btn">Create Post</button>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {posts.map((post) => (
          <FeedItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

/**
 * FeedItem component for displaying a single feed post
 * @param {Object} post - The post object to display
 */
const FeedItem = ({ post }) => {
  const {
    id,
    user,
    content,
    timestamp,
    attachments = [],
    likes = 0,
    comments = []
  } = post;
  
  const formattedTime = new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });
  
  return (
    <div style={{
      backgroundColor: '#252525',
      borderRadius: '8px',
      padding: '1.5rem',
      border: '1px solid var(--border-color)'
    }}>
      {/* Post header with user info */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <Link to={`/profile/${user.id}`} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <div style={{ 
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            overflow: 'hidden',
            marginRight: '0.75rem' 
          }}>
            <img 
              src={user.avatar || 'https://via.placeholder.com/48?text=User'} 
              alt={`${user.name}'s avatar`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          
          <div>
            <p style={{ margin: 0, color: 'var(--text-color)', fontWeight: '500' }}>{user.name}</p>
            <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              {formattedTime}
            </p>
          </div>
        </Link>
      </div>
      
      {/* Post content */}
      <div style={{ margin: '1rem 0', lineHeight: '1.6' }}>
        <p style={{ margin: 0 }}>{content}</p>
      </div>
      
      {/* Attachments (if any) */}
      {attachments.length > 0 && (
        <div style={{ 
          margin: '1rem 0',
          display: 'grid',
          gridTemplateColumns: attachments.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.5rem' 
        }}>
          {attachments.map((attachment, index) => (
            <div 
              key={index} 
              style={{ 
                borderRadius: '8px',
                overflow: 'hidden',
                maxHeight: '300px'
              }}
            >
              {attachment.type === 'image' ? (
                <img 
                  src={attachment.url} 
                  alt={`Attachment ${index + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ 
                  backgroundColor: 'rgba(232, 122, 65, 0.1)',
                  padding: '1rem',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span>{attachment.filename || `Attachment ${index + 1}`}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Post actions */}
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '1rem',
        paddingTop: '1rem',
        borderTop: '1px solid var(--border-color)'
      }}>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <button style={{ 
            background: 'none',
            border: 'none',
            color: 'var(--text-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer'
          }}>
            <span>Like</span>
            <span>{likes > 0 && likes}</span>
          </button>
          
          <button style={{ 
            background: 'none',
            border: 'none',
            color: 'var(--text-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer'
          }}>
            <span>Comment</span>
            <span>{comments.length > 0 && comments.length}</span>
          </button>
        </div>
        
        <button style={{ 
          background: 'none',
          border: 'none',
          color: 'var(--text-color)',
          cursor: 'pointer'
        }}>
          Share
        </button>
      </div>
      
      {/* Comments preview (if any) */}
      {comments.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          {comments.slice(0, 2).map((comment, index) => (
            <div key={index} style={{
              display: 'flex',
              padding: '0.75rem',
              backgroundColor: '#1e1e1e',
              borderRadius: '8px',
              marginTop: '0.75rem'
            }}>
              <div style={{ 
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                overflow: 'hidden',
                marginRight: '0.75rem' 
              }}>
                <img 
                  src={comment.user.avatar || 'https://via.placeholder.com/32?text=User'} 
                  alt={`${comment.user.name}'s avatar`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                  <p style={{ margin: 0, fontWeight: '500' }}>{comment.user.name}</p>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                    {new Date(comment.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem' }}>{comment.content}</p>
              </div>
            </div>
          ))}
          
          {comments.length > 2 && (
            <button style={{ 
              background: 'none',
              border: 'none',
              color: 'var(--kavia-orange)',
              marginTop: '0.75rem',
              padding: '0.5rem',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'center'
            }}>
              View all {comments.length} comments
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CommunityFeed;
