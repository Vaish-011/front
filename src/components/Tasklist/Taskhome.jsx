import React, { useState } from 'react'
import { FaCalendarAlt , FaClock ,  FaBell , FaPaperPlane } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Sidebar from './Sidebar';

function Taskhome({addTask}) {
    const [tasks , setTasks] = useState('');
    const [date , setDate] = useState(new Date());
    const [time , setTime] = useState('');
    const [remainder , setRemainder] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);

    

    const handleSubmit = (e) => {
        e.preventDefault();
        if(tasks.trim()){
            addTask({tasks , date , time , remainder});
            setTasks('');
            setDate(new Date());
            setTime("")
            setRemainder(false);
        }
    }
  return (
    <div className='task-input-container'>
        <div className='input-wrapper'>
            <div className="input-with-button">
                  <input
                    type="text"
                    value={tasks}
                    onChange={(e) => setTasks(e.target.value)}
                    placeholder="Enter your Task......."
                    className="task-input"
                  />
                  <button onClick={handleSubmit} className="add-task-button">
                    <FaPaperPlane />
                  </button>
            </div>

            <div className='input-icons'>
                <div className='input-icon date-icon'>
                <button className='date-button' onClick={() => setShowCalendar((prev) => !prev) }>
                <FaCalendarAlt /> Date
                </button>
                {showCalendar && (
                    <div className='date-picker-container'>
                        <Calendar
                          onChange={(selectedDate) => {
                             setDate(selectedDate);
                             setShowCalendar(false);
                          }}
                          value={date}
                        />
                    </div>
                )}
                
            </div>

            <div className="input-icon">
                <button className='time-button' onClick={()=> document.getElementById('time-picker').focus()}>
                <FaClock /> Time
                </button>
                <input
                    id='time-picker'
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="hidden-input"/>
            </div>

            <div className={`input-icon ${remainder ? "active" : ""}`} onClick={() => setRemainder(!remainder)}>
                <button className='remainder-button'>
                    <FaBell /> Remainder
                </button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Taskhome;
