import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Moon, Sun, Coffee, UtensilsCrossed, Bus } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { TimePicker } from '../../components/ui/TimePicker';
import { Slider } from '../../components/ui/Slider';
import { Dropdown } from '../../components/ui/Dropdown';
import { useToast } from '../../hooks/useToast';
import { ToastContainer } from '../../components/ui/Toast';

const LifeEssentials = () => {
  const navigate = useNavigate();
  const toast = useToast();
  
  const [essentials, setEssentials] = useState({
    sleep: {
      bedtime: '23:00',
      wakeTime: '07:00'
    },
    meals: {
      breakfast: { time: '07:30', duration: 30 },
      lunch: { time: '13:00', duration: 45 },
      dinner: { time: '19:00', duration: 45 }
    },
    commute: 45
  });
  
  const mealDurations = [
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 45, label: '45 minutes' },
    { value: 60, label: '1 hour' },
    { value: 90, label: '1.5 hours' }
  ];
  
  const calculateSleepHours = () => {
    const bedtime = essentials.sleep.bedtime.split(':');
    const wakeTime = essentials.sleep.wakeTime.split(':');
    
    let bedHour = parseInt(bedtime[0]);
    let bedMin = parseInt(bedtime[1]);
    let wakeHour = parseInt(wakeTime[0]);
    let wakeMin = parseInt(wakeTime[1]);
    
    // Convert to minutes
    let bedMinutes = bedHour * 60 + bedMin;
    let wakeMinutes = wakeHour * 60 + wakeMin;
    
    // If wake time is before bed time, add 24 hours
    if (wakeMinutes <= bedMinutes) {
      wakeMinutes += 24 * 60;
    }
    
    const totalMinutes = wakeMinutes - bedMinutes;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return { hours, minutes, total: totalMinutes };
  };
  
  const sleepData = calculateSleepHours();
  
  const getSleepQuality = (hours) => {
    if (hours >= 7 && hours <= 9) return { text: 'Optimal', color: 'text-green-400', emoji: '✅' };
    if (hours >= 6 && hours < 7) return { text: 'Good', color: 'text-blue-400', emoji: '👍' };
    if (hours < 6) return { text: 'Too little', color: 'text-red-400', emoji: '⚠️' };
    return { text: 'Too much', color: 'text-amber-400', emoji: '😴' };
  };
  
  const quality = getSleepQuality(sleepData.hours);
  
  const handleContinue = () => {
    // Validate
    if (!essentials.sleep.bedtime || !essentials.sleep.wakeTime) {
      toast.error('Please set your sleep schedule');
      return;
    }
    
    // Save to localStorage
    localStorage.setItem('lifeEssentials', JSON.stringify(essentials));
    toast.success('Life essentials saved!');
    
    // Navigate to generation/loading page
    navigate('/onboarding/generate');
  };
  
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <ToastContainer toasts={toast.toasts} removeToast={toast.removeToast} />
      
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/onboarding/study-preferences')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          <div className="text-center">
            <p className="text-sm text-slate-400">Step 4 of 4</p>
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
          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 w-full transition-all duration-300" />
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center">
            <span className="text-5xl">🌟</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Life Essentials
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Let's make sure you stay healthy and balanced. Tell us about your sleep, meals, and daily routine.
          </p>
        </div>
        
        {/* Sleep Schedule */}
        <Card className="mb-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Moon className="w-6 h-6 text-purple-400" />
            Sleep Schedule
          </h3>
          <p className="text-slate-400 mb-6 text-sm">
            Consistent sleep is crucial for academic performance and well-being.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <TimePicker
                label="Bedtime"
                value={essentials.sleep.bedtime}
                onChange={(value) => setEssentials({
                  ...essentials,
                  sleep: { ...essentials.sleep, bedtime: value }
                })}
                required
              />
            </div>
            
            <div>
              <TimePicker
                label="Wake Time"
                value={essentials.sleep.wakeTime}
                onChange={(value) => setEssentials({
                  ...essentials,
                  sleep: { ...essentials.sleep, wakeTime: value }
                })}
                required
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
            <div>
              <p className="text-sm text-slate-400">Total Sleep Time</p>
              <p className="text-2xl font-bold text-white">
                {sleepData.hours}h {sleepData.minutes}m
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400">Sleep Quality</p>
              <p className={`text-lg font-bold ${quality.color} flex items-center gap-2 justify-end`}>
                <span>{quality.emoji}</span>
                {quality.text}
              </p>
            </div>
          </div>
          
          {sleepData.hours < 6 && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-sm text-red-400 flex items-center gap-2">
                <span>⚠️</span>
                Consider getting more sleep. Experts recommend 7-9 hours for optimal performance.
              </p>
            </div>
          )}
        </Card>
        
        {/* Meal Times */}
        <Card className="mb-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <UtensilsCrossed className="w-6 h-6 text-amber-400" />
            Meal Times
          </h3>
          <p className="text-slate-400 mb-6 text-sm">
            Regular meals help maintain energy levels throughout the day.
          </p>
          
          <div className="space-y-6">
            {/* Breakfast */}
            <div className="grid md:grid-cols-2 gap-4">
              <TimePicker
                label="🍳 Breakfast"
                value={essentials.meals.breakfast.time}
                onChange={(value) => setEssentials({
                  ...essentials,
                  meals: {
                    ...essentials.meals,
                    breakfast: { ...essentials.meals.breakfast, time: value }
                  }
                })}
              />
              <Dropdown
                label="Duration"
                value={essentials.meals.breakfast.duration}
                onChange={(value) => setEssentials({
                  ...essentials,
                  meals: {
                    ...essentials.meals,
                    breakfast: { ...essentials.meals.breakfast, duration: value }
                  }
                })}
                options={mealDurations}
              />
            </div>
            
            {/* Lunch */}
            <div className="grid md:grid-cols-2 gap-4">
              <TimePicker
                label="🍱 Lunch"
                value={essentials.meals.lunch.time}
                onChange={(value) => setEssentials({
                  ...essentials,
                  meals: {
                    ...essentials.meals,
                    lunch: { ...essentials.meals.lunch, time: value }
                  }
                })}
              />
              <Dropdown
                label="Duration"
                value={essentials.meals.lunch.duration}
                onChange={(value) => setEssentials({
                  ...essentials,
                  meals: {
                    ...essentials.meals,
                    lunch: { ...essentials.meals.lunch, duration: value }
                  }
                })}
                options={mealDurations}
              />
            </div>
            
            {/* Dinner */}
            <div className="grid md:grid-cols-2 gap-4">
              <TimePicker
                label="🍽️ Dinner"
                value={essentials.meals.dinner.time}
                onChange={(value) => setEssentials({
                  ...essentials,
                  meals: {
                    ...essentials.meals,
                    dinner: { ...essentials.meals.dinner, time: value }
                  }
                })}
              />
              <Dropdown
                label="Duration"
                value={essentials.meals.dinner.duration}
                onChange={(value) => setEssentials({
                  ...essentials,
                  meals: {
                    ...essentials.meals,
                    dinner: { ...essentials.meals.dinner, duration: value }
                  }
                })}
                options={mealDurations}
              />
            </div>
          </div>
        </Card>
        
        {/* Commute */}
        <Card className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Bus className="w-6 h-6 text-blue-400" />
            Commute to University
          </h3>
          <p className="text-slate-400 mb-6 text-sm">
            How long does it take you to get to UAIC? (one way)
          </p>
          
          <div className="mb-8">
            <Slider
              value={essentials.commute}
              onChange={(value) => setEssentials({ ...essentials, commute: value })}
              min={0}
              max={120}
              step={5}
              unit="minutes"
              marks={['0', '30', '60', '90', '120']}
            />
          </div>
          
          <div className="p-4 bg-slate-800/50 rounded-lg">
            <p className="text-sm text-slate-300">
              <span className="text-slate-400">Daily commute time:</span>
              {' '}
              <span className="text-white font-semibold">
                {essentials.commute * 2} minutes
              </span>
              {' '}
              <span className="text-slate-400">
                ({Math.floor(essentials.commute * 2 / 60)}h {(essentials.commute * 2) % 60}m round trip)
              </span>
            </p>
          </div>
        </Card>
        
        {/* Summary */}
        <Card className="mb-8 bg-gradient-to-br from-purple-500/10 to-pink-600/10 border-purple-500/30">
          <h3 className="text-lg font-bold text-white mb-3">✨ Almost There!</h3>
          <p className="text-slate-300 mb-4">
            We have everything we need to create your perfect schedule. Let's put it all together!
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-slate-400">Sleep:</span>
              <p className="text-white font-semibold">{sleepData.hours}h {sleepData.minutes}m</p>
            </div>
            <div>
              <span className="text-slate-400">Meals:</span>
              <p className="text-white font-semibold">3 per day</p>
            </div>
            <div>
              <span className="text-slate-400">Commute:</span>
              <p className="text-white font-semibold">{essentials.commute} min</p>
            </div>
            <div>
              <span className="text-slate-400">Classes:</span>
              <p className="text-white font-semibold">
                {JSON.parse(localStorage.getItem('parsedSchedule') || '{"classes":[]}').classes.length}
              </p>
            </div>
          </div>
        </Card>
        
        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate('/onboarding/study-preferences')}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Study Prefs
          </Button>
          
          <Button
            variant="primary"
            size="lg"
            icon={ArrowRight}
            onClick={handleContinue}
          >
            Generate My Schedule
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LifeEssentials;