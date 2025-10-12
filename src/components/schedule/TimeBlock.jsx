import React from 'react';

const TimeBlock = ({ classData, onClick }) => {
  const typeColors = {
    'Curs': 'from-purple-500 to-blue-600',
    'Seminar': 'from-green-500 to-emerald-600',
    'Laborator': 'from-orange-500 to-red-600',
    'Seminar Facultativ': 'from-gray-500 to-gray-600',
  };
  
  const gradient = typeColors[classData.type] || 'from-slate-600 to-slate-700';
  
  return (
    <div
      onClick={onClick}
      className={`
        bg-gradient-to-br ${gradient}
        rounded-lg p-3 cursor-pointer
        border-l-4 border-white/30
        hover:-translate-y-1 hover:shadow-lg
        transition-all duration-200
        group
      `}
    >
      <div className="text-white">
        <div className="text-xs font-semibold mb-1 opacity-90">
          {classData.startTime} - {classData.endTime}
        </div>
        <div className="font-bold text-sm mb-1 line-clamp-2">
          {classData.subject}
        </div>
        <div className="text-xs opacity-90">
          {classData.type} · {classData.room}
        </div>
        {classData.professor && (
          <div className="text-xs opacity-75 mt-1 truncate">
            {classData.professor}
          </div>
        )}
        {classData.frequency && (
          <div className="text-xs opacity-75 mt-1">
            📅 {classData.frequency}
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeBlock;
export { TimeBlock };