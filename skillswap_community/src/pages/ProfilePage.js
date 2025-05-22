import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ProfileDetails from '../components/profile/ProfileDetails';

// PUBLIC_INTERFACE
/**
 * ProfilePage component for displaying user profiles
 */
const ProfilePage = () => {
  const { userId } = useParams();
  const { currentUser } = useAppContext();
  
  // Mock user data (in a real app, this would come from API)
  const user = userId ? getMockUserById(userId) : currentUser;
  
  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>User not found</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          The user profile you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }
  
  return (
    <div>
      <ProfileDetails user={user} />
    </div>
  );
};

// Helper function to get mock user data
const getMockUserById = (id) => {
  // This would normally be an API call
  const mockUsers = {
    'user1': {
      id: 'user1',
      name: 'Maya Johnson',
      avatar: 'https://via.placeholder.com/160?text=Maya',
      title: 'UX Designer & Yoga Instructor',
      bio: "I'm a UX designer with 6 years of experience who also teaches yoga on weekends. I love sharing my knowledge of design thinking and mindfulness practices. When I'm not designing or teaching, you'll find me hiking with my dog or experimenting with new vegan recipes.",
      location: 'Seattle, WA',
      memberSince: 'January 2022',
      website: 'https://mayajodesign.com',
      social: {
        linkedin: 'https://linkedin.com/in/mayajo',
        instagram: 'https://instagram.com/mayajo_design'
      },
      teachingSkills: [
        {
          id: 'skill1',
          title: 'Intro to UI/UX Design',
          description: 'Learn the fundamentals of user interface and experience design. This skill covers design thinking, wireframing, and prototyping.',
          category: 'Art & Design',
          instructor: { id: 'user1', name: 'Maya Johnson', avatar: 'https://via.placeholder.com/160?text=Maya' },
          image: 'https://via.placeholder.com/300x160?text=UI/UX'
        },
        {
          id: 'skill2',
          title: 'Yoga for Beginners',
          description: 'A gentle introduction to yoga poses, breathing techniques, and mindfulness practices for complete beginners.',
          category: 'Fitness',
          instructor: { id: 'user1', name: 'Maya Johnson', avatar: 'https://via.placeholder.com/160?text=Maya' },
          image: 'https://via.placeholder.com/300x160?text=Yoga'
        }
      ],
      learningSkills: [
        {
          id: 'skill3',
          title: 'Spanish for Travelers',
          description: 'Learn essential Spanish phrases and vocabulary for traveling in Spanish-speaking countries.',
          category: 'Languages',
          instructor: { id: 'user3', name: 'Sofia Garcia', avatar: 'https://via.placeholder.com/160?text=Sofia' },
          image: 'https://via.placeholder.com/300x160?text=Spanish'
        }
      ]
    },
    'user2': {
      id: 'user2',
      name: 'David Chen',
      avatar: 'https://via.placeholder.com/160?text=David',
      title: 'Full-stack Developer & Music Teacher',
      bio: "I've been coding for over a decade and playing piano for twice as long. I enjoy teaching both technical and creative skills - from React to Rachmaninoff. I believe in making complex topics accessible and enjoyable for everyone.",
      location: 'Chicago, IL',
      memberSince: 'March 2022',
      website: 'https://davidchendev.com',
      social: {
        github: 'https://github.com/davidchen',
        twitter: 'https://twitter.com/davidchendev'
      },
      teachingSkills: [
        {
          id: 'skill4',
          title: 'Modern JavaScript Fundamentals',
          description: 'Comprehensive course covering modern JavaScript features, best practices, and common patterns.',
          category: 'Technology',
          instructor: { id: 'user2', name: 'David Chen', avatar: 'https://via.placeholder.com/160?text=David' },
          image: 'https://via.placeholder.com/300x160?text=JavaScript'
        },
        {
          id: 'skill5',
          title: 'Piano Basics',
          description: 'Learn to play piano from scratch - reading music, proper technique, and your first songs.',
          category: 'Music',
          instructor: { id: 'user2', name: 'David Chen', avatar: 'https://via.placeholder.com/160?text=David' },
          image: 'https://via.placeholder.com/300x160?text=Piano'
        }
      ],
      learningSkills: [
        {
          id: 'skill6',
          title: 'Digital Photography Fundamentals',
          description: 'Learn the basics of composition, lighting, and camera settings for stunning digital photography.',
          category: 'Art & Design',
          instructor: { id: 'user3', name: 'Sofia Garcia', avatar: 'https://via.placeholder.com/160?text=Sofia' },
          image: 'https://via.placeholder.com/300x160?text=Photography'
        }
      ]
    },
    'user3': {
      id: 'user3',
      name: 'Sofia Garcia',
      avatar: 'https://via.placeholder.com/160?text=Sofia',
      title: 'Language Coach & Photographer',
      bio: "Born and raised in Madrid, now living in NYC. I teach Spanish with a focus on conversational fluency and cultural context. I'm also a freelance photographer specializing in street and travel photography. I love connecting with people from different backgrounds and sharing perspectives.",
      location: 'New York, NY',
      memberSince: 'October 2021',
      website: 'https://sofiaspeaks.com',
      social: {
        instagram: 'https://instagram.com/sofia.captures',
        linkedin: 'https://linkedin.com/in/sofiagarcia'
      },
      teachingSkills: [
        {
          id: 'skill3',
          title: 'Spanish for Travelers',
          description: 'Learn essential Spanish phrases and vocabulary for traveling in Spanish-speaking countries.',
          category: 'Languages',
          instructor: { id: 'user3', name: 'Sofia Garcia', avatar: 'https://via.placeholder.com/160?text=Sofia' },
          image: 'https://via.placeholder.com/300x160?text=Spanish'
        },
        {
          id: 'skill6',
          title: 'Digital Photography Fundamentals',
          description: 'Learn the basics of composition, lighting, and camera settings for stunning digital photography.',
          category: 'Art & Design',
          instructor: { id: 'user3', name: 'Sofia Garcia', avatar: 'https://via.placeholder.com/160?text=Sofia' },
          image: 'https://via.placeholder.com/300x160?text=Photography'
        }
      ],
      learningSkills: [
        {
          id: 'skill4',
          title: 'Modern JavaScript Fundamentals',
          description: 'Comprehensive course covering modern JavaScript features, best practices, and common patterns.',
          category: 'Technology',
          instructor: { id: 'user2', name: 'David Chen', avatar: 'https://via.placeholder.com/160?text=David' },
          image: 'https://via.placeholder.com/300x160?text=JavaScript'
        }
      ]
    }
  };

  return mockUsers[id];
};

export default ProfilePage;
