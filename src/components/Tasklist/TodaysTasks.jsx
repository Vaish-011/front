import React, { useState, useEffect } from 'react';
import { FaBell, FaEdit, FaTrash } from "react-icons/fa";
import axios from 'axios';


function TodaysTasks() {
    const [tasks, setTasks] = useState([]);
        const [taskList, setTaskList] = useState([]);
        const [user, setUser] = useState(null);
        const [token, setToken] = useState("");
        const [date , setDate] = useState(new Date());
        const [time , setTime] = useState('');
        const [remainder , setRemainder] = useState(false);
        const [showCalendar, setShowCalendar] = useState(false);
        const [editIndex, setEditIndex] = useState(null); 
        const [showTimePicker, setShowTimePicker] = useState(false);
        const [showTodayTasks, setShowTodayTasks] = useState(false);
        const [todayTasks , setTodayTasks] = useState([]);
        const [showUpcomingTasks, setShowUpcomingTasks] = useState(false);
    

        useEffect(() => {
            const fetchTodayTasks = async () => {
                try {
                    const response = await fetch('http://localhost:5000/api/tasks/task/today');
                    const data = await response.json();
                    console.log('Fetched Data:', data);
    
                    if (Array.isArray(data)) {
                        setTasks(data);
                        setTaskList(data);
                    } else {
                        setTasks([]); 
                        setTaskList([]); 
                    }
                } catch (error) {
                    console.error("Error fetching today's tasks:", error);
                }
            };
            
            fetchTodayTasks();
        }, []);

        const handleEdit = (index) => {
            const taskToEdit = tasks[index];
            setDate(taskToEdit.task_date ? new Date(taskToEdit.task_date) : new Date());
            setTime(taskToEdit.task_time);
            setRemainder(taskToEdit.remainder);
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
           .catch(err => console.error("Error in deleting the task : " , err));
    };

    const handleCheckboxChange = (index) => {
        const updatedTaskList = [...taskList];
        updatedTaskList[index].completed = !updatedTaskList[index].completed;
        setTaskList(updatedTaskList);
    }

    return (
        <div className='today-tasks-container'>
            <h2>Today's Tasks</h2>
            <div  className='task-list'>
            {Array.isArray(tasks) && tasks.length > 0 ? (
                tasks.map((task, index) => (
                    <div key={index} className="today-task-item">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() =>handleCheckboxChange(index)} 
                            className="task-checkbox"
                        />
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
                <p>No tasks for today.</p>
            )}
        </div>
        </div>
    );
}

export default TodaysTasks;
