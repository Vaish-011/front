import React from 'react'
import './createaccount.css';
import { FaUserAlt } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";

function createaccount() {
  return (
   <div className="wrapper">
         <div className='form-box createaccount'>
           <form action="">
               <h1>Create Account</h1>
               <div className='input-box'>
                   <input type="FirstName" placeholder='FirstName' required/>
                   <FaUserAlt className='icon'/>
               </div>
               <div className='input-box'>
                   <input type="LastName" placeholder='LastName' />
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
                   <p>Already account on ConnectHive? <a href='#' >Login</a></p>
               </div>
           </form>
         </div>
         </div>
  )
}

export default createaccount
