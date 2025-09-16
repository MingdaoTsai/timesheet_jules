import React from 'react';

function Footer({ dateRange, onPrevWeek, onNextWeek, onSubmit, isSubmitted }) {
  return (
    <footer>
      <div className="date-navigation">
        <button onClick={onPrevWeek}>&lt;&lt;</button>
        <span>{dateRange}</span>
        <a href="#">(This Week)</a>
        <button onClick={onNextWeek}>&gt;&gt;</button>
      </div>
      <div className="submit-section">
        <button onClick={onSubmit} disabled={isSubmitted}>Submit to Boss</button>
      </div>
    </footer>
  );
}

export default Footer;
