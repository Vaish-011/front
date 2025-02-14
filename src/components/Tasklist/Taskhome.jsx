import React, { useEffect, useState } from 'react'
import { FaCalendarAlt , FaClock ,  FaBell , FaEdit , FaTrash} from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from 'axios';
import TodaysTasks from './TodaysTasks';
import UpcomingTasks from './UpcomingTasks';


function Taskhome() {
    const [tasks , setTasks] = useState('');
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

    useEffect(()=>{
      axios.get('http://localhost:5000/api/tasks/task')
         .then(response => setTaskList(response.data))
         .catch(err => console.error("Error tasks : " , err));
    } , []);

    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
          setUser(storedUser);
          setToken(storedToken);
      }
  }, []);
  
  const handleShowTodayTasks = () => {
    const todayDate = new Date().toISOString().split("T")[0];
    const todayTasks = taskList.filter((task) => {
        if (task.task_date) {
            const taskDate = new Date(task.task_date).toISOString().split("T")[0]; 
            return taskDate === todayDate; 
        }
        return false;
    });

    console.log(todayTasks);
  
    if (todayTasks.length > 0) { 
        setTodayTasks(todayTasks); 
        setShowTodayTasks(true); 
    } else {
        setShowTodayTasks(false); 
    }
  };
  
const handleShowUpcomingTasks = () => {
  const todayDate = new Date().toISOString().split("T")[0];
  const upcomingTasks = taskList.filter(task => {
      if (task.task_date) {
          const taskDate = task.task_date.split("T")[0];
          return taskDate > todayDate; 
      }
      return false;
  });

  setShowUpcomingTasks(upcomingTasks.length > 0);

};

const handleSubmit = async (e) => {
    e.preventDefault();
        if (!user) {
          console.error("User is not logged in!");
          return;
      }
        if(tasks.trim() === "")
           return;

        const formattedDate = date ? new Date(date).toISOString().slice(0, 19).replace('T', ' ') : null;
            
          const newTask = { 
          task_name: tasks, 
          task_date: formattedDate,
          task_time: time,
          remainder,
          client_id: user.id
      };

        if (editIndex !== null) {
            const taskId = taskList[editIndex].task_id;
            axios.put(`http://localhost:5000/api/tasks/task/${taskId}` , newTask)
               .then(response => {
                  const updatedTasks = [...taskList];
                  updatedTasks[editIndex] = {...newTask , task_id: taskId};
                  setTaskList(updatedTasks);
                  setEditIndex(null);
               })
               .catch(err => console.error("Error in updating the task : " , err));
            
        } else {
            axios.post('http://localhost:5000/api/tasks/task' , newTask)
               .then(response => {
                setTaskList((prevList) => [...prevList, {...newTask , task_id: response.data.taskId}

                ]);
               })
               .catch(err => console.error("Error in adding the tasks : " , err));
           
        }
        
        setTasks('');
        setTime('')
        setRemainder(false);
        setDate(new Date());
      }
  

  const handleEdit = (index) => {
        const taskToEdit = taskList[index];
        setTasks(taskToEdit.task_name);
        setDate(taskToEdit.task_date ? new Date(taskToEdit.task_date) : new Date());
        setTime(taskToEdit.task_time);
        setRemainder(taskToEdit.remainder);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const taskId = taskList[index].task_id;
        axios.delete(`http://localhost:5000/api/tasks/task/${taskId}`)
           .then(() => {
            const filteredTasks = taskList.filter((_, i) => i !== index);
            setTaskList(filteredTasks);
           })
           .catch(err => console.error("Error in deleting the task : " , err));
    };

    const handleCheckboxChange = (index) => {
        const updatedTaskList = [...taskList];
        updatedTaskList[index].completed = !updatedTaskList[index].completed;
        setTaskList(updatedTaskList);
    }

    const handleDateChange = (selectedDate) => {
      const adjustedDate = new Date(selectedDate);
      adjustedDate.setHours(12, 0, 0, 0);
      setDate(adjustedDate);
      setShowCalendar(false);
  };

    return (
        <div className="task-container">
          <div className="sidebar">
                <button onClick={handleShowTodayTasks}>Today</button>
                <button onClick={handleShowUpcomingTasks}>Upcoming</button>
            </div>
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
                        onChange={(handleDateChange)}
                          
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
                <p><strong>{task.task_name}</strong></p>
                <p>{new Date(task.task_date).toLocaleDateString()} | {task.task_time}</p>
                {task.remainder && <p><FaBell/> Reminder Set</p>}
                <div className="task-actions">
                  <button onClick={() => handleEdit(index)}><FaEdit /></button>
                  <button onClick={() => handleDelete(index)}><FaTrash /></button>
                </div>
              </div>
            ))}
          </div>
          {showTodayTasks && 
          <TodaysTasks 
             tasks={todayTasks} 
             onEdit={handleEdit} 
             onDelete={handleDelete} 
             onCheckboxChange={handleCheckboxChange} />}
          
          {showUpcomingTasks && <UpcomingTasks taskList={taskList} />}

        </div>
       
      );
}
     

export default Taskhome;