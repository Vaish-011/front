import logo from './logo.svg';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import './App.css';
import Home from './components/Home/index';
import HomePage from './components/HomePage';
import Resume from './components/AIresumebuilder';
import Chat from './components/chats';
import Login from './components/Login';
import Post from './components/Post';
import User from './components/User';
import Signup from './components/Createaccount';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/home' element={<Home/>}/>
    </Routes>
    <Routes>
    <Route path='/post' element={<Post />}/>
    <Route path='/chat' element={<Chat/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/user' element={<User/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/resume' element={<Resume/>}/>
    </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
