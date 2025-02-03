import React, { useState } from 'react'
import { FaCalendarAlt , FaClock ,  FaBell , FaEdit , FaTrash} from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Taskhome({addTask}) {
    const [tasks , setTasks] = useState('');
    const [taskList, setTaskList] = useState([]);
    const [date , setDate] = useState(null);
    const [time , setTime] = useState('');
    const [remainder , setRemainder] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [editIndex, setEditIndex] = useState(null); 
    const [showTimePicker, setShowTimePicker] = useState(false);

    

    const handleSubmit = (e) => {
        e.preventDefault();
        if(tasks.trim()){
            const newTask = { 
            tasks, 
            date: date ? date.toDateString() : '', 
            time,
            remainder 
        };
        if (editIndex !== null) {
            const updatedTasks = [...taskList];
            updatedTasks[editIndex] = newTask;
            setTaskList(updatedTasks);
            setEditIndex(null);
        } else {
            
            setTaskList((prevList) => [...prevList, newTask]);
        }

          
            setTasks('');
            setTime("")
            setRemainder(false);
            setDate(null);
        }
    }

    const handleEdit = (index) => {
        const taskToEdit = taskList[index];
        setTasks(taskToEdit.tasks);
        setDate(new Date(taskToEdit.date));
        setTime(taskToEdit.time);
        setRemainder(taskToEdit.remainder);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const filteredTasks = taskList.filter((_, i) => i !== index);
        setTaskList(filteredTasks);
    };

    const handleCheckboxChange = (index) => {
        const updatedTaskList = [...taskList];
        updatedTaskList[index].completed = !updatedTaskList[index].completed;
        setTaskList(updatedTaskList);
    }

    return (
        <div className="task-container">
          <div className="input-section">
            <div className="input-wrapper">
              <div className="input-with-button">
                <input
                  type="text"
                  value={tasks}
                  onChange={(e) => setTasks(e.target.value)}
                  placeholder="Enter your Task......."
                  className="task-input"
                  onKeyDown={(e) => {if (e.key === 'Enter') handleSubmit(e); }}
                />
              </div>
      
              <div className="input-icons">
                <div className="input-icon date-icon">
                  <button className="date-button" onClick={() => setShowCalendar((prev) => !prev)}>
                    <FaCalendarAlt /> Date
                  </button>
                  {showCalendar && (
                    <div className="date-picker-container">
                      <Calendar
                        onChange={(selectedDate) => {
                          setDate(selectedDate);
                          setShowCalendar(false);
                        }}
                        value={date || new Date()}
                        minDate={new Date()} 
                        maxDate={new Date(2025, 12, 31)} 
                        showNeighboringMonth={false} 
                      />
                    </div>
                  )}
                </div>
      
                <div className="input-icon">
                  <button className="time-button" onClick={() => setShowTimePicker((prev) => !prev)}>
                    <FaClock /> Time
                  </button>

                  {showTimePicker && (
                  <input
                    id="time-picker"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)} // Update time
                    className="time-input"
                  />
                )}
              </div>
      
                <div className={`input-icon ${remainder ? "active" : ""}`} onClick={() => setRemainder(!remainder)}>
                  <button className="remainder-button">
                    <FaBell /> Remainder
                  </button>
                </div>
      
                <div className="input-icon">
                  <button className="add-task-button" onClick={handleSubmit}> Add Task </button>
                </div>
              </div>
            </div>
          </div>
      
          
          <div className="task-list">
            {taskList.map((task, index) => (
              <div key={index} className={`task-item ${task.completed ? "completed" : ""}`}>
                <input 
                  type="checkbox" 
                  checked={task.completed}
                  onChange={() => handleCheckboxChange(index)} 
                  className="task-checkbox"
                />
                <p><strong>{task.tasks}</strong></p>
                <p>{task.date} | {task.time}</p>
                {task.remainder && <p><FaBell/> Reminder Set</p>}
                <div className="task-actions">
                  <button onClick={() => handleEdit(index)}><FaEdit /></button>
                  <button onClick={() => handleDelete(index)}><FaTrash /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}      

export default Taskhome;