import React, { useState } from 'react'
import './Logincreateaccount.css';
import { FaUserAlt } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";


function Login() {

    const [action , setaction] = useState('');

    const createaccountlink = () =>{
        setaction(' active')
    }

    const loginlink = () =>{
        setaction('')
    }
  return (
    <div className={`wrapper${action}`}>
      <div className='form-box login'>
        <form action="">
            <h1>Login</h1>
            <div className='input-box'>
                <input type="Email" placeholder='Email' required/>
                <MdEmail className='icon'/>
            </div>
            <div className='input-box'>
                <input type="password"
                placeholder='Password' required />
                <IoMdLock className='icon'/>
            </div>
            <div className='forgot'>
                <a href="#">Forgot Password</a>
            </div>

            <button>Sign in </button>

            <div className='sign-up-link'>
                <p>New To ConnectHive?<a href='#' onClick={createaccountlink} >Create Account</a></p>
            </div>
        </form>
      </div>

       <div className='form-box createaccount'>
                 <form action="">
                     <h1>Create Account</h1>
                     <div className='input-box'>
                         <input type="First Name" placeholder='FirstName' required/>
                         <FaUserAlt className='icon'/>
                     </div>
                     <div className='input-box'>
                         <input type="Last Name" placeholder='LastName' />
                         <FaUserAlt className='icon'/>
                     </div>
                     <div className='input-box'>
                         <input type="Email" placeholder='Email' />
                         <MdEmail className='icon'/>
                     </div>
                     <div className='input-box'>
                         <input type="password"
                         placeholder='Password' required />
                         <IoMdLock className='icon'/>
                     </div>
         
                     <button>Sign up </button>
         
                     <div className='sign-up-link'>
                         <p>Already have an account?<a href='#' onClick={loginlink} >Login</a></p>
                     </div>
                 </form>
               </div>
      </div>
  )
}

export default Login;
