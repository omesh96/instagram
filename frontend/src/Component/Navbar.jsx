import React, { useContext } from 'react'
import logo from "../assets/logo1.png"
import "../css/Navbar.css"
import { Link,useNavigate } from 'react-router-dom'
import { LoginContext } from '../Context/loginContext'


const Navbar = ({login}) => {
  const navigate=useNavigate()
  const {setModalOpen}=useContext(LoginContext)

  const loginStatus=()=>{
 const token=localStorage.getItem("token")
 if(login || token){
 return [
   <>
    <Link to="/profile"> <li>Profile</li></Link>
    <Link to="/createpost"> <li>Create Post</li></Link>
    <Link style={{marginLeft:"20px"}} to="/followingpost"> <li>My Following </li></Link>
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

   const loginStatusMobile=()=>{
    const token=localStorage.getItem("token")
 if(login || token){
 return [
   <>
     <Link to="/"> <li><span class="material-symbols-outlined">
home
</span></li></Link>


    <Link to="/profile"> <li><span class="material-symbols-outlined">
account_circle
</span></li></Link>

    <Link to="/createpost"> <li><span class="material-symbols-outlined">
add_box
</span></li></Link>

    <Link style={{marginLeft:"20px"}} to="/followingpost"> <li><span class="material-symbols-outlined">
explore
</span> </li></Link>
    <Link to={""}> 
    <li onClick={()=>setModalOpen(true)} className='primaryBtn'><span class="material-symbols-outlined">
logout
</span></li>
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
        <img id='insta-logo' src={logo} alt="logo" onClick={()=>navigate("/")} style={{cursor:"pointer"}}  />

        <ul className='nav-menu'>
        {loginStatus()}
        </ul>
        <ul className='nav-mobile'>
        {loginStatusMobile()}
        </ul>
    </div>
  )
}

export default Navbar