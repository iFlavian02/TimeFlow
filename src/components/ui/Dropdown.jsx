import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const Dropdown = ({ 
  label, 
  value, 
  onChange, 
  options = [], 
  placeholder = 'Select...',
  error,
  required = false,
  className = '',
  forceUpward = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const selectedOption = options.find(opt => opt.value === value);
  
  console.log('Dropdown forceUpward:', forceUpward, 'isOpen:', isOpen); // DEBUG
  
  return (
    <div className={`w-full ${className}`} ref={dropdownRef} style={{ position: 'relative', zIndex: isOpen ? 10000 : 'auto' }}>
      {label && (
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full h-12 px-4 pr-10
            bg-slate-800 border-2 rounded-lg
            text-left text-white
            transition-all duration-200
            focus:outline-none
            ${error 
              ? 'border-red-500 focus:border-red-400 focus:ring-4 focus:ring-red-500/20' 
              : isOpen
                ? 'border-indigo-500 ring-4 ring-indigo-500/20'
                : 'border-slate-700 hover:border-slate-600'
            }
          `}
        >
          <span className={selectedOption ? 'text-white' : 'text-slate-500'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </button>
        
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
        
        {isOpen && (
          <div 
            className={`
              absolute w-full bg-slate-800 border-2 border-indigo-500 rounded-lg shadow-2xl 
              max-h-60 overflow-y-auto
              ${forceUpward ? 'bottom-full mb-2' : 'top-full mt-2'}
            `}
            style={{ zIndex: 10001 }}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`
                  w-full px-4 py-3 text-left transition-colors
                  ${value === option.value 
                    ? 'bg-indigo-500/20 text-indigo-400 font-semibold' 
                    : 'text-white hover:bg-slate-700'
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};

export default Dropdown;
export { Dropdown };