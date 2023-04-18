import React from 'react'
import "../css/SignIn.css"
import logo from "../assets/logo1.png"
import { Link } from 'react-router-dom'

const SignIn = () => {
  return (
    <div className='SignIn'>
    <div>
    <div className="loginForm">
    <img className='signInLogo' src={logo} alt="" />
    <div><input type="email" name='email' id='email' placeholder='email' /></div>
    <div><input type="password" name='password' id='password' placeholder='password' /></div>
    <input type="submit" value="Sign In" id="login-btn" />
    </div>

    <div className="loginForm2">
      Dont Have an account ? <Link to="/signup"><span style={{color:"blue",cursor:"pointer"}}>Sign Up</span></Link>
    </div>
    </div>
    </div>
  )
}

export default SignIn