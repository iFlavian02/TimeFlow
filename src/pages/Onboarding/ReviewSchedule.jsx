import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Calendar } from '../../components/schedule/Calendar';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Dropdown } from '../../components/ui/Dropdown';
import { useToast } from '../../hooks/useToast';
import { ToastContainer } from '../../components/ui/Toast';

const ReviewSchedule = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [schedule, setSchedule] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    day: '',
    startTime: '',
    endTime: '',
    subject: '',
    type: '',
    professor: '',
    room: '',
    frequency: ''
  });
  
  useEffect(() => {
    // Load parsed schedule from localStorage
    const savedSchedule = localStorage.getItem('parsedSchedule');
    if (savedSchedule) {
      const parsed = JSON.parse(savedSchedule);
      setSchedule(parsed.classes || []);
    } else {
      toast.warning('No schedule found. Please upload your schedule first.');
      setTimeout(() => navigate('/onboarding/upload-schedule'), 2000);
    }
  }, [navigate, toast]);
  
  const handleClassClick = (classData) => {
    const index = schedule.findIndex(c => 
      c.day === classData.day && 
      c.startTime === classData.startTime && 
      c.subject === classData.subject
    );
    
    setEditingClass(classData);
    setEditingIndex(index);
    setFormData(classData);
    setIsAddingNew(false);
    setIsEditModalOpen(true);
  };
  
  const handleAddNew = () => {
    setEditingClass(null);
    setEditingIndex(null);
    setFormData({
      day: 'Monday',
      startTime: '08:00',
      endTime: '10:00',
      subject: '',
      type: 'Curs',
      professor: '',
      room: '',
      frequency: ''
    });
    setIsAddingNew(true);
    setIsEditModalOpen(true);
  };
  
  const handleSave = () => {
    // Validate
    if (!formData.subject || !formData.day || !formData.startTime || !formData.endTime) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    let updatedSchedule;
    if (isAddingNew) {
      updatedSchedule = [...schedule, formData];
      toast.success('Class added successfully!');
    } else {
      updatedSchedule = [...schedule];
      updatedSchedule[editingIndex] = formData;
      toast.success('Class updated successfully!');
    }
    
    setSchedule(updatedSchedule);
    localStorage.setItem('parsedSchedule', JSON.stringify({ classes: updatedSchedule }));
    setIsEditModalOpen(false);
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      const updatedSchedule = schedule.filter((_, idx) => idx !== editingIndex);
      setSchedule(updatedSchedule);
      localStorage.setItem('parsedSchedule', JSON.stringify({ classes: updatedSchedule }));
      setIsEditModalOpen(false);
      toast.success('Class deleted successfully!');
    }
  };
  
  const handleContinue = () => {
    if (schedule.length === 0) {
      toast.warning('Please add at least one class');
      return;
    }
    
    // Save and continue to activities input
    localStorage.setItem('parsedSchedule', JSON.stringify({ classes: schedule }));
    navigate('/onboarding/activities');
  };
  
  const dayOptions = [
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
  ];
  
  const typeOptions = [
    { value: 'Curs', label: 'Curs (Lecture)' },
    { value: 'Seminar', label: 'Seminar' },
    { value: 'Laborator', label: 'Laborator (Lab)' },
    { value: 'Seminar Facultativ', label: 'Seminar Facultativ (Optional)' },
  ];
  
  const frequencyOptions = [
    { value: '', label: 'Every week' },
    { value: 'Pare', label: 'Even weeks only' },
    { value: 'Impare', label: 'Odd weeks only' },
  ];
  
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <ToastContainer toasts={toast.toasts} removeToast={toast.removeToast} />
      
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/onboarding/upload-schedule')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          <div className="text-center">
            <p className="text-sm text-slate-400">Step 2 of 4</p>
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
          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 w-2/4 transition-all duration-300" />
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Review Your Schedule
          </h1>
          <p className="text-xl text-slate-400">
            Check if everything looks correct. You can edit any class or add new ones.
          </p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl p-4">
            <div className="text-3xl font-bold text-white mb-1">
              {schedule.length}
            </div>
            <div className="text-sm text-slate-400">Total Classes</div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl p-4">
            <div className="text-3xl font-bold text-white mb-1">
              {schedule.filter(c => c.type === 'Curs').length}
            </div>
            <div className="text-sm text-slate-400">Lectures</div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl p-4">
            <div className="text-3xl font-bold text-white mb-1">
              {schedule.filter(c => c.type === 'Seminar').length}
            </div>
            <div className="text-sm text-slate-400">Seminars</div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl p-4">
            <div className="text-3xl font-bold text-white mb-1">
              {schedule.filter(c => c.type === 'Laborator').length}
            </div>
            <div className="text-sm text-slate-400">Labs</div>
          </div>
        </div>
        
        {/* Calendar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Weekly Schedule</h2>
            <Button
              variant="primary"
              size="md"
              icon={Plus}
              onClick={handleAddNew}
            >
              Add Class
            </Button>
          </div>
          
          {schedule.length > 0 ? (
            <Calendar schedule={schedule} onClassClick={handleClassClick} />
          ) : (
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-12 text-center">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-bold mb-2">No classes yet</h3>
              <p className="text-slate-400 mb-6">Add your first class to get started</p>
              <Button variant="primary" icon={Plus} onClick={handleAddNew}>
                Add Class
              </Button>
            </div>
          )}
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate('/onboarding/upload-schedule')}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Upload
          </Button>
          
          <Button
            variant="primary"
            size="lg"
            icon={ArrowRight}
            onClick={handleContinue}
          >
            Continue to Activities
          </Button>
        </div>
      </div>
      
      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={isAddingNew ? 'Add New Class' : 'Edit Class'}
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="Subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="e.g., Matematică - Calcul Diferențial"
            required
          />
          
          <Dropdown
            label="Type"
            value={formData.type}
            onChange={(value) => setFormData({ ...formData, type: value })}
            options={typeOptions}
            required
          />
          
          <Dropdown
            label="Day"
            value={formData.day}
            onChange={(value) => setFormData({ ...formData, day: value })}
            options={dayOptions}
            required
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start Time"
              type="time"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              required
            />
            
            <Input
              label="End Time"
              type="time"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              required
            />
          </div>
          
          <Input
            label="Professor"
            value={formData.professor}
            onChange={(e) => setFormData({ ...formData, professor: e.target.value })}
            placeholder="e.g., Conf. dr. Arusoaie Andreea"
          />
          
          <Input
            label="Room"
            value={formData.room}
            onChange={(e) => setFormData({ ...formData, room: e.target.value })}
            placeholder="e.g., C2"
          />
          
          <Dropdown
            label="Frequency"
            value={formData.frequency}
            onChange={(value) => setFormData({ ...formData, frequency: value })}
            options={frequencyOptions}
          />
          
          <div className="flex gap-3 pt-4">
            {!isAddingNew && (
              <Button
                variant="danger"
                onClick={handleDelete}
                icon={Trash2}
                className="flex-1"
              >
                Delete
              </Button>
            )}
            
            <Button
              variant="secondary"
              onClick={() => setIsEditModalOpen(false)}
              icon={X}
              className="flex-1"
            >
              Cancel
            </Button>
            
            <Button
              variant="primary"
              onClick={handleSave}
              icon={Save}
              className="flex-1"
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ReviewSchedule;