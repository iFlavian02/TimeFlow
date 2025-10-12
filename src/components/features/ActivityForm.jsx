import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Dropdown } from '../ui/Dropdown';
import { Slider } from '../ui/Slider';
import { Checkbox } from '../ui/Checkbox';
import { Modal } from '../ui/Modal';

const ACTIVITY_ICONS = ['🏋️', '🎸', '📚', '🎮', '🏃', '🎨', '🍳', '☕', '🎬', '⚽', '🎭', '📷', '🎵', '✍️', '🧘', '🏊'];

const ActivityForm = ({ isOpen, onClose, onSave, editingActivity = null }) => {
  const [formData, setFormData] = useState(editingActivity || {
    name: '',
    icon: '🏋️',
    duration: 60,
    frequency: '3-5x/week',
    preferredTimes: [],
    priority: 'Medium',
    flexible: false
  });
  
  const durationOptions = [
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 hour' },
    { value: 90, label: '1.5 hours' },
    { value: 120, label: '2 hours' },
    { value: 180, label: '3 hours' }
  ];
  
  const frequencyOptions = [
    { value: 'Daily', label: 'Daily' },
    { value: '5-6x/week', label: '5-6x per week' },
    { value: '3-5x/week', label: '3-5x per week' },
    { value: '1-2x/week', label: '1-2x per week' },
    { value: 'Weekends', label: 'Weekends only' }
  ];
  
  const timeSlots = [
    'Morning (6-9)',
    'Late Morning (9-12)',
    'Afternoon (12-17)',
    'Evening (17-20)',
    'Night (20-23)'
  ];
  
  const priorityLevels = ['Low', 'Medium', 'High'];
  
  const toggleTimeSlot = (slot) => {
    setFormData(prev => ({
      ...prev,
      preferredTimes: prev.preferredTimes.includes(slot)
        ? prev.preferredTimes.filter(t => t !== slot)
        : [...prev.preferredTimes, slot]
    }));
  };
  
  const handleSave = () => {
    if (!formData.name.trim()) {
      alert('Please enter an activity name');
      return;
    }
    
    onSave(formData);
    onClose();
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingActivity ? 'Edit Activity' : 'Add Activity'}
      size="md"
    >
      <div className="space-y-6">
        {/* Activity Name */}
        <Input
          label="Activity Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., Gym, Guitar practice, Gaming"
          required
        />
        
        {/* Icon Picker */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-3">
            Choose Icon
          </label>
          <div className="grid grid-cols-8 gap-2">
            {ACTIVITY_ICONS.map((icon) => (
              <button
                key={icon}
                type="button"
                onClick={() => setFormData({ ...formData, icon })}
                className={`
                  w-12 h-12 text-2xl rounded-lg transition-all
                  ${formData.icon === icon
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 scale-110 shadow-lg'
                    : 'bg-slate-800 hover:bg-slate-700 hover:scale-105'
                  }
                `}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
        
        {/* Duration */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-3">
            Duration
          </label>
          <div className="grid grid-cols-5 gap-2">
            {durationOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFormData({ ...formData, duration: option.value })}
                className={`
                  px-3 py-2 rounded-lg text-sm font-semibold transition-all
                  ${formData.duration === option.value
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }
                `}
              >
                {option.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
        
        {/* Frequency */}
        <Dropdown
          label="Frequency"
          value={formData.frequency}
          onChange={(value) => setFormData({ ...formData, frequency: value })}
          options={frequencyOptions}
        />
        
        {/* Preferred Times */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-3">
            Preferred Times
          </label>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => toggleTimeSlot(slot)}
                className={`
                  px-4 py-2 rounded-full text-sm font-semibold transition-all
                  ${formData.preferredTimes.includes(slot)
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }
                `}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
        
        {/* Priority */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-3">
            Priority
          </label>
          <div className="grid grid-cols-3 gap-2">
            {priorityLevels.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setFormData({ ...formData, priority: level })}
                className={`
                  px-4 py-3 rounded-lg font-semibold transition-all
                  ${formData.priority === level
                    ? level === 'High' 
                      ? 'bg-gradient-to-br from-red-500 to-orange-600 text-white'
                      : level === 'Medium'
                        ? 'bg-gradient-to-br from-amber-500 to-yellow-600 text-white'
                        : 'bg-gradient-to-br from-gray-500 to-gray-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }
                `}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
        
        {/* Flexible */}
        <Checkbox
          label="Flexible timing (I can do this anytime)"
          checked={formData.flexible}
          onChange={(checked) => setFormData({ ...formData, flexible: checked })}
        />
        
        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            className="flex-1"
          >
            {editingActivity ? 'Update' : 'Add'} Activity
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ActivityForm;
export { ActivityForm };