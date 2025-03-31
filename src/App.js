import {BrowserRouter,Route,Routes} from 'react-router-dom';
import './App.css';
import Home from './components/Home/index';
import HomePage from './components/HomePage';
import Chat from './components/chats';
import Login from './components/Login/login.jsx';
import Post from './components/Post';
import ProfilePage from './components/User/index.js';
import CV from './components/cvbuilder';
import Tasklist from './components/Tasklist';
import Referral from './components/Referral';
import JobForm from './components/Referral/JobForm';
import JobList from './components/Referral/JobList';
import ApplicationPage from './components/Referral/ApplicationPage.js';
import RequestReferralForm from './components/Referral/RequestReferralForm.js';
import Feedback from './components/Feedback/index.js';
import React from "react";
import ConnectPage from './components/connection/index.js';
import SearchUsers from "./components/chats/SearchUsers.js";
import InvitationPage from './components/connection/invitation.js';
import TodaysTasks from './components/Tasklist/TodaysTasks.jsx';
import PendingTasks from './components/Tasklist/PendingTasks.jsx';
import UpcomingTasks from './components/Tasklist/UpcomingTasks.jsx';
import CompletedTasks from './components/Tasklist/CompletedTasks.jsx';
import Notification from './components/Tasklist/notification.jsx';
import AIresumebuilder from './components/AIresumebuilder/Home.jsx';
import useFormHandlers from './components/AIresumebuilder/Handler.jsx';
import Resume from './components/AIresumebuilder/Resume.jsx';
import Form from './components/AIresumebuilder/Form.jsx';
import ConnectionPage from './components/connection/connectionpage.js';
import EditProfile from './components/User/editprofile.js';
import Notifications from "./components/Notification/notification.js";
import Applynow from './components/Referral/Applynow.js'

import { useState,useEffect } from "react";
function App() {
  const [receiver, setReceiver] = useState(null); // Selected user for chat
  const [loading1, setLoading1] = useState(true); // State for useFormHandlers (assuming for the first form)
  const [loading2, setLoading2] = useState(true); // State for useFormHandlers2 (assuming for the second form)
  // Form handler for resume 1 (using useFormHandlers)
  const {
    formData: formData1,
    handleChange: handleChange1,
    handleArrayChange: handleArrayChange1,
    handleNestedArrayChange: handleNestedArrayChange1,
    addSkill: addSkill1,
    addEducation: addEducation1,
    addCertificate: addCertificate1,
    addLanguage: addLanguage1,
    handleAddExperience: handleAddExperience1,
    handleDelete: handleDelete1,
    handleSubmit: handleSubmit1,
} = useFormHandlers();


// useEffect for loading states
useEffect(() => {
    const timeout1 = setTimeout(() => {
        setLoading1(false); // Set loading state for the first form handler
    }, 2000);

    const timeout2 = setTimeout(() => {
        setLoading2(false); // Set loading state for the second form handler
    }, 2000);

    return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
    };
}, []);

  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/home' element={<Home/>}/>
    </Routes>
    <Routes>
    <Route path='/post' element={<Post />}/>
    <Route 
  path='/chat' 
  element={<Chat receiver={receiver} setReceiver={setReceiver} />} 
/>

    <Route path='/login' element={<Login/>}/>
    <Route path='/user' element={<ProfilePage/>}/>
    <Route path='/cv' element={<CV/>}/>
    <Route path='/tasklist' element={<Tasklist/>}/>
    <Route path='/referral' element={<Referral/>}/>
    <Route path="/referral/form" element={<JobForm />} />
    <Route path="/referral/joblist" element={<JobList />} />
    <Route path="/referral/requestform" element={<RequestReferralForm />} />
    <Route path="/referral/applicationpage" element={<ApplicationPage />} />
    <Route path='/connect' element={<ConnectPage/>}/>
    <Route path='/feedback' element={<Feedback/>}/>
    <Route path='/invitation' element={<InvitationPage/>}/>
    <Route path='/tasklist/today' element={<TodaysTasks/>}/>
    <Route path='/tasklist/pending' element={<PendingTasks/>}/>
    <Route path='/tasklist/upcoming' element={<UpcomingTasks/>}/>
    <Route path='/tasklist/completed' element={<CompletedTasks/>}/>
    <Route path='/tasklist/notifications' element={<Notification />} />
    <Route path='/resume' element={<AIresumebuilder/>}/>
    <Route path='/my_connections' element={<ConnectionPage/>}/>
    <Route path='/notification' element={<Notifications/>}/>
    <Route path='/editprofile' element={<EditProfile/>}/>
    <Route path="/referral/applynow" element={<Applynow />} />
      {/* Route for Resume 1 */}
      <Route path="/resume/1" element={
                            <div className="form-and-resume">
                                <div className="form-wrapper">
                                    <Form
                                        formData={formData1}
                                        handleChange={handleChange1}
                                        handleArrayChange={handleArrayChange1}
                                        addSkill={addSkill1}
                                        addEducation={addEducation1}
                                        addCertificate={addCertificate1}
                                        addLanguage={addLanguage1}
                                        handleAddExperience={handleAddExperience1}
                                        handleNestedArrayChange={handleNestedArrayChange1}
                                        handleSubmit={handleSubmit1}
                                        handleDelete={handleDelete1}
                                    />
                                </div>
                                <div className="resume-wrapper">
                                    <Resume resumeData={formData1} />
                                </div>
                            </div>
                        } />
    </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;