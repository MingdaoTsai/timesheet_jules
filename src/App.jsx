import React, { useState } from 'react';
import Header from './components/Header';
import TimesheetTable from './components/TimesheetTable';
import Footer from './components/Footer';
import './App.css';

// Helper function to format date as YYYY-MM-DD
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Helper function to get the week range string
const getWeekRange = (date) => {
  const currentDay = date.getDay(); // Sunday = 0, Monday = 1, etc.
  const dayOffset = currentDay === 0 ? 6 : currentDay - 1; // Adjust for Sunday

  const monday = new Date(date);
  monday.setDate(date.getDate() - dayOffset);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return `${formatDate(monday)} ~ ${formatDate(sunday)}`;
};


function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

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

  const dateRange = getWeekRange(currentDate);

  return (
    <div className="App">
      <Header />
      <main>
        <TimesheetTable />
      </main>
      <Footer
        dateRange={dateRange}
        onPrevWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
      />
    </div>
  );
}

export default App;
