import React, { useState } from 'react'
import "../css/SignIn.css"
import logo from "../assets/logo1.png"
import { Link,useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const SignIn = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const navigate=useNavigate()

  const alertError=(msg)=> toast.error(msg)
  const alertSuccess=(msg)=>toast.success(msg)

  let rejexEmail = "[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[.]+[a-z]{2,3}$"; // checking for correct email id

  const postData=()=>{

// checking email 
let resp = email.match(rejexEmail);
if(!resp){
  return  alertError("Invalid email id")  // return krne se aage ka code nhi chlega agar if statement true hoga to
}


    fetch(`http://localhost:5000/user/signin`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email:email,
        password:password
      })
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.error){
         alertError(data.error)
      }
     else{
      alertSuccess(data.msg)
      navigate("/")
     }
      console.log(data)
    })
  }

  return (
    <div className='SignIn'>
    <div>
    <div className="loginForm">
    <img className='signInLogo' src={logo} alt="" />
    <div><input type="email" name='email' id='email' placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/></div>
    <div><input type="password" name='password' id='password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} /></div>
    <input type="submit" value="Sign In" id="login-btn" onClick={()=>postData()} />
    </div>

    <div className="loginForm2">
      Dont Have an account ? <Link to="/signup"><span style={{color:"blue",cursor:"pointer"}}>Sign Up</span></Link>
    </div>
    </div>
    </div>
  )
}

export default SignIn