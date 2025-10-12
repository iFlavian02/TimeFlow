import React from 'react';
import { Check } from 'lucide-react';

const Checkbox = ({ 
  label, 
  checked, 
  onChange, 
  disabled = false,
  className = ''
}) => {
  return (
    <label className={`flex items-center gap-3 cursor-pointer group ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div className={`
          w-5 h-5 rounded border-2 transition-all duration-200
          flex items-center justify-center
          ${checked 
            ? 'bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-500' 
            : 'bg-slate-800 border-slate-600 group-hover:border-slate-500'
          }
        `}>
          {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
        </div>
      </div>
      {label && (
        <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
export { Checkbox };