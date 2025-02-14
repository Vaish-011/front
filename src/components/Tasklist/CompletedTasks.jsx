import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from "react-icons/fa";
import './TodaysTasks.css';

function CompletedTasks() {
  const [tasks, setTasks] = useState([]);

  // Fetch completed tasks on component mount
  useEffect(() => {
    axios.get("http://localhost:5000/api/tasks/task/completed")
      .then(response => setTasks(response.data))
      .catch(error => console.error("Error fetching completed tasks:", error));
  }, []);

  // Handle task deletion
  const handleDelete = (taskId) => {
    axios.delete(`http://localhost:5000/api/tasks/task/${taskId}`)
      .then(() => {
        setTasks(tasks.filter(task => task.task_id !== taskId));
      })
      .catch(err => console.error("Error deleting task:", err));
  };

  return (
    <div className='today-tasks-container'>
      <h2>Completed Tasks</h2>
      <div className='task-list'>
      {tasks.length > 0 ? (
        tasks.map(task => (
          <div key={task.task_id} className="today-task-item">
            <p><strong>{task.task_name}</strong></p>
            <p>{new Date(task.task_date).toLocaleDateString()} | {task.task_time}</p>
            {task.remainder && <p>Reminder Set</p>}
            <div className="task-actions">
              <button onClick={() => handleDelete(task.task_id)}>
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No completed tasks.</p>
      )}
    </div>
    </div>
  );
}

export default CompletedTasks;
