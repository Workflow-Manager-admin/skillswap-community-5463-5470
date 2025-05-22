import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import CommunityFeed from '../components/community/CommunityFeed';
import EventsList from '../components/community/EventsList';
import ProfileCard from '../components/profile/ProfileCard';

// PUBLIC_INTERFACE
/**
 * CommunityPage component for community features and interactions
 */
const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const { communityFeed, communityEvents } = useAppContext();
  
  // Mock community feed data
  const mockFeed = [
    {
      id: 'post1',
      user: {
        id: 'user1',
        name: 'Maya Johnson',
        avatar: 'https://via.placeholder.com/48?text=Maya'
      },
      content: 'Just finished teaching my first UI/UX workshop through SkillSwap! Amazing to see so many enthusiastic learners. Looking forward to the next session!',
      timestamp: '2023-05-15T14:30:00',
      likes: 24,
      comments: [
        {
          user: {
            id: 'user2',
            name: 'David Chen',
            avatar: 'https://via.placeholder.com/32?text=David'
          },
          content: "That's awesome! I'd love to join your next workshop.",
          timestamp: '2023-05-15T15:45:00'
        }
      ]
    },
    {
      id: 'post2',
      user: {
        id: 'user3',
        name: 'Sofia Garcia',
        avatar: 'https://via.placeholder.com/48?text=Sofia'
      },
      content: "I'm hosting a virtual Spanish conversation hour next Friday at 6pm EST. Perfect for intermediate learners who want to practice! Drop a comment if you're interested.",
      timestamp: '2023-05-14T09:15:00',
      likes: 15,
      comments: [
        {
          user: {
            id: 'user1',
            name: 'Maya Johnson',
            avatar: 'https://via.placeholder.com/32?text=Maya'
          },
          content: 'I'm in! Been wanting to practice my Spanish.',
          timestamp: '2023-05-14T10:22:00'
        },
        {
          user: {
            id: 'user2',
            name: 'David Chen',
            avatar: 'https://via.placeholder.com/32?text=David'
          },
          content: 'Can beginners join too? I know some basics.',
          timestamp: '2023-05-14T11:05:00'
        },
        {
          user: {
            id: 'user3',
            name: 'Sofia Garcia',
            avatar: 'https://via.placeholder.com/32?text=Sofia'
          },
          content: '@David Absolutely! Everyone is welcome. I'll make sure to include activities for all levels.',
          timestamp: '2023-05-14T12:30:00'
        }
      ]
    },
    {
      id: 'post3',
      user: {
        id: 'user2',
        name: 'David Chen',
        avatar: 'https://via.placeholder.com/48?text=David'
      },
      content: 'Just uploaded new JavaScript tutorial materials for my upcoming workshop. If you're registered, check your email for access!',
      timestamp: '2023-05-13T16:45:00',
      attachments: [
        {
          type: 'image',
          url: 'https://via.placeholder.com/600x400?text=JavaScript+Workshop'
        }
      ],
      likes: 19,
      comments: []
    }
  ];
  
  // Mock events data
  const mockEvents = [
    {
      id: 'event1',
      title: 'Introduction to Digital Photography',
      description: 'Learn the basics of composition, lighting, and camera settings in this hands-on workshop for beginners.',
      startDate: '2023-06-10T10:00:00',
      endDate: '2023-06-10T12:00:00',
      location: 'Central Park, NYC',
      isVirtual: false,
      host: {
        id: 'user3',
        name: 'Sofia Garcia',
        avatar: 'https://via.placeholder.com/48?text=Sofia'
      },
      attendees: [
        { id: 'user1', name: 'Maya Johnson', avatar: 'https://via.placeholder.com/32?text=Maya' },
        { id: 'user4', name: 'Alex Kim', avatar: 'https://via.placeholder.com/32?text=Alex' },
        { id: 'user5', name: 'Taylor Moore', avatar: 'https://via.placeholder.com/32?text=Taylor' },
        { id: 'user6', name: 'Jordan Lee', avatar: 'https://via.placeholder.com/32?text=Jordan' }
      ]
    },
    {
      id: 'event2',
      title: 'JavaScript Coding Bootcamp',
      description: 'Intensive 3-hour session covering JavaScript fundamentals, ES6 features, and practical coding exercises.',
      startDate: '2023-06-15T18:00:00',
      endDate: '2023-06-15T21:00:00',
      isVirtual: true,
      location: 'Zoom',
      host: {
        id: 'user2',
        name: 'David Chen',
        avatar: 'https://via.placeholder.com/48?text=David'
      },
      attendees: [
        { id: 'user3', name: 'Sofia Garcia', avatar: 'https://via.placeholder.com/32?text=Sofia' },
        { id: 'user7', name: 'Jamie Wilson', avatar: 'https://via.placeholder.com/32?text=Jamie' }
      ]
    },
    {
      id: 'event3',
      title: 'Yoga for Stress Relief',
      description: 'A gentle yoga session focused on relaxation techniques and stress management through mindful movement.',
      startDate: '2023-06-12T08:00:00',
      endDate: '2023-06-12T09:00:00',
      isVirtual: true,
      location: 'Google Meet',
      host: {
        id: 'user1',
        name: 'Maya Johnson',
        avatar: 'https://via.placeholder.com/48?text=Maya'
      },
      attendees: [
        { id: 'user3', name: 'Sofia Garcia', avatar: 'https://via.placeholder.com/32?text=Sofia' },
        { id: 'user5', name: 'Taylor Moore', avatar: 'https://via.placeholder.com/32?text=Taylor' },
        { id: 'user8', name: 'Riley Thompson', avatar: 'https://via.placeholder.com/32?text=Riley' }
      ]
    }
  ];
  
  // Mock active users
  const activeUsers = [
    {
      id: 'user1',
      name: 'Maya Johnson',
      avatar: 'https://via.placeholder.com/40?text=Maya',
      title: 'UX Designer & Yoga Instructor'
    },
    {
      id: 'user2',
      name: 'David Chen',
      avatar: 'https://via.placeholder.com/40?text=David',
      title: 'Full-stack Developer & Music Teacher'
    },
    {
      id: 'user3',
      name: 'Sofia Garcia',
      avatar: 'https://via.placeholder.com/40?text=Sofia',
      title: 'Language Coach & Photographer'
    },
    {
      id: 'user4',
      name: 'Alex Kim',
      avatar: 'https://via.placeholder.com/40?text=Alex',
      title: 'Marketing Specialist & Cook'
    },
    {
      id: 'user5',
      name: 'Taylor Moore',
      avatar: 'https://via.placeholder.com/40?text=Taylor',
      title: 'Data Scientist & Chess Player'
    }
  ];
  
  return (
    <div>
      <h1>Community</h1>
      
      {/* Main content layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        gap: '2rem',
        alignItems: 'start'
      }}>
        {/* Main content area */}
        <div>
          {/* Tabs */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-color)',
            marginBottom: '1.5rem'
          }}>
            <button
              onClick={() => setActiveTab('feed')}
              style={{
                padding: '1rem 1.5rem',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === 'feed' ? '2px solid var(--kavia-orange)' : 'none',
                color: activeTab === 'feed' ? 'var(--text-color)' : 'var(--text-secondary)',
                fontWeight: activeTab === 'feed' ? '600' : '400',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Community Feed
            </button>
            <button
              onClick={() => setActiveTab('events')}
              style={{
                padding: '1rem 1.5rem',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === 'events' ? '2px solid var(--kavia-orange)' : 'none',
                color: activeTab === 'events' ? 'var(--text-color)' : 'var(--text-secondary)',
                fontWeight: activeTab === 'events' ? '600' : '400',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Upcoming Events
            </button>
          </div>
          
          {/* Active tab content */}
          {activeTab === 'feed' && (
            <CommunityFeed posts={communityFeed.length ? communityFeed : mockFeed} />
          )}
          
          {activeTab === 'events' && (
            <EventsList events={communityEvents.length ? communityEvents : mockEvents} />
          )}
        </div>
        
        {/* Sidebar */}
        <aside>
          {/* Active members */}
          <div style={{
            backgroundColor: '#252525',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ marginTop: 0 }}>Active Members</h3>
            <div>
              {activeUsers.map(user => (
                <ProfileCard key={user.id} user={user} compact={true} />
              ))}
            </div>
          </div>
          
          {/* Upcoming events (compact view) */}
          <div style={{
            backgroundColor: '#252525',
            borderRadius: '8px',
            padding: '1.5rem',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ marginTop: 0 }}>Upcoming Events</h3>
            <EventsList 
              events={(communityEvents.length ? communityEvents : mockEvents).slice(0, 3)} 
              compact={true} 
            />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CommunityPage;
