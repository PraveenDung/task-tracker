import React, { useEffect, useState } from 'react';
import API from './api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const fetchTasks = async () => {
    const res = await API.get('/');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSaveTask = async (task) => {
    if (task._id) {
      await API.put(`/${task._id}`, task);
    } else {
      await API.post('/', task);
    }
    fetchTasks();
    setTaskToEdit(null);
  };

  const handleDelete = async (id) => {
    await API.delete(`/${id}`);
    fetchTasks();
  };

  const handleToggleComplete = async (id, completed) => {
    await API.put(`/${id}`, { completed });
    fetchTasks();
  };

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <TaskForm onSave={handleSaveTask} taskToEdit={taskToEdit} />
      <TaskList
        tasks={tasks}
        onEdit={setTaskToEdit}
        onDelete={handleDelete}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
};

export default App;
