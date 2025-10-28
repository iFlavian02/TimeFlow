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
import StudyPreferences from './pages/Onboarding/StudyPreferences';
import LifeEssentials from './pages/Onboarding/LifeEssentials';
import GenerateSchedule from './pages/Onboarding/GenerateSchedule';
import ScheduleView from './pages/ScheduleView';

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
            <Route path="/onboarding/study-preferences" element={<StudyPreferences />} />
            <Route path="/onboarding/life-essentials" element={<LifeEssentials />} />
            <Route path="/onboarding/generate" element={<GenerateSchedule />} />
            <Route path="/schedule/view" element={<ScheduleView />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;