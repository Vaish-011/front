import React, { useState, useEffect } from 'react';
import { FaBell, FaEdit, FaTrash } from "react-icons/fa";
import axios from 'axios';
// import './TodaysTasks.css'
// import './UpcomingTasks.css';

function UpcomingTasks() {
    const [tasks, setTasks] = useState([]);
    const [taskList, setTaskList] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const fetchUpcomingTasks = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/tasks/task/upcoming');
                const data = await response.json();
                console.log('Fetched Upcoming Tasks:', data);

                if (Array.isArray(data)) {
                    setTasks(data);
                    setTaskList(data);
                } else {
                    setTasks([]);
                    setTaskList([]);
                }
            } catch (error) {
                console.error("Error fetching upcoming tasks:", error);
            }
        };
        
        fetchUpcomingTasks();
    }, []);

    const handleEdit = (index) => {
        const taskToEdit = tasks[index];
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const taskId = tasks[index].task_id;
        axios.delete(`http://localhost:5000/api/tasks/task/${taskId}`)
            .then(() => {
                const filteredTasks = taskList.filter((_, i) => i !== index);
                setTasks(filteredTasks);
                setTaskList(filteredTasks);
            })
            .catch(err => console.error("Error deleting the task:", err));
    };

    return (
        <div className='today-tasks-container'>
            <h2>Upcoming Tasks</h2>
            <div className='task-list'>
            {Array.isArray(tasks) && tasks.length > 0 ? (
                tasks.map((task, index) => (
                    <div key={index} className="today-task-item">
                        <p><strong>{task.task_name}</strong></p>
                        <p>{new Date(task.task_date).toLocaleDateString()} | {task.task_time}</p>
                        {task.remainder && <p><FaBell /> Reminder Set</p>}
                        <div className="task-actions">
                            <button onClick={() => handleEdit(index)}><FaEdit /></button> 
                            <button onClick={() => handleDelete(index)}><FaTrash /></button> 
                        </div>
                    </div>
                ))
            ) : (
                <p>No upcoming tasks.</p>
            )}
        </div>
        </div>
    );
}

export default UpcomingTasks;
