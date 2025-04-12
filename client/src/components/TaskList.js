import React from 'react';

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete }) => {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task._id} className={task.completed ? 'completed' : ''}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <div>
            <button onClick={() => onToggleComplete(task._id, !task.completed)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => onEdit(task)}>Edit</button>
            <button onClick={() => onDelete(task._id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
