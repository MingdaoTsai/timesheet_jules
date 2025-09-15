import React from 'react';
import Header from './components/Header';
import TimesheetTable from './components/TimesheetTable';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <TimesheetTable />
      </main>
      <Footer />
    </div>
  );
}

export default App;
