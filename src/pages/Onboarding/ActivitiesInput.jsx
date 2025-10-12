import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { ActivityForm } from '../../components/features/ActivityForm';
import { useToast } from '../../hooks/useToast';
import { ToastContainer } from '../../components/ui/Toast';

const ActivitiesInput = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [activities, setActivities] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  
  const handleAddActivity = () => {
    setEditingActivity(null);
    setEditingIndex(null);
    setIsFormOpen(true);
  };
  
  const handleEditActivity = (activity, index) => {
    setEditingActivity(activity);
    setEditingIndex(index);
    setIsFormOpen(true);
  };
  
  const handleSaveActivity = (activityData) => {
    if (editingIndex !== null) {
      // Update existing
      const updated = [...activities];
      updated[editingIndex] = activityData;
      setActivities(updated);
      toast.success('Activity updated!');
    } else {
      // Add new
      setActivities([...activities, activityData]);
      toast.success('Activity added!');
    }
  };
  
  const handleDeleteActivity = (index) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      setActivities(activities.filter((_, i) => i !== index));
      toast.success('Activity deleted!');
    }
  };
  
  const handleContinue = () => {
    // Save to localStorage
    localStorage.setItem('userActivities', JSON.stringify(activities));
    navigate('/onboarding/study-preferences');
  };
  
  const handleSkip = () => {
    if (window.confirm('Skip adding activities? You can add them later.')) {
      localStorage.setItem('userActivities', JSON.stringify([]));
      navigate('/onboarding/study-preferences');
    }
  };
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'from-red-500 to-orange-600';
      case 'Medium':
        return 'from-amber-500 to-yellow-600';
      case 'Low':
        return 'from-gray-500 to-gray-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <ToastContainer toasts={toast.toasts} removeToast={toast.removeToast} />
      
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/onboarding/review-schedule')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          <div className="text-center">
            <p className="text-sm text-slate-400">Step 3 of 4</p>
          </div>
          
          <button
            onClick={handleSkip}
            className="text-slate-400 hover:text-white transition-colors text-sm"
          >
            Skip
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
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl flex items-center justify-center">
            <span className="text-5xl">🎯</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Activities & Hobbies
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Tell us about the activities you enjoy. We'll make sure to find time for them in your schedule.
          </p>
        </div>
        
        {/* Activities List */}
        <div className="mb-8">
          {activities.length === 0 ? (
            <Card className="text-center py-12">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-2 text-white">No activities yet</h3>
              <p className="text-slate-400 mb-6">
                Add your hobbies and activities to create a balanced schedule
              </p>
              <Button variant="primary" icon={Plus} onClick={handleAddActivity}>
                Add Your First Activity
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <Card key={index} className="group">
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                      {activity.icon}
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {activity.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                        <span>⏱️ {activity.duration} min</span>
                        <span>📅 {activity.frequency}</span>
                        {activity.preferredTimes.length > 0 && (
                          <span>🕐 {activity.preferredTimes[0]}</span>
                        )}
                      </div>
                      <div className="mt-2">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getPriorityColor(activity.priority)} text-white`}>
                          {activity.priority} Priority
                        </span>
                        {activity.flexible && (
                          <span className="inline-block ml-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-700 text-slate-300">
                            Flexible
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEditActivity(activity, index)}
                        className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-5 h-5 text-slate-300" />
                      </button>
                      <button
                        onClick={() => handleDeleteActivity(index)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-red-400" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
              
              {/* Add More Button */}
              <button
                onClick={handleAddActivity}
                className="w-full border-2 border-dashed border-slate-700 hover:border-indigo-500 hover:bg-indigo-500/10 rounded-2xl p-6 transition-all group"
              >
                <Plus className="w-8 h-8 text-slate-600 group-hover:text-indigo-400 mx-auto mb-2 transition-colors" />
                <span className="text-slate-400 group-hover:text-slate-300 font-semibold">
                  Add Another Activity
                </span>
              </button>
            </div>
          )}
        </div>
        
        {/* Info Box */}
        {activities.length > 0 && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-8">
            <div className="flex gap-3">
              <div className="text-blue-400 mt-0.5">💡</div>
              <div>
                <h4 className="text-white font-semibold mb-1">Great choices!</h4>
                <p className="text-sm text-slate-300">
                  You've added {activities.length} {activities.length === 1 ? 'activity' : 'activities'}. 
                  Our AI will find the perfect time slots for them in your schedule.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate('/onboarding/review-schedule')}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Schedule
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
      
      {/* Activity Form Modal */}
      <ActivityForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveActivity}
        editingActivity={editingActivity}
      />
    </div>
  );
};

export default ActivitiesInput;