import React from 'react';
import { Clock } from 'lucide-react';

const TimePicker = ({ 
  label, 
  value, 
  onChange, 
  required = false,
  className = '' 
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <Clock className="w-5 h-5" />
        </div>
        
        <input
          type="time"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full h-12 pl-12 pr-4
            bg-slate-800 border-2 border-slate-700 rounded-lg
            text-white font-mono
            transition-all duration-200
            focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20
            hover:border-slate-600
          "
        />
      </div>
    </div>
  );
};

export default TimePicker;
export { TimePicker };