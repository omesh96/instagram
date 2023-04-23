import React from 'react'
import "../css/PostDetail.css"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const PostDetail = ({item,toggleDetails}) => {
    const navigate=useNavigate()

    const alertError=(msg)=> toast.error(msg)
    const alertSuccess=(msg)=>toast.success(msg)

     const removePost=(postId)=>{
       // console.log(postId)
       if(window.confirm("Do You Really want to Delete this Post ?")){
        fetch(`https://splendid-tan-beanie.cyclic.app/post/deletepost/${postId}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("token")
            }
         })
         .then((res)=>res.json())
         .then((result)=> {
            console.log(result)
            toggleDetails();
            alertSuccess(result.msg)
            navigate("/")
         })
         .catch((err)=>{
            alertError(err.msg)
         })
       }
        
     }
  return (
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
<div className="deletePost" onClick={()=>{removePost(item._id)}}>
<span className="material-symbols-outlined">
delete
</span>
</div>
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
     <input type="text" placeholder='Add a Comment' 
    //  value={comment} onChange={(e)=>setComment(e.target.value)} 
     />
     <button className='comment' 
    //   onClick={()=>{
    //     makeComment(comment,item._id)
    //     toggleComments()
    //   }}
     >Post</button>
     </div>

   </div>
          </div>
          <div className="close-comment" 
           onClick={()=>toggleDetails()}
          >
          <span className="material-symbols-outlined material-symbols-outlined-comment"  >
close
</span>
          </div>
        </div>
  )
}

export default PostDetail