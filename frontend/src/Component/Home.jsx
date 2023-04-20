import React, { useEffect, useState } from 'react'
import "../css/Home.css"
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [data,setData]=useState([])
  const [count,setCount]=useState(0)
  const navigate=useNavigate()

  useEffect(()=>{
 const token =localStorage.getItem("token")
 if(!token){
   navigate("/signup")
 }
 // Fetching All the post
 fetch(`http://localhost:5000/post/allposts`,{
  headers:{
    "Content-Type":"application/json",
    "Authorization":"Bearer "+ localStorage.getItem("token")
}
 }).then(res=> res.json())
 .then(result=> setData(result))
 .catch(err=> console.log(err))
  },[])

  const likePost=(id)=>{
      fetch("http://localhost:5000/post/like",{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("token")
        },
        body:JSON.stringify({
          postId:id
        })
      }).then(res=>res.json())
      .then((result)=>{
        const newData=data.map((posts)=>{
          if(posts._id== result._id){
            return result
          } else{
            return posts
          }
        })
        setData(newData)
        console.log(result)
      })
      
  }
  

  const unLikePost=(id)=>{
    fetch("http://localhost:5000/post/unlike",{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+ localStorage.getItem("token")
      },
      body:JSON.stringify({
        postId:id
      })
    }).then(res=>res.json())
    .then((result)=>{
      const newData = data.map((posts) => {
        if (posts._id == result._id) {
          return result;
        } else {
          return posts;
        }
      });
      setData(newData);
    // setCount(count+1)
      console.log("result",result)
    })
    
}


  return (
    <div className='home'>
      {/* card */}
       {data.map((el)=>{
        console.log(el)
      return (
        <div className="card">
        {/* card header */}
        <div className="card-header">

          <div className="card-pic">
            <img src={el.photo} 
            alt="" />
          </div>
          <h5>{el.userName}</h5>
        </div>

         {/* card image */}

         <div className="card-image">
          <img src={el.photo}
           alt="" />
         </div>
 
      {/* card content */}

      <div className="card-content">
        {
          el.likes.includes(JSON.parse(localStorage.getItem("user"))._id) ? 
          (<span className="material-symbols-outlined material-symbols-outlined-red" onClick={()=>unLikePost(el._id)}>favorite</span>
          ) : (<span className="material-symbols-outlined" onClick={()=>likePost(el._id)}>favorite</span>)
        }
      
      <p>{el.likes.length} Likes</p>
      <p>{el.body}</p>
      </div>

      {/* add comment */}

     <div className="add-comment">
     <span className="material-symbols-outlined">mood</span>
     <input type="text" placeholder='Add a Comment' />
     <button className='comment'>Post</button>
     </div>

      </div>
      )
       })}

     
    </div>
  )
}

export default Home