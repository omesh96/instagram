import React, { useEffect, useState } from 'react'
import logo from "../assets/logo1.png"
import "../css/Signup.css"
import { Link, useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';

const Signup = () => {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [userName,setUserName]=useState("")
  const [password,setPassword]=useState("")
  const navigate=useNavigate()



  // Toast Function 
  const alertError=(msg)=> toast.error(msg)
  const alertSuccess=(msg)=>toast.success(msg)

  let rejexEmail = "[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[.]+[a-z]{2,3}$"; // checking for correct email id
  let rejexPassword="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"


   const postData=()=>{
 // checking email 
    let resp = email.match(rejexEmail);
    if(!resp){
      return  alertError("Invalid email id")  // return krne se aage ka code nhi chlega agar if statement true hoga to
    }
    else if(!password.match(rejexPassword)){
      return alertError("password must contain at least 8 character, including at least one number, including both upper case and lower case and characters for example #?!@")
    }
   // console.log({name,email,userName,password})
    // sending data to server 
    fetch(`https://splendid-tan-beanie.cyclic.app/user/signup`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name:name,
        email:email,
        userName:userName,
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
      navigate("/signin")
     }
      console.log(data)
    })
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
                <input type="email"  name='email' id='email' placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                 </div>
       <div>
       <input type="text"  name='name' id='name' placeholder='Full Name' value={name} onChange={(e)=>setName(e.target.value)}  />
       </div>
       <div>
       <input type="text"  name='username' id='username' placeholder='UserName' value={userName} onChange={(e)=>setUserName(e.target.value)} />
       </div>
       <div>
       <input type="password"  name='password' id='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
       </div>

        <p className='loginPara' style={{fontSize:"12px",margin:"3px 0px"}}>
            By Signing up, You agree to out Terms, <br /> Privacy policy and cookies Policy.
        </p>

        <input type="submit" id='submit-btn' value="Sign-Up" onClick={()=>postData()} />
        </div>

        <div className="form2" >
       Already Have an account ? <Link to="/signin"><span style={{color:"blue",cursor:"pointer"}}>Sign in</span></Link>
        </div>


           </div>
    </div>
  )
}

export default Signup