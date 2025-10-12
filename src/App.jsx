import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import UploadSchedule from './pages/Onboarding/UploadSchedule';
import ReviewSchedule from './pages/Onboarding/ReviewSchedule';
import ActivitiesInput from './pages/Onboarding/ActivitiesInput';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/onboarding/upload-schedule" element={<UploadSchedule />} />
            <Route path="/onboarding/review-schedule" element={<ReviewSchedule />} />
            <Route path="/onboarding/activities" element={<ActivitiesInput />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;