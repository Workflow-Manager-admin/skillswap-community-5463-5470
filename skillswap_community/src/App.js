import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Context Provider
import { AppProvider } from './context/AppContext';

// Layout Components
import MainContainer from './components/layout/MainContainer';

// Page Components
import HomePage from './pages/HomePage';
import SkillsExplorer from './pages/SkillsExplorer';
import ProfilePage from './pages/ProfilePage';
import CommunityPage from './pages/CommunityPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth routes outside MainContainer */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
          
          {/* Main routes with shared layout */}
          <Route path="/" element={<MainContainer />}>
            <Route index element={<HomePage />} />
            <Route path="skills" element={<SkillsExplorer />} />
            <Route path="skills/category/:categoryId" element={<SkillsExplorer />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="profile/:userId" element={<ProfilePage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="*" element={
              <div style={{ textAlign: 'center', padding: '3rem' }}>
                <h1>404 - Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>
              </div>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
