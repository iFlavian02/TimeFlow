import React from 'react';

export const Card = ({ children, className = '', hover = false, onClick }) => {
  const hoverStyles = hover ? 'hover:-translate-y-2 hover:shadow-2xl cursor-pointer' : '';
  
  return (
    <div 
      className={`bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 transition-all duration-300 ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};