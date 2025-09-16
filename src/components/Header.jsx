import React from 'react';

function Header({ onCopyLastWeek, onAddTask, isSubmitted }) {
  return (
    <header>
      <h1>我的工作日誌</h1>
      <nav>
        <button
          onClick={onAddTask}
          className="link-button"
          disabled={isSubmitted}
        >
          新增工作
        </button>
        <button
          onClick={onCopyLastWeek}
          className="link-button"
          disabled={isSubmitted}
        >
          複製上週工作
        </button>
        <a href="#">每週回報</a>
        <a href="#">TSS App v2.00</a>
        <a href="#">工時查詢與技巧</a>
      </nav>
    </header>
  );
}

export default Header;
