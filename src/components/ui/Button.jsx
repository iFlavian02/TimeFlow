import React from 'react';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  className = '', 
  icon: Icon,
  disabled = false,
  type = 'button'
}) => {
  const baseStyles = 'font-semibold transition-all duration-300 rounded-full inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50',
    secondary: 'bg-transparent border-2 border-slate-600 text-slate-200 hover:border-indigo-500 hover:bg-indigo-500/10',
    ghost: 'bg-transparent hover:bg-slate-800 text-slate-300',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:scale-105 hover:shadow-lg hover:shadow-red-500/50'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      {Icon && <Icon className="w-5 h-5" />}
    </button>
  );
};