import React, { useState } from "react";
import { FaCalendarAlt, FaClock, FaBell, FaPaperPlane } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TaskInput({ addTask }) {
  const [tasks, setTasks] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [remainder, setRemainder] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tasks.trim()) {
      addTask({ tasks, date, time, remainder });
      setTasks("");
      setDate(null);
      setTime("");
      setRemainder(false);
    }
  };
  return (
    <div className="task-input-container">
      <div className="input-wrapper">
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
        <div className="input-icons">
          <div className="input-icon">
            <button
              className="date-button"
              onClick={() => document.getElementById("date-picker").focus()}
            >
              <FaCalendarAlt /> Date
            </button>
            <DatePicker
              id="date-picker"
              selected={date}
              onChange={(date) => setDate(date)}
              className="hidden-input"
              dateFormat="dd/MM/yyyy"
              placeholderText="Select Date"
            />
          </div>

          <div className="input-icon">
            <button
              className="time-button"
              onClick={() => document.getElementById("time-picker").focus()}
            >
              <FaClock /> Time
            </button>
            <input
              id="time-picker"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="hidden-input"
            />
          </div>

          <div
            className={`input-icon ${remainder ? "active" : ""}`}
            onClick={() => setRemainder(!remainder)}
          >
            <button className="remainder-button">
              <FaBell /> Remainder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskInput;
