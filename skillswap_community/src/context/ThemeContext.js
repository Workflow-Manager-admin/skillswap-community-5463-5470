import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for theme management
const ThemeContext = createContext();

// PUBLIC_INTERFACE
/**
 * Provider component for theme context
 * Manages theme state and provides functions for changing themes
 */
export const ThemeProvider = ({ children }) => {
  // Check for saved theme in localStorage or default to dark theme
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('skillswap_theme');
    return savedTheme || 'dark'; // Default to dark theme
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Effect to update the document data-theme attribute when theme changes
  useEffect(() => {
    // First remove any theme-related classes
    document.body.classList.remove('dark-theme', 'light-theme');
    
    // Set the appropriate theme attribute and class
    document.documentElement.setAttribute('data-theme', theme);
    document.body.classList.add(`${theme}-theme`);
    
    // Force a repaint to ensure all styles are applied correctly
    const root = document.documentElement;
    root.style.display = 'none';
    // Trigger reflow
    const reflow = root.offsetHeight;
    // Restore display
    root.style.display = '';
    
    // Save theme to localStorage
    localStorage.setItem('skillswap_theme', theme);
  }, [theme]);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  // Create the context value object
  const contextValue = {
    theme,
    toggleTheme,
    setTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// PUBLIC_INTERFACE
/**
 * Custom hook to use the theme context
 * @returns {Object} The theme context with theme state and toggle function
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
