import React, { createContext, useState, useContext } from 'react';
import { searchRepositories } from '../services/GitHubService';

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
  
  // GitHub repositories state
  const [skillRepositories, setSkillRepositories] = useState({});
  const [repositoriesLoading, setRepositoriesLoading] = useState({});
  const [repositoriesError, setRepositoriesError] = useState({});
  
  // Community state
  const [communityEvents, setCommunityEvents] = useState([]);
  const [communityFeed, setCommunityFeed] = useState([]);
  
  // Login function that connects to the backend API
  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Return the error response to be handled by the component
        return {
          success: false,
          message: data.message || 'Login failed',
          status: response.status
        };
      }
      
      // Store token in localStorage
      if (data.token) {
        localStorage.setItem('skillswap_token', data.token);
      }
      
      // Login successful, update user state
      setCurrentUser(data.user);
      return {
        success: true,
        message: 'Login successful',
        user: data.user,
        token: data.token
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Network error. Please try again later.',
        status: 0
      };
    }
  };
  
  // Mock register function
  const register = (userData) => {
    // In a real app, this would create a new user in the database
    // For now, we'll just log the user in
    setCurrentUser(userData);
    return userData; // Return the created user
  };
  
  // Logout function
  const logout = () => {
    // Remove token from local storage
    localStorage.removeItem('skillswap_token');
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
  
  // Function to fetch GitHub repositories for a skill
  const fetchRepositoriesForSkill = async (skillName, limit = 3) => {
    if (!skillName) return;
    
    // Mark this skill's repositories as loading
    setRepositoriesLoading(prev => ({
      ...prev,
      [skillName]: true
    }));
    
    try {
      const results = await searchRepositories(skillName, limit);
      
      if (results.error) {
        setRepositoriesError(prev => ({
          ...prev,
          [skillName]: results
        }));
      } else {
        setSkillRepositories(prev => ({
          ...prev,
          [skillName]: results
        }));
      }
    } catch (error) {
      setRepositoriesError(prev => ({
        ...prev,
        [skillName]: {
          error: true,
          message: error.message
        }
      }));
    } finally {
      setRepositoriesLoading(prev => ({
        ...prev,
        [skillName]: false
      }));
    }
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
    
    // GitHub Repositories
    skillRepositories,
    repositoriesLoading,
    repositoriesError,
    fetchRepositoriesForSkill,
    
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