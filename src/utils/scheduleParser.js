// Function to validate parsed schedule
export const validateSchedule = (schedule) => {
  if (!schedule || !schedule.classes || schedule.classes.length === 0) {
    return { valid: false, error: 'No classes found in schedule' };
  }

  // Check for required fields
  for (const cls of schedule.classes) {
    if (!cls.day || !cls.startTime || !cls.endTime || !cls.subject) {
      return { valid: false, error: 'Missing required fields in some classes' };
    }
  }

  return { valid: true };
};

// Function to format time
export const formatTime = (time) => {
  if (!time) return '';
  const [hours, minutes] = time.split(':');
  return `${hours.padStart(2, '0')}:${minutes || '00'}`;
};

// Function to calculate total hours per day
export const calculateDayHours = (classes, day) => {
  const dayClasses = classes.filter(c => c.day === day);
  let totalHours = 0;

  dayClasses.forEach(cls => {
    const start = parseInt(cls.startTime.split(':')[0]);
    const end = parseInt(cls.endTime.split(':')[0]);
    totalHours += (end - start);
  });

  return totalHours;
};

// Function to get unique days from schedule
export const getScheduleDays = (classes) => {
  const days = [...new Set(classes.map(c => c.day))];
  const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  return days.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
};

// Function to group classes by type
export const groupByType = (classes) => {
  return classes.reduce((acc, cls) => {
    const type = cls.type || 'Other';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(cls);
    return acc;
  }, {});
};