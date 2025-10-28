import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Download, Share2, Settings, BarChart3, Menu, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Calendar } from '../components/schedule/Calendar';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/ui/Toast';

const ScheduleView = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [schedule, setSchedule] = useState(null);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [viewMode, setViewMode] = useState('week'); // 'week' or 'day'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    // Load generated schedule
    const savedSchedule = localStorage.getItem('generatedSchedule');
    if (savedSchedule) {
      const parsed = JSON.parse(savedSchedule);
      setSchedule(parsed);
    } else {
      toast.error('No schedule found. Redirecting...');
      setTimeout(() => navigate('/onboarding/upload-schedule'), 2000);
    }
  }, [navigate, toast]);
  
  if (!schedule) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading your schedule...</p>
        </div>
      </div>
    );
  }
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const currentSchedule = viewMode === 'week' ? schedule.schedule : { [selectedDay]: schedule.schedule[selectedDay] };
  
  const handleSyncToCalendar = () => {
    toast.info('Google Calendar sync coming soon!');
    // TODO: Implement Google Calendar sync
  };
  
  const handleExport = () => {
    // Export schedule as JSON
    const dataStr = JSON.stringify(schedule, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my-schedule.json';
    link.click();
    toast.success('Schedule exported!');
  };
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My UAIC Schedule',
          text: 'Check out my personalized university schedule!',
          url: window.location.href
        });
        toast.success('Shared successfully!');
      } catch (err) {
        if (err.name !== 'AbortError') {
          toast.error('Failed to share');
        }
      }
    } else {
      // Fallback: copy link
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <ToastContainer toasts={toast.toasts} removeToast={toast.removeToast} />
      
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <CalendarIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                  TimeFlow
                </h1>
                <p className="text-xs text-slate-400">Your Schedule</p>
              </div>
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                icon={BarChart3}
                onClick={() => navigate('/analytics')}
              >
                Analytics
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon={Download}
                onClick={handleExport}
              >
                Export
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon={Share2}
                onClick={handleShare}
              >
                Share
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={CalendarIcon}
                onClick={handleSyncToCalendar}
              >
                Sync to Calendar
              </Button>
              <button
                onClick={() => navigate('/settings')}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2 border-t border-slate-800 pt-4">
              <Button
                variant="secondary"
                size="sm"
                icon={BarChart3}
                onClick={() => navigate('/analytics')}
                className="w-full"
              >
                Analytics
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon={Download}
                onClick={handleExport}
                className="w-full"
              >
                Export
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon={Share2}
                onClick={handleShare}
                className="w-full"
              >
                Share
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={CalendarIcon}
                onClick={handleSyncToCalendar}
                className="w-full"
              >
                Sync to Calendar
              </Button>
            </div>
          )}
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Your Personalized Schedule ✨</h2>
          <p className="text-slate-400">
            Your perfect balance of classes, study time, and activities
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <div className="text-3xl font-bold text-white mb-1">
              {schedule.stats?.totalClasses || 0}
            </div>
            <div className="text-sm text-slate-400">Classes</div>
          </Card>
          
          <Card className="text-center">
            <div className="text-3xl font-bold text-white mb-1">
              {schedule.stats?.totalStudySessions || 0}
            </div>
            <div className="text-sm text-slate-400">Study Sessions</div>
          </Card>
          
          <Card className="text-center">
            <div className="text-3xl font-bold text-white mb-1">
              {schedule.stats?.totalActivities || 0}
            </div>
            <div className="text-sm text-slate-400">Activities</div>
          </Card>
          
          <Card className="text-center">
            <div className="text-3xl font-bold text-white mb-1">
              {schedule.stats?.totalFreeTime || 0}h
            </div>
            <div className="text-sm text-slate-400">Free Time</div>
          </Card>
        </div>
        
        {/* View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('week')}
              className={`
                px-4 py-2 rounded-lg font-semibold transition-all
                ${viewMode === 'week'
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }
              `}
            >
              Week View
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`
                px-4 py-2 rounded-lg font-semibold transition-all
                ${viewMode === 'day'
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }
              `}
            >
              Day View
            </button>
          </div>
          
          {viewMode === 'day' && (
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="px-4 py-2 bg-slate-800 border-2 border-slate-700 rounded-lg text-white outline-none focus:border-indigo-500"
            >
              {days.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          )}
        </div>
        
        {/* Schedule Display */}
        {viewMode === 'week' ? (
          <WeekView schedule={schedule.schedule} />
        ) : (
          <DayView day={selectedDay} events={schedule.schedule[selectedDay] || []} />
        )}
        
        {/* Legend */}
        <Card className="mt-8">
          <h3 className="text-lg font-bold mb-4">Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-purple-500 to-blue-600"></div>
              <span className="text-sm text-slate-300">Classes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-green-500 to-emerald-600"></div>
              <span className="text-sm text-slate-300">Study</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-orange-500 to-red-600"></div>
              <span className="text-sm text-slate-300">Activities</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-amber-500 to-yellow-600"></div>
              <span className="text-sm text-slate-300">Meals</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-purple-600 to-indigo-700"></div>
              <span className="text-sm text-slate-300">Sleep</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-pink-500 to-rose-600"></div>
              <span className="text-sm text-slate-300">Commute</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-gray-500 to-gray-600"></div>
              <span className="text-sm text-slate-300">Free Time</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Week View Component
