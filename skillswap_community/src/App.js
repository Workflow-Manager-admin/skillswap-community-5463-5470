import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Context Providers
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';

// Layout Components
import MainContainer from './components/layout/MainContainer';

// Page Components
import HomePage from './pages/HomePage';
import SkillsExplorer from './pages/SkillsExplorer';
import ProfilePage from './pages/ProfilePage';
import CommunityPage from './pages/CommunityPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

function App() {
  return (
    <AppProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {/* Auth routes outside MainContainer */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            
            {/* Main routes with shared layout */}
            <Route path="/" element={<MainContainer />}>
              <Route index element={<HomePage />} />
              <Route path="skills" element={<SkillsExplorer />} />
              <Route path="skills/category/:categoryId" element={<SkillsExplorer />} />
              <Route path="skills/popular" element={<SkillsExplorer />} />
              <Route path="skills/new" element={<SkillsExplorer />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="profile/:userId" element={<ProfilePage />} />
              <Route path="community" element={<CommunityPage />} />
              <Route path="community/events" element={<CommunityPage />} />
              <Route path="*" element={
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                  <h1>404 - Page Not Found</h1>
                  <p>The page you are looking for does not exist.</p>
                </div>
              } />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
