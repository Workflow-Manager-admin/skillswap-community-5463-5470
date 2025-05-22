import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import SkillsList from '../components/skills/SkillsList';
import EventsList from '../components/community/EventsList';
import ProfileCard from '../components/profile/ProfileCard';

// PUBLIC_INTERFACE
/**
 * HomePage component serving as the landing and dashboard for the SkillSwap Community
 */
const HomePage = () => {
  const { 
    featuredSkills, 
    communityEvents, 
    currentUser 
  } = useAppContext();
  
  // Mock data for featured instructors
  const featuredInstructors = [
    {
      id: 'user1',
      name: 'Maya Johnson',
      avatar: 'https://via.placeholder.com/64?text=Maya',
      title: 'UX Designer & Yoga Instructor',
      skills: ['UI/UX Design', 'Yoga', 'Meditation'],
      rating: 4.9
    },
    {
      id: 'user2',
      name: 'David Chen',
      avatar: 'https://via.placeholder.com/64?text=David',
      title: 'Full-stack Developer & Music Teacher',
      skills: ['JavaScript', 'React', 'Piano'],
      rating: 4.8
    },
    {
      id: 'user3',
      name: 'Sofia Garcia',
      avatar: 'https://via.placeholder.com/64?text=Sofia',
      title: 'Language Coach & Photographer',
      skills: ['Spanish', 'Photography', 'Communication'],
      rating: 4.7
    }
  ];
  
  return (
    <div>
      {/* Hero section */}
      <section className="hero">
        <div className="subtitle">Teach. Learn. Grow Together.</div>
        
        <h1 className="title">SkillSwap Community</h1>
        
        <div className="description">
          A peer-to-peer skill exchange platform where users can teach and learn skills from each other,
          fostering a community of knowledge sharing and personal growth.
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <Link to="/skills" className="btn btn-large">Explore Skills</Link>
          <Link to="/community" className="btn btn-large" style={{ backgroundColor: 'transparent', border: '1px solid var(--kavia-orange)' }}>
            Join Community
          </Link>
        </div>
      </section>
      
      {/* Featured skills section */}
      <section style={{ marginTop: '4rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Popular Skills to Learn</h2>
        <SkillsList skills={featuredSkills} />
        
        {featuredSkills.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/skills" className="btn">View All Skills</Link>
          </div>
        )}
      </section>
      
      {/* How it works section */}
      <section style={{ marginTop: '4rem', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '2rem' }}>How SkillSwap Works</h2>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          <div style={{ padding: '1.5rem' }}>
            <div style={{ 
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(232, 122, 65, 0.1)',
              color: 'var(--kavia-orange)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: '600',
              margin: '0 auto 1rem auto'
            }}>
              1
            </div>
            <h3>Discover Skills</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Browse through various skills taught by community members 
              and find something new to learn.
            </p>
          </div>
          
          <div style={{ padding: '1.5rem' }}>
            <div style={{ 
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(232, 122, 65, 0.1)',
              color: 'var(--kavia-orange)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: '600',
              margin: '0 auto 1rem auto'
            }}>
              2
            </div>
            <h3>Connect & Learn</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Connect with skilled instructors, attend events, and learn 
              through direct interaction with experts.
            </p>
          </div>
          
          <div style={{ padding: '1.5rem' }}>
            <div style={{ 
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(232, 122, 65, 0.1)',
              color: 'var(--kavia-orange)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: '600',
              margin: '0 auto 1rem auto'
            }}>
              3
            </div>
            <h3>Share Your Knowledge</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Give back to the community by teaching others what you're good at,
              building your reputation as an instructor.
            </p>
          </div>
        </div>
      </section>
      
      {/* Featured instructors */}
      <section style={{ marginTop: '4rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Featured Instructors</h2>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {featuredInstructors.map((instructor) => (
            <ProfileCard key={instructor.id} user={instructor} />
          ))}
        </div>
      </section>
      
      {/* Upcoming events */}
      <section style={{ marginTop: '4rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Upcoming Events</h2>
        <EventsList events={communityEvents} />
      </section>
      
      {/* Call to action */}
      <section style={{ 
        marginTop: '4rem',
        backgroundColor: '#252525',
        borderRadius: '8px',
        padding: '3rem',
        textAlign: 'center',
        border: '1px solid var(--border-color)'
      }}>
        <h2>Ready to Join the Community?</h2>
        <p style={{ 
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          margin: '1rem auto 2rem auto'
        }}>
          Start your journey of skill sharing and learning today. 
          Create an account to connect with others, teach what you know, 
          and discover new skills to learn.
        </p>
        <Link to={currentUser ? '/profile' : '/register'} className="btn btn-large">
          {currentUser ? 'Go to Your Profile' : 'Create an Account'}
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
