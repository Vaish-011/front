
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import './App.css';
import Home from './components/Home/index';
import HomePage from './components/HomePage';
import Resume from './components/AIresumebuilder';
import Chat from './components/chats';
import Login from './components/Login/login.jsx';
import Post from './components/Post';
import User from './components/User';
import CV from './components/cvbuilder';
import Tasklist from './components/Tasklist';
import Feedback from './components/Feedback/index.js';
import React from "react";
import ConnectPage from './components/connection/index.js';
import SearchUsers from "./components/chats/SearchUsers.js";

import { useState } from "react";
function App() {
  const [receiver, setReceiver] = useState(null); // Selected user for chat

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
    <Route path='/user' element={<User/>}/>
    <Route path='/resume' element={<Resume/>}/>
    <Route path='/cv' element={<CV/>}/>
    <Route path='/tasklist' element={<Tasklist/>}/>
    <Route path='/connect' element={<ConnectPage/>}/>
    <Route path='/feedback' element={<Feedback/>}/>
    </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
