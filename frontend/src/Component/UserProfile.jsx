import React, { useEffect, useState } from 'react'
import "../css/Profile.css"
import PostDetail from './PostDetail'
import { useParams } from 'react-router-dom'

const UserProfile = () => {
    const {userid}=useParams()
   // console.log(userid)
 const [myPosts,setMyPosts]=useState([])
 const [name,setName]=useState("")
 const [show,setShow]=useState(false)

 const [posts,setPosts]=useState([])
 const [user,setUser]=useState("")

 useEffect(()=>{
 fetch(`http://localhost:5000/profile/user/${userid}`,{
  headers:{
    "Authorization":"Bearer "+localStorage.getItem("token")
  }
 })
 .then((res)=>res.json())
 .then((result)=> {
     console.log(result)
 setUser(result.user)
 setPosts(result.post)
 })
 //console.log("result",result)
 },[])
  



  return (
    <div className='profile'>
      {/* Profile frame */}
      <div className="profile-frame">

        {/* profile pic */}
        <div className="profile-pic">
          <img src="https://images.unsplash.com/photo-1607283817061-bac25eeaefab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=804&q=80" 
          alt="" />
        </div>

    {/* profile Data */}
        <div className="profile-data">
        <h1>{user.name}</h1>
        <div className="profile-info" style={{display:"flex"}}>
          <p>{posts.length} Post</p>
          <p>40 Follower</p>
          <p>40 Following</p>
        </div>
        </div>
      </div>
      
      <hr style={{width:"90%",opacity:"0.8",margin:"25px auto"}} />   {/*  line dene k lie */}
        {/* Gallery */}

        <div className="gallery">
        {posts && posts.map((el)=>{
          return <div className="gallery-box">
            <img key={el._id} src={el.photo} alt="posts" className='items' 
            // onClick={()=>toggleDetails(el)}
            />
          </div>
        })}
        </div>
        {/* {show && 
        <PostDetail item={posts} toggleDetails={toggleDetails} />
        
        } */}
    </div>
  )
}

export default UserProfile