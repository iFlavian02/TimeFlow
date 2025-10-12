import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

const Toast = ({ type = 'info', message, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);
  
  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
    warning: AlertTriangle
  };
  
  const colors = {
    success: 'border-green-500 bg-green-500/10',
    error: 'border-red-500 bg-red-500/10',
    info: 'border-blue-500 bg-blue-500/10',
    warning: 'border-amber-500 bg-amber-500/10'
  };
  
  const Icon = icons[type];
  
  return (
    <div className={`
      flex items-center gap-3 min-w-[300px] p-4 rounded-lg
      border-l-4 ${colors[type]}
      bg-slate-800/95 backdrop-blur-sm
      shadow-lg animate-slideInRight
    `}>
      <Icon className={`w-5 h-5 flex-shrink-0 ${
        type === 'success' ? 'text-green-400' :
        type === 'error' ? 'text-red-400' :
        type === 'warning' ? 'text-amber-400' :
        'text-blue-400'
      }`} />
      
      <p className="text-sm text-white flex-1">{message}</p>
      
      <button 
        onClick={onClose}
        className="text-slate-400 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Toast Container Component
const ToastContainer = ({ toasts, removeToast }) => {
  if (!toasts || toasts.length === 0) return null;
  
  return (
    <div className="fixed top-20 right-6 z-[100] flex flex-col gap-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => removeToast(toast.id)}
          duration={toast.duration}
        />
      ))}
    </div>
  );
};

export default Toast;
export { Toast, ToastContainer };