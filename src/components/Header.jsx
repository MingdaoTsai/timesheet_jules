import React from 'react';

function Header({ onCopyLastWeek, isSubmitted }) {
  return (
    <header>
      <h1>我的工作日誌</h1>
      <nav>
        <a href="#">新增工作</a>
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
