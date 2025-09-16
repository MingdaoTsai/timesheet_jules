import React, { useState } from 'react';
import Header from './components/Header';
import TimesheetTable from './components/TimesheetTable';
import Footer from './components/Footer';
import './App.css';

// --- Sample Data (for initial state) ---
const initialTasks = [
  { id: 1, project: 'NR2CTO專案 / EP202507.113 / Jacob Tsai', description: '晨間專案會議', category: 'Project or Taskforce', item: 'Team Meeting or Con-call, Skype', tags: 'Own,A組開發相關' },
  { id: 2, project: 'NR2CTO專案 / EP202507.113 / Jacob Tsai', description: '公版專案會議', category: 'Project or Taskforce', item: 'Document, Report', tags: '' },
  { id: 3, project: 'Non-project', description: '休假', category: 'Holiday or Leave', item: 'Personal Leave', tags: '' },
].map(task => ({
  ...task,
  hours: [0, 0, 0, 0, 0, 0, 0], // Mon-Sun
  isEditing: false,
}));

// --- Date Helper Functions ---
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getWeekInfo = (date) => {
  const currentDay = date.getDay();
  const dayOffset = currentDay === 0 ? 6 : currentDay - 1;

  const monday = new Date(date);
  monday.setDate(date.getDate() - dayOffset);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return {
    key: formatDate(monday), // Unique key for the week
    range: `${formatDate(monday)} ~ ${formatDate(sunday)}`, // Display string
  };
};

// --- Main App Component ---
function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [timesheets, setTimesheets] = useState(() => {
    // Initialize with the current week's data
    const initialWeekKey = getWeekInfo(new Date()).key;
    return {
      [initialWeekKey]: {
        tasks: initialTasks,
        isSubmitted: false,
      },
    };
  });

  const currentWeekInfo = getWeekInfo(currentDate);
  const currentTimesheet = timesheets[currentWeekInfo.key] || { tasks: [], isSubmitted: false };

  // --- Handlers ---
  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handleCopyLastWeek = () => {
    const prevWeekDate = new Date(currentDate);
    prevWeekDate.setDate(currentDate.getDate() - 7);
    const prevWeekKey = getWeekInfo(prevWeekDate).key;

    const lastWeekTasks = timesheets[prevWeekKey]?.tasks;

    if (lastWeekTasks) {
      const newTasks = lastWeekTasks.map(task => ({
        ...task,
        hours: [0, 0, 0, 0, 0, 0, 0],
        isEditing: false,
      }));
      setTimesheets(prev => ({
        ...prev,
        [currentWeekInfo.key]: {
          ...prev[currentWeekInfo.key],
          tasks: newTasks,
        },
      }));
    } else {
      alert("No tasks from last week to copy.");
    }
  };

  const handleTaskChange = (taskId, field, value) => {
    setTimesheets(prev => {
      const newTasks = prev[currentWeekInfo.key].tasks.map(task =>
        task.id === taskId ? { ...task, [field]: value } : task
      );
      return {
        ...prev,
        [currentWeekInfo.key]: { ...prev[currentWeekInfo.key], tasks: newTasks },
      };
    });
  };

  const handleHoursChange = (taskId, dayIndex, value) => {
    const hours = parseInt(value, 10) || 0; // Ensure value is a number
    setTimesheets(prev => {
      const newTasks = prev[currentWeekInfo.key].tasks.map(task => {
        if (task.id === taskId) {
          const newHours = [...task.hours];
          newHours[dayIndex] = hours;
          return { ...task, hours: newHours };
        }
        return task;
      });
      return {
        ...prev,
        [currentWeekInfo.key]: { ...prev[currentWeekInfo.key], tasks: newTasks },
      };
    });
  };

  const handleSubmit = () => {
    const tasks = currentTimesheet.tasks;
    const dailyTotals = Array(5).fill(0); // Monday to Friday

    tasks.forEach(task => {
      for (let i = 0; i < 5; i++) { // Only check Mon-Fri
        dailyTotals[i] += task.hours[i] || 0;
      }
    });

    const invalidDays = dailyTotals.map((total, i) => total !== 8 ? i + 1 : -1).filter(day => day !== -1);

    if (invalidDays.length > 0) {
      alert(`Validation failed! Total hours for Monday-Friday must be 8. Please check day(s): ${invalidDays.join(', ')}.`);
      return;
    }

    setTimesheets(prev => ({
      ...prev,
      [currentWeekInfo.key]: {
        ...prev[currentWeekInfo.key],
        isSubmitted: true,
      },
    }));

    alert('Timesheet submitted successfully!');
  };

  return (
    <div className="App">
      <Header
        onCopyLastWeek={handleCopyLastWeek}
        isSubmitted={currentTimesheet.isSubmitted}
      />
      <main>
        <TimesheetTable
          tasks={currentTimesheet.tasks}
          isSubmitted={currentTimesheet.isSubmitted}
          onTaskChange={handleTaskChange}
          onHoursChange={handleHoursChange}
        />
      </main>
      <Footer
        dateRange={currentWeekInfo.range}
        onPrevWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
        onSubmit={handleSubmit}
        isSubmitted={currentTimesheet.isSubmitted}
      />
    </div>
  );
}

export default App;
