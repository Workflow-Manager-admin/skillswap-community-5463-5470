import React, { createContext, useState, useContext } from 'react';

// Create a context for our app
const AppContext = createContext();

// PUBLIC_INTERFACE
/**
 * Provider component for the app context
 * This provides global state management for the SkillSwap app
 */
export const AppProvider = ({ children }) => {
  // User state
  const [currentUser, setCurrentUser] = useState(null);
  
  // Skills state
  const [skills, setSkills] = useState([]);
  const [featuredSkills, setFeaturedSkills] = useState([]);
  
  // Community state
  const [communityEvents, setCommunityEvents] = useState([]);
  const [communityFeed, setCommunityFeed] = useState([]);
  
  // Mock login function (in a real app, this would connect to authentication service)
  const login = (userData) => {
    setCurrentUser(userData);
  };
  
  // Mock register function
  const register = (userData) => {
    // In a real app, this would create a new user in the database
    // For now, we'll just log the user in
    setCurrentUser(userData);
    return userData; // Return the created user
  };
  
  // Mock logout function
  const logout = () => {
    setCurrentUser(null);
  };
  
  // Mock password reset request function
  const resetPassword = (email) => {
    // In a real app, this would send a password reset link to the user's email
    // For now, we'll just return a promise that resolves after a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  };
  
  // Function to add a new skill
  const addSkill = (skill) => {
    setSkills([...skills, skill]);
  };
  
  // Function to add a community event
  const addCommunityEvent = (event) => {
    setCommunityEvents([...communityEvents, event]);
  };
  
  // Function to post to community feed
  const postToCommunityFeed = (post) => {
    setCommunityFeed([post, ...communityFeed]);
  };
  
  // Create the context value object
  const contextValue = {
    // User
    currentUser,
    login,
    register,
    logout,
    resetPassword,
    
    // Skills
    skills,
    setSkills,
    featuredSkills,
    setFeaturedSkills,
    addSkill,
    
    // Community
    communityEvents,
    setCommunityEvents,
    addCommunityEvent,
    communityFeed,
    setCommunityFeed,
    postToCommunityFeed
  };
  
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// PUBLIC_INTERFACE
/**
 * Custom hook to use the app context
 * @returns {Object} The app context
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
