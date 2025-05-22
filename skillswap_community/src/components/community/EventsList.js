import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
/**
 * EventsList component for displaying upcoming community events
 * @param {Object[]} events - Array of event objects to display
 * @param {boolean} compact - Whether to show events in a compact format
 */
const EventsList = ({ events = [], compact = false }) => {
  if (!events.length) {
    return (
      <div style={{ textAlign: 'center', padding: compact ? '1rem' : '2rem' }}>
        <h3>No upcoming events</h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          Check back later or create your own event!
        </p>
        {!compact && (
          <button className="btn" style={{ marginTop: '1rem' }}>Create Event</button>
        )}
      </div>
    );
  }

  return (
    <div>
      {!compact && (
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>Upcoming Events</h2>
          <button className="btn">Create Event</button>
        </div>
      )}

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: compact ? '0.75rem' : '1.5rem'
      }}>
        {events.map((event) => (
          <EventItem key={event.id} event={event} compact={compact} />
        ))}
      </div>
      
      {compact && events.length > 3 && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link 
            to="/community/events"
            style={{ 
              color: 'var(--kavia-orange)', 
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}
          >
            View all events →
          </Link>
        </div>
      )}
    </div>
  );
};

/**
 * EventItem component for displaying a single event
 * @param {Object} event - The event object to display
 * @param {boolean} compact - Whether to show the event in a compact format
 */
const EventItem = ({ event, compact = false }) => {
  const {
    id,
    title,
    description,
    startDate,
    endDate,
    location,
    host,
    isVirtual,
    attendees = [],
    image
  } = event;

  // Format dates
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: compact ? 'short' : 'long',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  if (compact) {
    // Compact version for sidebars, etc.
    return (
      <Link 
        to={`/community/events/${id}`}
        style={{ textDecoration: 'none', color: 'var(--text-color)' }}
      >
        <div style={{
          backgroundColor: '#252525',
          borderRadius: '8px',
          padding: '1rem',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          {/* Date badge */}
          <div style={{ 
            minWidth: '60px',
            height: '60px',
            backgroundColor: 'var(--kavia-dark)',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--border-color)'
          }}>
            <span style={{ 
              fontSize: '1.25rem', 
              fontWeight: '600',
              color: 'var(--kavia-orange)'
            }}>
              {new Date(startDate).getDate()}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {new Date(startDate).toLocaleDateString('en-US', { month: 'short' })}
            </span>
          </div>
          
          {/* Event info */}
          <div>
            <h4 style={{ margin: '0 0 0.25rem 0' }}>{title}</h4>
            <p style={{ 
              margin: '0 0 0.25rem 0', 
              fontSize: '0.85rem',
              color: 'var(--text-secondary)'
            }}>
              {formatDate(startDate)}
            </p>
            <p style={{ 
              margin: 0, 
              fontSize: '0.85rem',
              color: 'var(--text-secondary)'
            }}>
              {isVirtual ? 'Virtual Event' : location}
            </p>
          </div>
        </div>
      </Link>
    );
  }

  // Full event card
  return (
    <div style={{
      backgroundColor: '#252525',
      borderRadius: '8px',
      overflow: 'hidden',
      border: '1px solid var(--border-color)'
    }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {/* Image or date column */}
        <div style={{
          width: '180px',
          position: 'relative',
          backgroundColor: 'var(--kavia-dark)'
        }}>
          {image ? (
            <img 
              src={image} 
              alt={title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              padding: '2rem'
            }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: 'var(--kavia-orange)'
              }}>
                {new Date(startDate).getDate()}
              </div>
              <div style={{
                fontSize: '1.25rem',
                color: 'var(--text-color)'
              }}>
                {new Date(startDate).toLocaleDateString('en-US', { month: 'short' })}
              </div>
              <div style={{
                marginTop: '0.5rem',
                fontSize: '0.9rem',
                color: 'var(--text-secondary)'
              }}>
                {new Date(startDate).toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
            </div>
          )}
        </div>
        
        {/* Event details */}
        <div style={{ padding: '1.5rem', flex: 1 }}>
          <Link 
            to={`/community/events/${id}`}
            style={{ textDecoration: 'none', color: 'var(--text-color)' }}
          >
            <h3 style={{ margin: '0 0 1rem 0' }}>{title}</h3>
          </Link>
          
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.75rem',
            marginBottom: '1.5rem' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ 
                fontSize: '0.9rem', 
                color: 'var(--text-secondary)',
                minWidth: '80px'
              }}>
                When:
              </span>
              <span style={{ fontSize: '0.9rem' }}>
                {formatDate(startDate)}
                {endDate && ` - ${formatDate(endDate)}`}
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ 
                fontSize: '0.9rem', 
                color: 'var(--text-secondary)',
                minWidth: '80px'
              }}>
                Where:
              </span>
              <span style={{ fontSize: '0.9rem' }}>
                {isVirtual ? 'Virtual Event' : location}
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ 
                fontSize: '0.9rem', 
                color: 'var(--text-secondary)',
                minWidth: '80px'
              }}>
                Host:
              </span>
              <Link 
                to={`/profile/${host.id}`}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  textDecoration: 'none',
                  color: 'var(--text-color)'
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  overflow: 'hidden'
                }}>
                  <img 
                    src={host.avatar || 'https://via.placeholder.com/24?text=User'} 
                    alt={`${host.name}'s avatar`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <span style={{ fontSize: '0.9rem' }}>{host.name}</span>
              </Link>
            </div>
          </div>
          
          {description && (
            <p style={{ 
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              margin: '0 0 1.5rem 0',
              lineHeight: '1.6'
            }}>
              {description.length > 150 ? `${description.substring(0, 150)}...` : description}
            </p>
          )}
          
          {/* Attendees */}
          {attendees.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', marginRight: '0.75rem' }}>
                  {attendees.slice(0, 3).map((attendee, index) => (
                    <div 
                      key={index}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '2px solid #252525',
                        marginLeft: index > 0 ? '-10px' : 0
                      }}
                    >
                      <img 
                        src={attendee.avatar || 'https://via.placeholder.com/32?text=User'} 
                        alt={`${attendee.name}'s avatar`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  ))}
                  
                  {attendees.length > 3 && (
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--kavia-dark)',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      marginLeft: '-10px',
                      border: '2px solid #252525'
                    }}>
                      +{attendees.length - 3}
                    </div>
                  )}
                </div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {attendees.length} {attendees.length === 1 ? 'person' : 'people'} attending
                </span>
              </div>
              
              <Link 
                to={`/community/events/${id}`}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'rgba(232, 122, 65, 0.1)',
                  color: 'var(--kavia-orange)',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}
              >
                View details
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsList;