const WeekView = ({ schedule }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const hours = Array.from({ length: 17 }, (_, i) => i + 6); // 6 AM to 11 PM
  
  return (
    <Card className="overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Header */}
        <div className="grid grid-cols-6 gap-2 mb-2">
          <div className="text-center font-semibold text-slate-400 text-sm py-3">
            Time
          </div>
          {days.map(day => (
            <div key={day} className="text-center bg-slate-800/50 rounded-lg py-3">
              <div className="font-bold text-white">{day}</div>
              <div className="text-xs text-slate-400">
                {schedule[day]?.filter(e => e.type !== 'sleep').length || 0} events
              </div>
            </div>
          ))}
        </div>
        
        {/* Grid */}
        <div className="space-y-1">
          {hours.map(hour => (
            <div key={hour} className="grid grid-cols-6 gap-2">
              {/* Time Label */}
              <div className="text-center text-sm text-slate-400 py-2 font-mono">
                {hour.toString().padStart(2, '0')}:00
              </div>
              
              {/* Day Cells */}
              {days.map(day => {
                const events = schedule[day]?.filter(event => {
                  const eventHour = parseInt(event.startTime.split(':')[0]);
                  const eventType = event.type;
                  // Don't show sleep in week view
                  return eventHour === hour && eventType !== 'sleep';
                }) || [];
                
                if (events.length === 0) {
                  return (
                    <div 
                      key={`${day}-${hour}`} 
                      className="bg-slate-900/30 rounded-lg min-h-[60px] border border-slate-800/50"
                    />
                  );
                }
                
                return (
                  <div key={`${day}-${hour}`} className="space-y-1">
                    {events.map((event, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-lg text-xs text-white"
                        style={{ backgroundColor: event.color }}
                      >
                        <div className="font-semibold truncate">{event.title}</div>
                        <div className="opacity-75">{event.startTime} - {event.endTime}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

// Day View Component
const DayView = ({ day, events }) => {
  const filteredEvents = events.filter(e => e.type !== 'sleep').sort((a, b) => {
    const aTime = parseInt(a.startTime.split(':')[0]) * 60 + parseInt(a.startTime.split(':')[1]);
    const bTime = parseInt(b.startTime.split(':')[0]) * 60 + parseInt(b.startTime.split(':')[1]);
    return aTime - bTime;
  });
  
  return (
    <div className="space-y-3">
      {filteredEvents.length === 0 ? (
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-xl font-bold mb-2">Free Day!</h3>
          <p className="text-slate-400">No scheduled events for {day}</p>
        </Card>
      ) : (
        filteredEvents.map((event, idx) => (
          <Card key={idx} className="p-4 border-l-4" style={{ borderLeftColor: event.color }}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: event.color }}
                  >
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                  <span className="text-sm font-mono text-slate-400">
                    {event.startTime} - {event.endTime}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {event.title}
                </h3>
                {event.location && (
                  <p className="text-sm text-slate-400">📍 {event.location}</p>
                )}
                {event.professor && (
                  <p className="text-sm text-slate-400">👤 {event.professor}</p>
                )}
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default ScheduleView;