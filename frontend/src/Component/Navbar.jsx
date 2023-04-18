import React from 'react'
import logo from "../assets/logo1.png"
import "../Component/Navbar.css"
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={logo} alt="logo" />

        <ul className='nav-menu'>
        <Link to="/signup">   <li >Signup</li> </Link>
           {/*  anchor tag ka use krne se webswite refresh ho jati hai */}
           <Link to="/signin"> <li>SignIn</li></Link>
           <Link to="/profile"> <li>Profile</li></Link>
        </ul>
    </div>
  )
}

export default Navbar