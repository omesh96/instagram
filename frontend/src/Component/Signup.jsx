import React, { useEffect } from 'react'
import logo from "../assets/logo1.png"
import "../css/Signup.css"
import { Link } from 'react-router-dom'

const Signup = () => {

  useEffect(()=>{
       fetchData()
  },[])

  const fetchData=async ()=>{
 const response=await fetch("http://localhost:5000/")
    const data=await response.json()
    console.log(data)
  }
  return (
    <div className='signUp'>
        <div className="form-container">
           <div className="form">
            <img className='signUpLogo' src={logo} alt="" />
            <p className='loginPara'>
          Sign Up To see photos and vedios <br /> from your friends
            </p>
           <div>
                <input type="email"  name='email' id='email' placeholder='email' />
                 </div>
       <div>
       <input type="text"  name='name' id='name' placeholder='Full Name' />
       </div>
       <div>
       <input type="text"  name='username' id='username' placeholder='UserName' />
       </div>
       <div>
       <input type="password"  name='password' id='password' placeholder='Password' />
       </div>

        <p className='loginPara' style={{fontSize:"12px",margin:"3px 0px"}}>
            By Signing up, You agree to out Terms, <br /> Privacy policy and cookies Policy.
        </p>

        <input type="submit" id='submit-btn' value="Sign-Up" />
        </div>

        <div className="form2" >
       Already Have an account ? <Link to="/signin"><span style={{color:"blue",cursor:"pointer"}}>Sign in</span></Link>
        </div>


           </div>
    </div>
  )
}

export default Signup