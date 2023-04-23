import React, { useEffect, useRef, useState } from 'react'
import "../css/ProfilePic.css"

const ProfilePic = ({changeProfile}) => {
    const hiddenFileInput=useRef(null)
    const [image,setImage]=useState("")
    const [url,setUrl]=useState("")

    const postDetails=()=>{
      
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

     const postPic=()=>{
        
            fetch("http://localhost:5000/profile/uploadprofilepic",{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+ localStorage.getItem("token")
                },
                body:JSON.stringify({
                    photo:url
                    })
            }).then(res=>res.json())
            .then(data=> {
                 console.log(data)
                 changeProfile()
                 window.location.reload()
        })
            .catch(err=> console.log(err))
         
     }

     useEffect(()=>{
        if(image){
            postDetails()

        }
     },[image])

    const handleClick=()=>{
    hiddenFileInput.current.click()
    }

     useEffect(()=>{
 if(url){
    postPic()
 }
     },[url])
  return (
    <div className='profilePic darkBg'>
 <div className="changePic centered">
    <div>
        <h2>Change Profile Photo</h2>
    </div>
    <div style={{borderTop:"1px solid #00000030"}}>
        <button className='upload-btn' style={{color:"#1EA1F7"}} onClick={()=>handleClick()}>Upload Photo</button>
        <input type="file" ref={hiddenFileInput} accept='image/*' style={{display:"none"}}
         onChange={(e)=>setImage(e.target.files[0])} 
         />
    </div>
    <div style={{borderTop:"1px solid #00000030"}}>
        <button className='upload-btn' style={{color:"#ED4956"}}
         onClick={()=>{
            setUrl(null)
            postPic()
         }}
        >Remove Current Photo</button>
    </div>
    <div style={{borderTop:"1px solid #00000030"}}>
        <button style={{background:"none",border:"none",cursor:"pointer",fontSize:"15px"}}
        onClick={changeProfile}
        >Cancel</button>
    </div>
 </div>
    </div>
  )
}

export default ProfilePic