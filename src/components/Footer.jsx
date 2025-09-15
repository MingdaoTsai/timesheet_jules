import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="date-navigation">
        <button>&lt;&lt;</button>
        <span>2025-09-15 ~ 2025-09-21</span>
        <a href="#">(This Week)</a>
        <button>&gt;&gt;</button>
      </div>
      <div className="submit-section">
        <button>Submit to Boss</button>
      </div>
    </footer>
  );
}

export default Footer;
