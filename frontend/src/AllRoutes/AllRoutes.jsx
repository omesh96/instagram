import React from 'react'
import {Routes,Route} from "react-router-dom"
import Signup from '../Component/Signup'
import SignIn from '../Component/SignIn'
import Profile from '../Component/Profile'
import Home from '../Component/Home'
import CreatePost from '../Component/CreatePost'
import UserProfile from '../Component/UserProfile'


const AllRoutes = () => {
  return (
    <div>
        <Routes>
    <Route path='/' element={<Home />}></Route>
    <Route path='/signup' element={<Signup />}></Route>
    <Route path='/signin' element={<SignIn />}></Route>
    <Route exact path='/profile' element={<Profile />}></Route>
    <Route path='/createpost' element={<CreatePost />}></Route>
    <Route path='/profile/:userid' element={<UserProfile />}></Route>
    
        </Routes>
    </div>
  )
}

export default AllRoutes