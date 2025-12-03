import React, { createContext, useState, useMemo } from 'react';

const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) => {
  const [parsedSchedule, setParsedSchedule] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const value = useMemo(() => ({
    parsedSchedule,
    setParsedSchedule,
    isLoading,
    setIsLoading,
    error,
    setError,
  }), [parsedSchedule, isLoading, error]);

  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  );
};

export default ScheduleContext;
