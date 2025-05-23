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
      <div style={{ 
        display: 'flex',
        minHeight: 'calc(100vh - 70px)', // Account for header height
        marginTop: '70px', // Space for fixed header
        position: 'relative',
        flexDirection: 'row',
      }}>
        {/* Sidebar for navigation with improved positioning */}
        {showSidebar && (
          <div 
            style={{
              position: 'sticky',
              top: '70px',
              height: 'calc(100vh - 70px)',
              overflowY: 'auto',
              transition: 'all var(--transition-normal)',
              flexShrink: 0,
              zIndex: 10,
            }}
          >
            <Sidebar />
          </div>
        )}

        {/* Main content with consistent padding */}
        <main style={{
          flex: 1,
          padding: 'var(--spacing-xl) var(--spacing-lg)',
          backgroundColor: 'var(--bg-dark)',
          minHeight: 'calc(100vh - 70px)',
          overflowX: 'hidden',
          transition: 'padding var(--transition-normal)',
        }}>
          <div className="container" style={{
            maxWidth: showSidebar ? '900px' : '1200px',
            transition: 'max-width var(--transition-normal)',
            margin: '0 auto',
            width: '100%',
            paddingBottom: 'var(--spacing-xxl)', // Add space for footer
          }}>
            {/* Page content rendered via Outlet */}
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer with fixed positioning */}
      <Footer />
    </div>
  );
};

export default MainContainer;
