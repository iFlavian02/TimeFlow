import React from 'react';
import { TimeBlock } from './TimeBlock';

const Calendar = ({ schedule, onClassClick }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const hours = Array.from({ length: 13 }, (_, i) => i + 8); // 8:00 to 20:00
  
  const getClassesForDayAndHour = (day, hour) => {
    return schedule.filter(cls => {
      const startHour = parseInt(cls.startTime.split(':')[0]);
      const endHour = parseInt(cls.endTime.split(':')[0]);
      return cls.day === day && startHour === hour;
    });
  };
  
  const calculateRowSpan = (startTime, endTime) => {
    const start = parseInt(startTime.split(':')[0]);
    const end = parseInt(endTime.split(':')[0]);
    return end - start;
  };
  
  return (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-4 overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Header */}
        <div className="grid grid-cols-6 gap-2 mb-2">
          <div className="text-center font-semibold text-slate-400 text-sm py-3">
            Time
          </div>
          {days.map(day => (
            <div key={day} className="text-center bg-slate-700/50 rounded-lg py-3">
              <div className="font-bold text-white">{day}</div>
              <div className="text-xs text-slate-400">
                {schedule.filter(cls => cls.day === day).length} classes
              </div>
            </div>
          ))}
        </div>
        
        {/* Calendar Grid */}
        <div className="space-y-1">
          {hours.map(hour => (
            <div key={hour} className="grid grid-cols-6 gap-2">
              {/* Time column */}
              <div className="text-center text-sm text-slate-400 py-2 font-mono">
                {hour.toString().padStart(2, '0')}:00
              </div>
              
              {/* Day columns */}
              {days.map(day => {
                const classes = getClassesForDayAndHour(day, hour);
                
                if (classes.length === 0) {
                  return (
                    <div 
                      key={`${day}-${hour}`} 
                      className="bg-slate-900/30 rounded-lg min-h-[60px] border border-slate-800/50"
                    />
                  );
                }
                
                return (
                  <div key={`${day}-${hour}`} className="relative">
                    {classes.map((cls, idx) => (
                      <div
                        key={idx}
                        style={{
                          gridRow: `span ${calculateRowSpan(cls.startTime, cls.endTime)}`
                        }}
                      >
                        <TimeBlock 
                          classData={cls} 
                          onClick={() => onClassClick(cls)}
                        />
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
export { Calendar };