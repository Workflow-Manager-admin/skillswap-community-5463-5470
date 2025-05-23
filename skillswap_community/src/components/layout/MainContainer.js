import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import './Layout.css';

// PUBLIC_INTERFACE
/**
 * MainContainer component that serves as the primary layout container for the SkillSwap Community application.
 * It includes the Header, Sidebar, content area (rendered via Outlet), and Footer.
 * The layout is responsive and adapts to different screen sizes.
 */
const MainContainer = () => {
  const [showSidebar, setShowSidebar] = React.useState(window.innerWidth > 768);

  // Handle window resize to toggle sidebar visibility based on screen size
  React.useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="app">
      {/* Header component */}
      <Header />

      {/* Main content area with sidebar and page content */}
      <div className="layout-container">
        {/* Sidebar for navigation */}
        {showSidebar && (
          <div className="sidebar-container">
            <Sidebar />
          </div>
        )}

        {/* Main content with padding */}
        <main className="main-content">
          <div className={`content-container ${showSidebar ? 'with-sidebar' : ''}`}>
            {/* Page content rendered via Outlet */}
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
