import React, { useEffect, useState } from 'react'
import "../css/Profile.css"
import PostDetail from './PostDetail'
import ProfilePic from './ProfilePic'

const Profile = () => {
  var picLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStgQaQhSW_3UZyQK6WLM2cmNFUPmEkRxeGS8bff17wvxj-wk5jKegJmegs7m-KDfxNYBGFQM72mks&usqp=CAU&ec=48665701"
 const [myPosts,setMyPosts]=useState([])
 const [name,setName]=useState("")
 const [show,setShow]=useState(false)
 const [posts,setPost]=useState([])
 const [changePic,setChangePic]=useState(false)
 const [user,setUser]=useState("")

 useEffect(()=>{
 fetch(`http://localhost:5000/profile/user/${JSON.parse(localStorage.getItem("user"))._id}`,{
  headers:{
    "Authorization":"Bearer "+localStorage.getItem("token")
  }
 })
 .then((res)=>res.json())
 .then((result)=> {
  console.log(result)
  setMyPosts(result.post)
  setUser(result.user)
 // setName(result.myAllPosts.userName) 
 })
 //console.log("result",result)
 },[])
  

 const toggleDetails=(posts)=>{
  console.log("posts",posts)
  if(show){
      setShow(false)
      
  } else{
     setShow(true)
     setPost(posts)
  }
}
 // console.log("myPosts",myPosts)

 const changeProfile=()=>{
  if(changePic){
    setChangePic(false)
  } else{
    setChangePic(true)
  }
 }

  return (
    <div className='profile'>
      {/* Profile frame */}
      <div className="profile-frame">

        {/* profile pic */}
        <div className="profile-pic" onClick={()=>changeProfile()}>
          <img src={user.Photo ? user.Photo : picLink}
          alt="" />
        </div>

    {/* profile Data */}
        <div className="profile-data">
        <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
        <div className="profile-info" style={{display:"flex"}}>
          <p>{myPosts ? myPosts.length : "0"} Post</p>
          <p>{user.followers ? user.followers.length : "0"} Follower</p>
          <p>{user.following ? user.following.length : "0"} Following</p>
        </div>
        </div>
      </div>
      
      <hr style={{width:"90%",opacity:"0.8",margin:"25px auto"}} />   {/*  line dene k lie */}
        {/* Gallery */}

        <div className="gallery">
        {myPosts && myPosts.map((el)=>{
          return <div className="gallery-box">
            <img key={el._id} src={el.photo} alt="posts" className='items' 
            onClick={()=>toggleDetails(el)}
            />
          </div>
        })}
        </div>
        {show && 
        <PostDetail item={posts} toggleDetails={toggleDetails} />
        
        }
        {
          changePic && <ProfilePic changeProfile={changeProfile}></ProfilePic>
        }
    </div>
  )
}

export default Profile