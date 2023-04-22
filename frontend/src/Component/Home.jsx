import React, { useEffect, useState } from 'react'
import "../css/Home.css"
import { useNavigate,Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Home = () => {
  const [data,setData]=useState([])
  const [count,setCount]=useState(0)
  const [comment,setComment]=useState("")
  const [show,setShow]=useState(false)
  const [item,setItem]=useState([])
  const [cmnt,setCmnt]=useState([])
  const navigate=useNavigate()

  const alertError=(msg)=> toast.error(msg)
  const alertSuccess=(msg)=>toast.success(msg)

  useEffect(()=>{
 const token =localStorage.getItem("token")
 if(!token){
   navigate("/signup")
 }

  // to show and hide comments //

  
 // Fetching All the post
 fetch(`http://localhost:5000/post/allposts`,{
  headers:{
    "Content-Type":"application/json",
    "Authorization":"Bearer "+ localStorage.getItem("token")
}
 }).then(res=> res.json())
 .then(result=> {
  setData(result)
  console.log(result)
 })
 .catch(err=> console.log(err))
  },[])

  const toggleComments=(posts)=>{
    console.log("posts",posts)
    if(show){
        setShow(false)
        
    } else{
       setShow(true)
       setItem(posts)
    }
  }

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

// function to make comment //
 const makeComment=(text,id)=>{
  console.log(text,id)
 fetch("http://localhost:5000/post/comment",{
  method:"PUT",
  headers:{
    "Content-Type":"application/json",
    "Authorization":"Bearer "+localStorage.getItem("token")
  },
  body:JSON.stringify({
    text:text,
    postId:id
  })
}).then(res=>res.json())
.then((result)=>{
  console.log("result",result);
  const newData = data.map((posts) => {
    if (posts._id == result._id) {
      return result;
    } else {
      return posts;
    }
  });
  setData(newData);
  setComment("");
  alertSuccess("Comment posted");
 // console.log("result",result);
})
  // setCount(count+1)
 }

  console.log("items",item)
  return (
    <div className='home'>
      {/* card */}
       {data.map((el)=>{
      //  console.log(el)
      return (
        <div className="card">
        {/* card header */}
        <div className="card-header">

          <div className="card-pic">
            <img src={el.photo} 
            alt="" />
          </div>
          <h5>
            <Link to={`/profile/${el.postedBy}`}>
              {el.userName}
            </Link>
          </h5>
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
      <p style={{fontWeight:"bold",cursor:"pointer"}} onClick={()=> toggleComments(el)}>View All Comment</p>
      </div>

      {/* add comment */}

     <div className="add-comment">
     <span className="material-symbols-outlined">mood</span>
     <input type="text" placeholder='Add a Comment' value={comment} onChange={(e)=>setComment(e.target.value)} />
     <button className='comment' onClick={()=>{
      makeComment(comment,item._id)
    
     }}>Post</button>
     </div>

      </div>
      )
       })}

      {/* show Comments */}
      { show && (
      <div className="showComment">
        <div className="container">
          <div className="postPic">
            <img src={item.photo}
             alt="" />
          </div>
          <div className="details">
          <div className="card-header" style={{borderBottom:"1px solid #000000029"}}>

<div className="card-pic">
<img src="http://res.cloudinary.com/omeshcloud/image/upload/v1681994572/tldh0uhj33dvf5rov9ys.jpg"
  alt="" />
</div>
<h5>{item.userName}</h5>
</div>

  {/* comment section */}
   <div className="comment-section" style={{borderBottom:"1px solid #000000029",overflow:"scroll"}}>
    {item.comments.map((element)=>{
     return  ( <p className='comm'>
      <span className='commenter' style={{fontWeight:"bolder"}}>{element.postedBy.name} </span>
      <span className='commentText'>{element.comment}</span>
    </p>)

    })}
   
 </div>
      {/* card content */}

      <div className="card-content">
       
      
      <p>{item.likes.length} Likes</p>
      <p>{item.body}</p>
      </div>

      {/* add comment */}

      <div className="add-comment">
     <span className="material-symbols-outlined">mood</span>
     <input type="text" placeholder='Add a Comment' value={comment} onChange={(e)=>setComment(e.target.value)} />
     <button className='comment' 
      onClick={()=>{
        makeComment(comment,item._id)
        toggleComments()
      }}
     >Post</button>
     </div>

   </div>
          </div>
          <div className="close-comment" onClick={()=>toggleComments()}>
          <span className="material-symbols-outlined material-symbols-outlined-comment"  >
close
</span>
          </div>
        </div> )

      }
      </div>

  )
}

export default Home