import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { generateSchedule } from '../../utils/scheduleGenerator';

const GenerateSchedule = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [generatedSchedule, setGeneratedSchedule] = useState(null);
  const [error, setError] = useState(null);
  
  const steps = [
    { label: 'Analyzing your classes', icon: '📚' },
    { label: 'Scheduling study sessions', icon: '✏️' },
    { label: 'Adding your activities', icon: '🎯' },
    { label: 'Balancing everything', icon: '⚖️' },
    { label: 'Optimizing your schedule', icon: '✨' }
  ];
  
  useEffect(() => {
    const generateUserSchedule = async () => {
      try {
        // Load all user data from localStorage
        const parsedSchedule = JSON.parse(localStorage.getItem('parsedSchedule') || '{"classes":[]}');
        const userActivities = JSON.parse(localStorage.getItem('userActivities') || '[]');
        const studyPreferences = JSON.parse(localStorage.getItem('studyPreferences') || '{}');
        const lifeEssentials = JSON.parse(localStorage.getItem('lifeEssentials') || '{}');
        
        // Simulate progress through steps
        for (let i = 0; i < steps.length; i++) {
          setCurrentStep(i);
          setProgress(((i + 1) / steps.length) * 100);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        // Generate the schedule
        const result = await generateSchedule({
          classes: parsedSchedule.classes,
          activities: userActivities,
          studyPreferences,
          lifeEssentials
        });
        
        // Save generated schedule
        localStorage.setItem('generatedSchedule', JSON.stringify(result));
        setGeneratedSchedule(result);
        setStatus('success');
        
        // Auto-redirect after 2 seconds
        setTimeout(() => {
          navigate('/schedule/view');
        }, 2000);
        
      } catch (err) {
        console.error('Error generating schedule:', err);
        setError(err.message || 'Failed to generate schedule');
        setStatus('error');
      }
    };
    
    generateUserSchedule();
  }, [navigate]);
  
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        {status === 'loading' && (
          <div className="text-center">
            {/* Animated Spinner */}
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 opacity-20 animate-pulse"></div>
              <div className="absolute inset-2 rounded-full bg-slate-950"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-16 h-16 text-indigo-400 animate-spin" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold mb-4">
              Creating Your Perfect Schedule
            </h1>
            <p className="text-slate-400 mb-12">
              This usually takes just a few seconds...
            </p>
            
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            
            {/* Steps */}
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`
                    flex items-center gap-3 p-4 rounded-lg transition-all
                    ${index === currentStep 
                      ? 'bg-indigo-500/20 border-2 border-indigo-500/50' 
                      : index < currentStep
                        ? 'bg-slate-800/50 border-2 border-slate-700'
                        : 'bg-slate-800/30 border-2 border-slate-800'
                    }
                  `}
                >
                  <div className="text-2xl">{step.icon}</div>
                  <div className="flex-1 text-left">
                    <p className={`font-medium ${
                      index <= currentStep ? 'text-white' : 'text-slate-500'
                    }`}>
                      {step.label}
                    </p>
                  </div>
                  {index < currentStep && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                  {index === currentStep && (
                    <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {status === 'success' && (
          <div className="text-center">
            {/* Success Animation */}
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 opacity-20 animate-pulse"></div>
              <div className="absolute inset-2 rounded-full bg-slate-950"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <CheckCircle className="w-16 h-16 text-green-400" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold mb-4">
              Schedule Created Successfully! 🎉
            </h1>
            <p className="text-slate-400 mb-8">
              Your personalized schedule is ready. Redirecting...
            </p>
            
            {generatedSchedule && (
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-bold mb-4">Schedule Summary</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">Classes:</span>
                    <p className="text-white font-semibold">
                      {generatedSchedule.stats?.totalClasses || 0}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400">Study Sessions:</span>
                    <p className="text-white font-semibold">
                      {generatedSchedule.stats?.totalStudySessions || 0}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400">Activities:</span>
                    <p className="text-white font-semibold">
                      {generatedSchedule.stats?.totalActivities || 0}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400">Free Time:</span>
                    <p className="text-white font-semibold">
                      {generatedSchedule.stats?.totalFreeTime || 0}h
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/schedule/view')}
            >
              View My Schedule
            </Button>
          </div>
        )}
        
        {status === 'error' && (
          <div className="text-center">
            {/* Error Icon */}
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-red-600 opacity-20"></div>
              <div className="absolute inset-2 rounded-full bg-slate-950"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <AlertCircle className="w-16 h-16 text-red-400" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold mb-4">
              Something Went Wrong
            </h1>
            <p className="text-slate-400 mb-8">
              {error || 'Failed to generate your schedule. Please try again.'}
            </p>
            
            <div className="flex gap-4 justify-center">
              <Button
                variant="secondary"
                onClick={() => navigate('/onboarding/life-essentials')}
              >
                Go Back
              </Button>
              <Button
                variant="primary"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateSchedule;