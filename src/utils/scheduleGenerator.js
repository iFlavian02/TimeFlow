// Schedule Generation Algorithm
export const generateSchedule = async ({ classes, activities, studyPreferences, lifeEssentials }) => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const weekSchedule = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  };
  
  // Step 1: Add all university classes
  classes.forEach(classItem => {
    weekSchedule[classItem.day].push({
      type: 'class',
      subtype: classItem.type,
      startTime: classItem.startTime,
      endTime: classItem.endTime,
      title: classItem.subject,
      location: classItem.room,
      professor: classItem.professor,
      frequency: classItem.frequency,
      color: getClassColor(classItem.type)
    });
  });
  
  // Step 2: Add commute times before/after classes
  Object.keys(weekSchedule).forEach(day => {
    const dayClasses = weekSchedule[day].filter(item => item.type === 'class');
    
    if (dayClasses.length > 0 && lifeEssentials.commute > 0) {
      // Add commute before first class
      const firstClass = dayClasses[0];
      const commuteStart = subtractMinutes(firstClass.startTime, lifeEssentials.commute + 15);
      weekSchedule[day].push({
        type: 'commute',
        startTime: commuteStart,
        endTime: firstClass.startTime,
        title: 'Commute to University',
        color: '#EC4899'
      });
      
      // Add commute after last class
      const lastClass = dayClasses[dayClasses.length - 1];
      const commuteEnd = addMinutes(lastClass.endTime, lifeEssentials.commute);
      weekSchedule[day].push({
        type: 'commute',
        startTime: lastClass.endTime,
        endTime: commuteEnd,
        title: 'Commute from University',
        color: '#EC4899'
      });
    }
  });
  
  // Step 3: Add meals
  Object.keys(weekSchedule).forEach(day => {
    // Breakfast
    weekSchedule[day].push({
      type: 'meal',
      startTime: lifeEssentials.meals.breakfast.time,
      endTime: addMinutes(lifeEssentials.meals.breakfast.time, lifeEssentials.meals.breakfast.duration),
      title: 'Breakfast',
      color: '#FBBF24'
    });
    
    // Lunch
    weekSchedule[day].push({
      type: 'meal',
      startTime: lifeEssentials.meals.lunch.time,
      endTime: addMinutes(lifeEssentials.meals.lunch.time, lifeEssentials.meals.lunch.duration),
      title: 'Lunch',
      color: '#FBBF24'
    });
    
    // Dinner
    weekSchedule[day].push({
      type: 'meal',
      startTime: lifeEssentials.meals.dinner.time,
      endTime: addMinutes(lifeEssentials.meals.dinner.time, lifeEssentials.meals.dinner.duration),
      title: 'Dinner',
      color: '#FBBF24'
    });
  });
  
  // Step 4: Add sleep
  Object.keys(weekSchedule).forEach(day => {
    weekSchedule[day].push({
      type: 'sleep',
      startTime: lifeEssentials.sleep.bedtime,
      endTime: '23:59',
      title: 'Sleep',
      color: '#8B5CF6'
    });
    
    weekSchedule[day].push({
      type: 'sleep',
      startTime: '00:00',
      endTime: lifeEssentials.sleep.wakeTime,
      title: 'Sleep',
      color: '#8B5CF6'
    });
  });
  
  // Step 5: Schedule study sessions
  const studySessions = generateStudySessions(classes, studyPreferences, weekSchedule);
  studySessions.forEach(session => {
    weekSchedule[session.day].push(session);
  });
  
  // Step 6: Schedule activities
  const scheduledActivities = scheduleActivities(activities, weekSchedule);
  scheduledActivities.forEach(activity => {
    weekSchedule[activity.day].push(activity);
  });
  
  // Step 7: Sort each day by time
  Object.keys(weekSchedule).forEach(day => {
    weekSchedule[day].sort((a, b) => {
      return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
    });
  });
  
  // Calculate statistics
  const stats = calculateStats(weekSchedule);
  
  return {
    schedule: weekSchedule,
    stats
  };
};

// Helper: Get color for class type
const getClassColor = (type) => {
  const colors = {
    'Curs': '#667EEA',
    'Seminar': '#10B981',
    'Laborator': '#F59E0B',
    'Seminar Facultativ': '#6B7280'
  };
  return colors[type] || '#6B7280';
};

// Helper: Generate study sessions
const generateStudySessions = (classes, studyPreferences, weekSchedule) => {
  const sessions = [];
  const uniqueCourses = [...new Set(classes.map(c => c.subject))];
  
  uniqueCourses.forEach(course => {
    const hoursNeeded = studyPreferences.hoursPerCoursePerWeek || 5;
    const sessionDuration = studyPreferences.sessionDuration || 90;
    const sessionsNeeded = Math.ceil((hoursNeeded * 60) / sessionDuration);
    
    // Find best times to study this course
    const courseClasses = classes.filter(c => c.subject === course);
    
    for (let i = 0; i < sessionsNeeded; i++) {
      // Try to schedule after class or on preferred days
      const session = findBestStudySlot(course, sessionDuration, weekSchedule, studyPreferences);
      if (session) {
        sessions.push(session);
      }
    }
  });
  
  return sessions;
};

// Helper: Find best study slot
const findBestStudySlot = (course, duration, weekSchedule, studyPreferences) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const preferredHours = getPreferredHours(studyPreferences.preferredTimes || []);
  
  for (const day of days) {
    for (const hour of preferredHours) {
      const startTime = `${hour.toString().padStart(2, '0')}:00`;
      const endTime = addMinutes(startTime, duration);
      
      if (isSlotAvailable(day, startTime, endTime, weekSchedule)) {
        return {
          type: 'study',
          day,
          startTime,
          endTime,
          title: `Study: ${course.substring(0, 30)}...`,
          color: '#10B981'
        };
      }
    }
  }
  
  return null;
};

