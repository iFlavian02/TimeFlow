import React from 'react';

const Slider = ({ 
  label, 
  value, 
  onChange, 
  min = 0, 
  max = 100, 
  step = 1,
  showValue = true,
  unit = '',
  marks = [],
  className = ''
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-slate-300">
            {label}
          </label>
          {showValue && (
            <span className="text-sm font-bold text-indigo-400">
              {value} {unit}
            </span>
          )}
        </div>
      )}
      
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="slider-input w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, rgb(99, 102, 241) 0%, rgb(139, 92, 246) ${((value - min) / (max - min)) * 100}%, rgb(51, 65, 85) ${((value - min) / (max - min)) * 100}%, rgb(51, 65, 85) 100%)`
          }}
        />
        
        {marks.length > 0 && (
          <div className="flex justify-between mt-2 px-1">
            {marks.map((mark, idx) => (
              <span key={idx} className="text-xs text-slate-500">
                {mark}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Slider;
export { Slider };