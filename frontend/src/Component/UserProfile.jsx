import React, { useEffect, useState } from 'react'
import "../css/Profile.css"
import PostDetail from './PostDetail'
import { useParams } from 'react-router-dom'

const UserProfile = () => {
  var picLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStgQaQhSW_3UZyQK6WLM2cmNFUPmEkRxeGS8bff17wvxj-wk5jKegJmegs7m-KDfxNYBGFQM72mks&usqp=CAU&ec=48665701"
 
    const {userid}=useParams()
   // console.log(userid)
 const [myPosts,setMyPosts]=useState([])
 const [name,setName]=useState("")
 const [show,setShow]=useState(false)

 const [posts,setPosts]=useState([])
 const [user,setUser]=useState("")
 const [isFollow,setIsFollow]=useState(false)

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
 if(result.user.followers.includes(JSON.parse(localStorage.getItem("user"))._id)){
    setIsFollow(true)
 }
 })
 //console.log("result",result)
 },[isFollow])



 // To follow user //
  const followUser=(userId)=>{
    console.log("userId",userId)
     fetch("http://localhost:5000/profile/follow",{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("token")
          },
          body:JSON.stringify({
            followId:userId 
          })
     })
     .then((res)=> {
        return res.json()
     })
     .then((data)=>{
        console.log(data)
        setIsFollow(true)
     })
     .catch(err=> console.log(err))
  }
  
 // To Unfollow user //
 const unFollowUser=(userId)=>{
    fetch(`http://localhost:5000/profile/unfollow`,{
       method:"PUT",
       headers:{
           "Content-Type":"application/json",
           "Authorization":"Bearer "+localStorage.getItem("token")
         },
         body:JSON.stringify({
           followId:userId 
         })
    })
    .then((res)=>{res.json()})
    .then((data)=>{
       console.log(data)
       setIsFollow(false)
    })
 }
 


  return (
    <div className='profile'>
      {/* Profile frame */}
      <div className="profile-frame">

        {/* profile pic */}
        <div className="profile-pic">
          <img 
         src={user.Photo ? user.Photo : picLink}
          alt="" />
        </div>

    {/* profile Data */}
        <div className="profile-data">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <h1>{user.name}</h1>
        <button className='follow-btn' onClick={()=>{
            if(isFollow){
                unFollowUser(user._id)
            } else{
                followUser(user._id)
            }
        }}>
            {isFollow ? "UnFollow" : "Follow"}
        </button>

            </div>
        <div className="profile-info" style={{display:"flex"}}>
          <p>{posts.length} Post</p>
          <p>{user.followers ? user.followers.length : "0"} Follower</p>
          <p>{user.following ? user.following.length : "0"} Following</p>
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