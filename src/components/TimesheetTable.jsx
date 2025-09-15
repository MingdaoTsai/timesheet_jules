import React from 'react';

const sampleTasks = [
  {
    id: 1,
    project: 'NR2CTO專案 / EP202507.113 / Jacob Tsai',
    description: '晨間專案會議',
    category: 'Project or Taskforce',
    item: 'Team Meeting or Con-call, Skype',
    tags: 'Own,A組開發相關',
  },
  {
    id: 2,
    project: 'NR2CTO專案 / EP202507.113 / Jacob Tsai',
    description: '公版專案會議',
    category: 'Project or Taskforce',
    item: 'Document, Report',
    tags: '',
  },
  {
    id: 3,
    project: 'NR2CTO專案 / EP202507.113 / Jacob Tsai',
    description: '公版專案需求處理',
    category: 'Project or Taskforce',
    item: 'Action or Issue Tracking',
    tags: '',
  },
  {
    id: 4,
    project: 'NR2CTO專案 / EP202507.113 / Jacob Tsai',
    description: 'AI雲專案文件處理',
    category: 'Project or Taskforce',
    item: 'Document, Report',
    tags: 'Own,A組開發相關',
  },
  {
    id: 5,
    project: 'NR2CTO專案 / EP202507.113 / Jacob Tsai',
    description: '晨間專案文件處理',
    category: 'Project or Taskforce',
    item: 'Document, Report',
    tags: 'Own,A組開發相關',
  },
  {
    id: 6,
    project: 'NR2CTO專案 / EP202507.113 / Jacob Tsai',
    description: '公版專案專案文件',
    category: 'Project or Taskforce',
    item: 'Document, Report',
    tags: '',
  },
  {
    id: 7,
    project: 'Non-project',
    description: '休假',
    category: 'Holiday or Leave',
    item: 'Personal Leave',
    tags: '',
  },
  {
    id: 8,
    project: 'Non-project',
    description: '假日',
    category: 'Holiday or Leave',
    item: 'Holiday',
    tags: '',
  },
  {
    id: 9,
    project: 'Non-project',
    description: '新技術或專案研究',
    category: 'Department Activity',
    item: 'Research, Survey',
    tags: '',
  },
];

const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

function TimesheetTable() {
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
        {sampleTasks.map(task => (
          <tr key={task.id}>
            <td>
              <button>✏️</button>
              <button>❌</button>
            </td>
            <td>{task.project}</td>
            <td>{task.description}</td>
            <td>{task.category}</td>
            <td>{task.item}</td>
            <td>{task.tags}</td>
            {days.map(day => (
              <td key={day}>
                <input type="text" size="3" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="6">工作時數</td>
          {days.map(day => <td key={day}></td>)}
        </tr>
        <tr>
          <td colSpan="6">打卡時數</td>
          {days.map(day => <td key={day}></td>)}
        </tr>
      </tfoot>
    </table>
  );
}

export default TimesheetTable;
