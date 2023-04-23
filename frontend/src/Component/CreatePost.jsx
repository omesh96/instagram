import React, { useEffect, useState } from 'react'
import "../css/CreatePost.css"
import { toast } from 'react-toastify'
import { Link,useNavigate } from 'react-router-dom'


const CreatePost = () => {
     const [body,setBody]=useState("");
     const [image,setImage]=useState("")
     const [url,setUrl]=useState("")
     const navigate=useNavigate()

     const alertError=(msg)=> toast.error(msg)
     const alertSuccess=(msg)=>toast.success(msg)

     useEffect(()=>{
         // saving post to mongo Db 
         if(url){
            fetch("https://splendid-tan-beanie.cyclic.app/post/create",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+ localStorage.getItem("token")
                },
                body:JSON.stringify({
                    body,
                    photo:url
                })
            }).then(res=>res.json())
            .then(data=> {if(data.error){
                alertError(data.error)
            } else{
                alertSuccess("Successfully Posted...!")
                navigate("/")
            }
        })
            .catch(err=> console.log(err))
         }
         
     },[url])


      // posting image to cloudinary 
     const postDetails=()=>{
        console.log(body,image)
        const data=new FormData();
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","omeshcloud")
        fetch("https://api.cloudinary.com/v1_1/omeshcloud/image/upload",{
            method:"POST",
            body:data
        }).then(res=>res.json())
        .then((data)=> setUrl(data.url))
        .catch(err=> console.log(err))

       
     }

    const loadFile=(event)=>{
        var output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function() {
          URL.revokeObjectURL(output.src) // free memory
        }
    }
  return (
    <div className='createPost'>
        <div className="post-header">
            <h4 style={{margin:"3px auto"}}>Create New Post</h4>
            <button id='post-btn' onClick={()=>postDetails()}>Share</button>
        </div>
        {/* image preview */}
        <div className="main-div">
            <img id='output' src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png' />
            <input type="file" accept='image/*'  onChange={(event)=>{
                loadFile(event);
                setImage(event.target.files[0])
            }}  />
        </div>

         {/* details  */}
         <div className="details">
              <div className="card-header">
                <div className="card-pic">
                    <img src="https://images.unsplash.com/photo-1607283817061-bac25eeaefab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=804&q=80" 
                    alt="" />
                  
                </div>
                <h5>Omesh</h5>
              </div>
              <textarea value={body} onChange={(e)=>setBody(e.target.value)} type="text" placeholder='Write a Caption...'></textarea>
         </div>
    </div>
  )
}

export default CreatePost