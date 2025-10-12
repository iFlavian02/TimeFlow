import React, { useState } from 'react';

const Input = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder,
  error,
  required = false,
  className = '',
  icon: Icon,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full h-12 px-4 ${Icon ? 'pl-12' : ''} 
            bg-slate-800 border-2 rounded-lg
            text-white placeholder:text-slate-500
            transition-all duration-200
            focus:outline-none
            ${error 
              ? 'border-red-500 focus:border-red-400 focus:ring-4 focus:ring-red-500/20' 
              : isFocused
                ? 'border-indigo-500 focus:ring-4 focus:ring-indigo-500/20'
                : 'border-slate-700 hover:border-slate-600'
            }
          `}
          {...props}
        />
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};

export default Input;
export { Input };