// Helper: Schedule activities
const scheduleActivities = (activities, weekSchedule) => {
  const scheduled = [];
  
  activities.forEach(activity => {
    const frequency = getActivityFrequency(activity.frequency);
    const days = selectDaysForActivity(activity, frequency, weekSchedule);
    
    days.forEach(day => {
      const slot = findBestActivitySlot(activity, day, weekSchedule);
      if (slot) {
        scheduled.push({
          type: 'activity',
          day,
          startTime: slot.startTime,
          endTime: slot.endTime,
          title: `${activity.icon} ${activity.name}`,
          color: '#F59E0B',
          priority: activity.priority
        });
      }
    });
  });
  
  return scheduled;
};

// Helper: Get activity frequency
const getActivityFrequency = (freq) => {
  const map = {
    'Daily': 7,
    '5-6x/week': 5,
    '3-5x/week': 4,
    '1-2x/week': 2,
    'Weekends': 2
  };
  return map[freq] || 3;
};

// Helper: Select days for activity
const selectDaysForActivity = (activity, frequency, weekSchedule) => {
  const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const weekdays = allDays.slice(0, 5);
  const weekends = allDays.slice(5);
  
  if (activity.frequency === 'Weekends') {
    return weekends;
  }
  
  // Distribute evenly across the week
  const days = [];
  const step = Math.floor(7 / frequency);
  
  for (let i = 0; i < frequency && i * step < allDays.length; i++) {
    days.push(allDays[i * step]);
  }
  
  return days;
};

// Helper: Find best slot for activity
const findBestActivitySlot = (activity, day, weekSchedule) => {
  const preferredHours = getPreferredHoursFromTimeSlots(activity.preferredTimes || []);
  
  for (const hour of preferredHours) {
    const startTime = `${hour.toString().padStart(2, '0')}:00`;
    const endTime = addMinutes(startTime, activity.duration);
    
    if (isSlotAvailable(day, startTime, endTime, weekSchedule)) {
      return { startTime, endTime };
    }
  }
  
  // If no preferred time available, try any time
  if (activity.flexible) {
    for (let hour = 8; hour < 22; hour++) {
      const startTime = `${hour.toString().padStart(2, '0')}:00`;
      const endTime = addMinutes(startTime, activity.duration);
      
      if (isSlotAvailable(day, startTime, endTime, weekSchedule)) {
        return { startTime, endTime };
      }
    }
  }
  
  return null;
};

// Helper: Check if slot is available
const isSlotAvailable = (day, startTime, endTime, weekSchedule) => {
  const start = timeToMinutes(startTime);
  const end = timeToMinutes(endTime);
  
  return !weekSchedule[day].some(item => {
    const itemStart = timeToMinutes(item.startTime);
    const itemEnd = timeToMinutes(item.endTime);
    
    // Check for overlap
    return (start < itemEnd && end > itemStart);
  });
};

// Helper: Convert time to minutes
const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

// Helper: Add minutes to time
const addMinutes = (time, minutesToAdd) => {
  const totalMinutes = timeToMinutes(time) + minutesToAdd;
  const hours = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

// Helper: Subtract minutes from time
const subtractMinutes = (time, minutesToSubtract) => {
  let totalMinutes = timeToMinutes(time) - minutesToSubtract;
  if (totalMinutes < 0) totalMinutes += 24 * 60;
  const hours = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

// Helper: Get preferred hours from time slots
const getPreferredHours = (preferredTimes) => {
  const hours = [];
  
  preferredTimes.forEach(slot => {
    if (slot.includes('Morning (6-9)')) hours.push(6, 7, 8);
    if (slot.includes('Late Morning (9-12)')) hours.push(9, 10, 11);
    if (slot.includes('Afternoon (12-17)')) hours.push(12, 13, 14, 15, 16);
    if (slot.includes('Evening (17-20)')) hours.push(17, 18, 19);
    if (slot.includes('Night (20-23)')) hours.push(20, 21, 22);
  });
  
  return [...new Set(hours)].sort((a, b) => a - b);
};

// Helper: Get preferred hours from activity time slots
const getPreferredHoursFromTimeSlots = (timeSlots) => {
  return getPreferredHours(timeSlots);
};

// Helper: Calculate statistics
const calculateStats = (weekSchedule) => {
  let totalClasses = 0;
  let totalStudySessions = 0;
  let totalActivities = 0;
  let totalFreeTimeMinutes = 0;
  
  Object.values(weekSchedule).forEach(day => {
    totalClasses += day.filter(item => item.type === 'class').length;
    totalStudySessions += day.filter(item => item.type === 'study').length;
    totalActivities += day.filter(item => item.type === 'activity').length;
    
    // Calculate free time (gaps between activities)
    const sortedItems = day.filter(item => 
      item.type !== 'sleep' && timeToMinutes(item.startTime) >= 6 * 60
    ).sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
    
    for (let i = 0; i < sortedItems.length - 1; i++) {
      const gap = timeToMinutes(sortedItems[i + 1].startTime) - timeToMinutes(sortedItems[i].endTime);
      if (gap > 30) { // Count gaps longer than 30 minutes as free time
        totalFreeTimeMinutes += gap;
      }
    }
  });
  
  return {
    totalClasses,
    totalStudySessions,
    totalActivities,
    totalFreeTime: Math.round(totalFreeTimeMinutes / 60)
  };
};