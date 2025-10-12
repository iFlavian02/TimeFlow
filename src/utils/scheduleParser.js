// This simulates AI parsing of UAIC schedule
// In production, this would call OpenAI/Claude API

export const parseScheduleImage = async (imageFile) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock comprehensive schedule data based on your UAIC format
  // This simulates what the AI would extract
  const mockScheduleData = {
    title: "Orar INFO Anul 1, INFO1 Grupa 3",
    validFrom: "29.09.2025",
    validTo: "15.02.2026",
    classes: [
      // MONDAY (Luni)
      {
        day: 'Monday',
        startTime: '08:00',
        endTime: '10:00',
        subject: 'Matematică - Calcul Diferențial și Integral',
        type: 'Curs',
        professor: 'Conf. dr. Arusoaie Andreea, Conf. dr. Zălinescu Adrian',
        room: 'C2',
        frequency: ''
      },
      {
        day: 'Monday',
        startTime: '10:00',
        endTime: '12:00',
        subject: 'Structuri de Date',
        type: 'Curs',
        professor: 'Conf. dr. Gațu Cristian, Conf. dr. Răschip Mădălina',
        room: 'C2',
        frequency: ''
      },
      {
        day: 'Monday',
        startTime: '12:00',
        endTime: '14:00',
        subject: 'Etică și Integritate Academică',
        type: 'Curs',
        professor: 'Colab. dr. Olariu-Ghizdovăț Cristina',
        room: 'C2',
        frequency: ''
      },
      {
        day: 'Monday',
        startTime: '12:00',
        endTime: '14:00',
        subject: 'Psihologia educației',
        type: 'Seminar Facultativ',
        professor: 'Colab. Panainte Marian',
        room: 'C901',
        frequency: ''
      },
      {
        day: 'Monday',
        startTime: '18:00',
        endTime: '20:00',
        subject: 'Structuri de Date',
        type: 'Seminar',
        professor: 'Colab. Rusu Daniel',
        room: 'C901',
        frequency: ''
      },
      
      // TUESDAY (Marți)
      {
        day: 'Tuesday',
        startTime: '08:00',
        endTime: '10:00',
        subject: 'Logică pentru Informatică',
        type: 'Curs',
        professor: 'Conf. dr. Arusoaie Andrei, Conf. dr. Ciobâcă Ștefan',
        room: 'C2',
        frequency: ''
      },
      {
        day: 'Tuesday',
        startTime: '10:00',
        endTime: '12:00',
        subject: 'Logică pentru Informatică',
        type: 'Seminar',
        professor: 'Lect. dr. Gratie Diana Elena',
        room: 'C909',
        frequency: ''
      },
      {
        day: 'Tuesday',
        startTime: '14:00',
        endTime: '16:00',
        subject: 'Introducere în Programare',
        type: 'Curs',
        professor: 'Lect. dr. Pătruț Bogdan',
        room: 'C2',
        frequency: ''
      },
      {
        day: 'Tuesday',
        startTime: '17:00',
        endTime: '18:00',
        subject: 'Educație Fizică',
        type: 'Seminar',
        professor: 'Colab. Bogdan Mihaela',
        room: 'Teren Sport',
        frequency: ''
      },
      {
        day: 'Tuesday',
        startTime: '18:00',
        endTime: '20:00',
        subject: 'Matematică - Calcul Diferențial și Integral',
        type: 'Seminar',
        professor: 'Conf. dr. Arusoaie Andreea',
        room: 'C903',
        frequency: ''
      },
      {
        day: 'Tuesday',
        startTime: '18:00',
        endTime: '20:00',
        subject: 'Strategii Eficiente de Învățare',
        type: 'Seminar Facultativ',
        professor: 'Lect. dr. Gratie Diana Elena',
        room: 'C308',
        frequency: ''
      },
      
      // WEDNESDAY (Miercuri)
      {
        day: 'Wednesday',
        startTime: '08:00',
        endTime: '10:00',
        subject: 'Introducere în Programare',
        type: 'Laborator',
        professor: 'Lect. dr. Pătruț Bogdan',
        room: 'C401',
        frequency: ''
      },
      {
        day: 'Wednesday',
        startTime: '16:00',
        endTime: '18:00',
        subject: 'Strategii Eficiente de Învățare',
        type: 'Curs Facultativ',
        professor: 'Lect. dr. Gratie Diana Elena',
        room: 'C309',
        frequency: 'Pare'
      },
      {
        day: 'Wednesday',
        startTime: '18:00',
        endTime: '20:00',
        subject: 'Arhitectura Calculatoarelor și Sistemelor de Operare',
        type: 'Seminar',
        professor: 'Asist. drd. Bălan Gheorghe',
        room: 'C409',
        frequency: ''
      },
      
      // THURSDAY (Joi)
      {
        day: 'Thursday',
        startTime: '08:00',
        endTime: '10:00',
        subject: 'Strategii Eficiente de Învățare',
        type: 'Seminar Facultativ',
        professor: 'Lect. dr. Gratie Diana Elena',
        room: 'C901',
        frequency: ''
      },
      {
        day: 'Thursday',
        startTime: '16:00',
        endTime: '18:00',
        subject: 'Programare competitivă',
        type: 'Seminar Facultativ',
        professor: 'Asist. drd. Ioniță Alexandru',
        room: 'C210',
        frequency: ''
      },
      {
        day: 'Thursday',
        startTime: '18:00',
        endTime: '20:00',
        subject: 'Programare competitivă',
        type: 'Seminar Facultativ',
        professor: 'Asist. drd. Ioniță Alexandru',
        room: 'C210',
        frequency: ''
      },
      
      // FRIDAY (Vineri)
      {
        day: 'Friday',
        startTime: '08:00',
        endTime: '10:00',
        subject: 'Arhitectura Calculatoarelor și Sistemelor de Operare',
        type: 'Curs',
        professor: 'Lect. dr. Rădulescu Vlad',
        room: 'C112',
        frequency: ''
      },
      {
        day: 'Friday',
        startTime: '12:00',
        endTime: '14:00',
        subject: 'Psihologia educației',
        type: 'Curs Facultativ',
        professor: 'Prof. dr. Curelaru Versavia',
        room: 'C112',
        frequency: ''
      },
      {
        day: 'Friday',
        startTime: '14:00',
        endTime: '16:00',
        subject: 'Limba Engleză I',
        type: 'Seminar',
        professor: 'Lect. dr. Onofrei Paula-Andreea',
        room: 'C909',
        frequency: ''
      }
    ]
  };
  
  return mockScheduleData;
};

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