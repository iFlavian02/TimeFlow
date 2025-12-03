import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { UploadZone } from '../../components/features/UploadZone';
import { useToast } from '../../hooks/useToast';
import { ToastContainer } from '../../components/ui/Toast';
import { uploadSchedule } from '../../utils/api';
import { validateSchedule } from '../../utils/scheduleParser';
import ScheduleContext from '../../context/ScheduleContext';

const UploadSchedule = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const {
    parsedSchedule,
    setParsedSchedule,
    isLoading,
    setIsLoading,
    setError,
  } = useContext(ScheduleContext);

  const handleFileSelect = async (file) => {
    setIsLoading(true);
    setError(null);

    try {
      // This will be a mock API call for now
      const result = await uploadSchedule(file);

      const validation = validateSchedule(result);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      setParsedSchedule(result);
      toast.success(`Schedule parsed successfully! Found ${result.classes.length} classes.`);
    } catch (error) {
      console.error('Error parsing schedule:', error);
      const errorMessage = error.message || 'Failed to parse schedule. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      setParsedSchedule(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    if (!parsedSchedule) {
      toast.warning('Please upload and process a schedule first');
      return;
    }
    navigate('/onboarding/review-schedule');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <ToastContainer toasts={toast.toasts} removeToast={toast.removeToast} />

      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <div className="text-center">
            <p className="text-sm text-slate-400">Step 1 of 4</p>
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
          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 w-1/4 transition-all duration-300" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl flex items-center justify-center">
            <span className="text-5xl">📸</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Upload Your Schedule
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Take a photo or upload your university schedule from UAIC.
            Our AI will automatically extract all your classes.
          </p>
        </div>

        {/* Upload Zone */}
        <div className="mb-8">
          <UploadZone
            onFileSelect={handleFileSelect}
            isLoading={isLoading}
          />
        </div>

        {/* Parsed Data Preview */}
        {parsedSchedule && !isLoading && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <div className="text-green-400 text-2xl">✓</div>
              <div className="flex-1">
                <h4 className="text-white font-semibold mb-2">
                  Schedule Parsed Successfully!
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">Total Classes:</span>
                    <span className="text-white ml-2 font-semibold">
                      {parsedSchedule.classes.length}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Lectures:</span>
                    <span className="text-white ml-2 font-semibold">
                      {parsedSchedule.classes.filter(c => c.type === 'Curs').length}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Seminars:</span>
                    <span className="text-white ml-2 font-semibold">
                      {parsedSchedule.classes.filter(c => c.type === 'Seminar').length}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Labs:</span>
                    <span className="text-white ml-2 font-semibold">
                      {parsedSchedule.classes.filter(c => c.type === 'Laborator').length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-8">
          <div className="flex gap-3">
            <div className="text-blue-400 mt-0.5">ℹ️</div>
            <div>
              <h4 className="text-white font-semibold mb-1">Tips for best results:</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Make sure the schedule is clearly visible</li>
                <li>• All text should be readable</li>
                <li>• Avoid shadows or glare</li>
                <li>• The entire table should be in frame</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-end">
          <Button
            variant="primary"
            size="lg"
            icon={ArrowRight}
            onClick={handleContinue}
            disabled={!parsedSchedule || isLoading}
          >
            Continue to Review
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadSchedule;