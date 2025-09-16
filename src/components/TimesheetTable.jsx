import React from 'react';

const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

function TimesheetTable({ tasks, isSubmitted, onTaskChange, onHoursChange }) {

  const dailyTotals = days.map((_, dayIndex) =>
    tasks.reduce((total, task) => total + (task.hours[dayIndex] || 0), 0)
  );

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>計畫/專案</th>
          <th>工作描述</th>
          <th>工作分類</th>
          <th>工作項目</th>
          <th>標籤</th>
          {days.map(day => <th key={day}>{day}</th>)}
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <tr key={task.id}>
            <td>
              <button
                onClick={() => onTaskChange(task.id, 'isEditing', !task.isEditing)}
                disabled={isSubmitted}
              >
                ✏️
              </button>
              <button disabled={isSubmitted}>❌</button>
            </td>
            <td>
              {task.isEditing ? (
                <input
                  type="text"
                  value={task.project}
                  onChange={(e) => onTaskChange(task.id, 'project', e.target.value)}
                  disabled={isSubmitted}
                  style={{ width: '100%' }}
                />
              ) : (
                task.project
              )}
            </td>
            <td>{task.description}</td>
            <td>{task.category}</td>
            <td>{task.item}</td>
            <td>{task.tags}</td>
            {days.map((day, dayIndex) => (
              <td key={day}>
                <input
                  type="text"
                  size="3"
                  value={task.hours[dayIndex]}
                  onChange={(e) => onHoursChange(task.id, dayIndex, e.target.value)}
                  disabled={isSubmitted}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="6">工作時數</td>
          {dailyTotals.map((total, index) => <td key={index}>{total}</td>)}
        </tr>
        <tr>
          <td colSpan="6">打卡時數</td>
          {days.map((day, index) => <td key={index}></td>)}
        </tr>
      </tfoot>
    </table>
  );
}

export default TimesheetTable;
