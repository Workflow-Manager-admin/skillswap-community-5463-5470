import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

// PUBLIC_INTERFACE
/**
 * MainContainer component serves as the primary UI structure
 * for the SkillSwap Community app
 */
const MainContainer = () => {
  const location = useLocation();
  
  // Determine if sidebar should be shown
  // Don't show sidebar on homepage and certain pages
  const showSidebar = !['/', '/login', '/register', '/faq', '/terms', '/privacy', '/contact'].includes(location.pathname);
  
  return (
    <div className="app">
      {/* Header with navigation */}
      <Header />
      
      {/* Main content area */}
      <div style={{ 
        display: 'flex', 
        minHeight: 'calc(100vh - 70px)',  // Adjust based on header height
        marginTop: '70px'  // Offset for fixed header
      }}>
        {/* Conditional sidebar */}
        {showSidebar && <Sidebar />}
        
        {/* Main content with padding */}
        <main style={{ 
          flex: 1, 
          padding: '2rem',
          backgroundColor: 'var(--kavia-dark)'
        }}>
          <div className="container">
            {/* Router outlet for page content */}
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainContainer;
