import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Slider } from '../../components/ui/Slider';
import { useToast } from '../../hooks/useToast';
import { ToastContainer } from '../../components/ui/Toast';

const StudyPreferences = () => {
  const navigate = useNavigate();
  const toast = useToast();
  
  const [preferences, setPreferences] = useState({
    sessionDuration: 90,
    hoursPerCoursePerWeek: 5,
    preferredTimes: [],
    shortBreak: 10,
    longBreak: 30,
    breakFrequency: 90
  });
  
  const sessionDurations = [30, 60, 90, 120];
  const breakDurations = {
    short: [5, 10, 15],
    long: [30, 60]
  };
  const breakFrequencies = [60, 90, 120];
  
  const timeSlots = [
    'Morning (6-9)',
    'Late Morning (9-12)',
    'Afternoon (12-17)',
    'Evening (17-20)',
    'Night (20-23)'
  ];
  
  const toggleTimeSlot = (slot) => {
    setPreferences(prev => ({
      ...prev,
      preferredTimes: prev.preferredTimes.includes(slot)
        ? prev.preferredTimes.filter(t => t !== slot)
        : [...prev.preferredTimes, slot]
    }));
  };
  
  const handleContinue = () => {
    if (preferences.preferredTimes.length === 0) {
      toast.warning('Please select at least one preferred study time');
      return;
    }
    
    // Save to localStorage
    localStorage.setItem('studyPreferences', JSON.stringify(preferences));
    toast.success('Study preferences saved!');
    navigate('/onboarding/life-essentials');
  };
  
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <ToastContainer toasts={toast.toasts} removeToast={toast.removeToast} />
      
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/onboarding/activities')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          <div className="text-center">
            <p className="text-sm text-slate-400">Step 3 of 4</p>
          </div>
          
          <button
            className="text-slate-400 hover:text-white transition-colors"
            onClick={() => navigate('/')}
          >
            <span className="text-2xl">×</span>
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="h-1 bg-slate-800">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 w-3/4 transition-all duration-300" />
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Study Preferences
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Help us understand how you study best. We'll schedule optimal study sessions for each of your courses.
          </p>
        </div>
        
        {/* Study Session Duration */}
        <Card className="mb-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>📚</span>
            Study Session Duration
          </h3>
          <p className="text-slate-400 mb-6 text-sm">
            How long do you prefer to study in one session?
          </p>
          
          <div className="grid grid-cols-4 gap-3">
            {sessionDurations.map((duration) => (
              <button
                key={duration}
                onClick={() => setPreferences({ ...preferences, sessionDuration: duration })}
                className={`
                  p-4 rounded-xl font-semibold transition-all
                  ${preferences.sessionDuration === duration
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white scale-105 shadow-lg'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }
                `}
              >
                <div className="text-2xl mb-1">{duration}</div>
                <div className="text-xs opacity-75">minutes</div>
              </button>
            ))}
          </div>
        </Card>
        
        {/* Weekly Study Time per Course */}
        <Card className="mb-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>⏰</span>
            Weekly Study Time per Course
          </h3>
          <p className="text-slate-400 mb-6 text-sm">
            How many hours per week do you want to dedicate to each course?
          </p>
          
          <Slider
            value={preferences.hoursPerCoursePerWeek}
            onChange={(value) => setPreferences({ ...preferences, hoursPerCoursePerWeek: value })}
            min={2}
            max={10}
            step={1}
            unit="hours"
            marks={['2h', '', '', '', '6h', '', '', '', '10h']}
          />
          
          <div className="mt-4 p-4 bg-slate-800/50 rounded-lg">
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-indigo-400">
                Total study time per week: 
              </span>
              {' '}
              <span className="text-white font-bold">
                ~{preferences.hoursPerCoursePerWeek * 8} hours
              </span>
              {' '}
              <span className="text-slate-400">
                (based on your schedule)
              </span>
            </p>
          </div>
        </Card>
        
        {/* Preferred Study Times */}
        <Card className="mb-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>🕐</span>
            Best Times to Study
          </h3>
          <p className="text-slate-400 mb-6 text-sm">
            When do you feel most productive? Select all that apply.
          </p>
          
          <div className="flex flex-wrap gap-3">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => toggleTimeSlot(slot)}
                className={`
                  px-5 py-3 rounded-xl font-semibold transition-all
                  ${preferences.preferredTimes.includes(slot)
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white scale-105 shadow-lg'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }
                `}
              >
                {slot}
              </button>
            ))}
          </div>
          
          {preferences.preferredTimes.length === 0 && (
            <p className="mt-4 text-sm text-amber-400 flex items-center gap-2">
              <span>⚠️</span>
              Please select at least one time slot
            </p>
          )}
        </Card>
        
        {/* Break Preferences */}
        <Card className="mb-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>☕</span>
            Break Preferences
          </h3>
          <p className="text-slate-400 mb-6 text-sm">
            Taking breaks helps maintain focus and productivity.
          </p>
          
          <div className="space-y-6">
            {/* Short Breaks */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Short break duration
              </label>
              <div className="grid grid-cols-3 gap-3">
                {breakDurations.short.map((duration) => (
                  <button
                    key={duration}
                    onClick={() => setPreferences({ ...preferences, shortBreak: duration })}
                    className={`
                      p-3 rounded-lg font-semibold transition-all
                      ${preferences.shortBreak === duration
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }
                    `}
                  >
                    {duration} min
                  </button>
                ))}
              </div>
            </div>
            
            {/* Long Breaks */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Long break duration
              </label>
              <div className="grid grid-cols-2 gap-3">
                {breakDurations.long.map((duration) => (
                  <button
                    key={duration}
                    onClick={() => setPreferences({ ...preferences, longBreak: duration })}
                    className={`
                      p-3 rounded-lg font-semibold transition-all
                      ${preferences.longBreak === duration
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }
                    `}
                  >
                    {duration} min
                  </button>
                ))}
              </div>
            </div>
            
            {/* Break Frequency */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Take a break every
              </label>
              <div className="grid grid-cols-3 gap-3">
                {breakFrequencies.map((freq) => (
                  <button
                    key={freq}
                    onClick={() => setPreferences({ ...preferences, breakFrequency: freq })}
                    className={`
                      p-3 rounded-lg font-semibold transition-all
                      ${preferences.breakFrequency === freq
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }
                    `}
                  >
                    {freq} min
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>
        
        {/* Summary Card */}
        <Card className="mb-8 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border-indigo-500/30">
          <h3 className="text-lg font-bold text-white mb-3">Your Study Plan Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-400">Session Length:</span>
              <p className="text-white font-semibold">{preferences.sessionDuration} minutes</p>
            </div>
            <div>
              <span className="text-slate-400">Hours per Course:</span>
              <p className="text-white font-semibold">{preferences.hoursPerCoursePerWeek} hours/week</p>
            </div>
            <div>
              <span className="text-slate-400">Study Times:</span>
              <p className="text-white font-semibold">
                {preferences.preferredTimes.length > 0 
                  ? `${preferences.preferredTimes.length} time slots` 
                  : 'None selected'}
              </p>
            </div>
            <div>
              <span className="text-slate-400">Break Pattern:</span>
              <p className="text-white font-semibold">
                {preferences.shortBreak}min / {preferences.breakFrequency}min
              </p>
            </div>
          </div>
        </Card>
        
        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate('/onboarding/activities')}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Activities
          </Button>
          
          <Button
            variant="primary"
            size="lg"
            icon={ArrowRight}
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudyPreferences;