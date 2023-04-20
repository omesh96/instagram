import React, { useContext } from 'react'
import logo from "../assets/logo1.png"
import "../Component/Navbar.css"
import { Link } from 'react-router-dom'
import { LoginContext } from '../Context/loginContext'


const Navbar = ({login}) => {
  const {setModalOpen}=useContext(LoginContext)

  const loginStatus=()=>{
 const token=localStorage.getItem("token")
 if(login || token){
 return [
   <>
    <Link to="/profile"> <li>Profile</li></Link>
    <Link to="/createpost"> <li>Create Post</li></Link>
    <Link to={""}> 
    <button onClick={()=>setModalOpen(true)} className='primaryBtn'>Log out</button>
    </Link>
   </>
 ]
 } else{
  return [
    <>
     <Link to="/signup">   <li >Signup</li> </Link>
           {/*  anchor tag ka use krne se webswite refresh ho jati hai */}
           <Link to="/signin"> <li>SignIn</li></Link>
          
    </>
  ]
 }
  }

  return (
    <div className='navbar'>
        <img src={logo} alt="logo" />

        <ul className='nav-menu'>
        {loginStatus()}
        </ul>
    </div>
  )
}

export default Navbar