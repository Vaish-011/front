import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBell , FaCheck, FaTrash } from "react-icons/fa";
import './TodaysTasks.css';

function PendingTasks() {
  const [tasks, setTasks] = useState([]);

  // Fetch pending tasks on component mount
  useEffect(() => {
    axios.get("http://localhost:5000/api/tasks/task/pending")
      .then(response => setTasks(response.data))
      .catch(error => console.error("Error fetching pending tasks:", error));
  }, []);

  // Mark task as completed
  const markCompleted = (taskId) => {
    axios.put(`http://localhost:5000/api/tasks/task/complete/${taskId}`)
      .then(() => {
        // Refetch pending tasks after marking one as completed
        axios.get("http://localhost:5000/api/tasks/task/pending")
          .then(response => setTasks(response.data))
          .catch(error => console.error("Error fetching pending tasks:", error));
      })
      .catch(error => console.error("Error updating task:", error));
  };

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
      <h2>Pending Tasks</h2>
      <div  className='task-list'>
      {tasks.length > 0 ? (
        tasks.map(task => (
          <div key={task.task_id} className="today-task-item">
            <p><strong>{task.task_name}</strong></p>
            <p>{new Date(task.task_date).toLocaleDateString()} | {task.task_time}</p>
            {task.remainder && <p><FaBell /> Reminder Set</p>}
            <div className="task-actions">
              <button className='mark' onClick={() => markCompleted(task.task_id)}>
                <FaCheck /> Mark Completed
              </button>
              <button onClick={() => handleDelete(task.task_id)}>
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No pending tasks.</p>
      )}
    </div>
    </div>
  );
}

export default PendingTasks;
