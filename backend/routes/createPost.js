const express=require("express")
const postRouter=express.Router()
const mongoose=require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const { PostModel } = require("../models/Post");
const POST=mongoose.model("InstaPost")

// get post //

 postRouter.get("/allposts",requireLogin,(req,res)=>{
 PostModel.find()
  .populate("postedBy", "_id name Photo") // error aa rha hai 
 .populate("comments.postedBy", "_id name")
 .sort("-createdAt")
 .then(posts=> res.json(posts))
 .catch(err=> console.log(err))
 })

 // add posts //
postRouter.post("/create",requireLogin, (req,res)=>{
    const {body,photo}=req.body;
    console.log(photo)
    if(!photo || !body){
        return res.status(422).json({error:"Please Add All the fields...!"})
    }
    console.log("user",req.user)
   const post=new PostModel({
    photo,
    body,
    postedBy:req.user._id,
    userName:req.user.name
   })
   post.save().then((result)=>{
    return res.status(200).json({post:result,msg:"Post Posted Successfully...!"})
   })
   .catch(err=> console.log(err))
})

postRouter.get("/myposts",requireLogin,(req,res)=>{
  // console.log(req.user)
  PostModel.find({postedBy:req.user._id})
  .populate("comments.postedBy", "_id name")
  .sort("-createdAt")
  .then((myPosts)=>{
    res.status(200).json({myAllPosts:myPosts})
  })
})

postRouter.put("/like",requireLogin,(req,res)=>{
    PostModel.findByIdAndUpdate(req.body.postId,{  // uss post ki id jis pe like hua hai frontend se ayega
        $push:{likes:req.user._id}  // req.user._id middleware se aayega
    },{
        new:true  // taki pta chal jaye ki jo update hai wo new hai
    }).populate("postedBy", "_id name Photo")
    .then((result,err)=>{  
        if(err){
            return res.status(422).json({error:err})
        } else{
            res.json(result)
        }
    }).catch((err) => {
        console.log(err)
      });
})

postRouter.put("/unlike",requireLogin,(req,res)=>{
    PostModel.findByIdAndUpdate(req.body.postId,{  // uss post ki id jis pe unlike hua hai
        $pull:{likes:req.user._id}  // req.user._id middleware se aayega
    },{
        new:true  // taki pta chal jaye ki jo update hai wo new hai
    }).populate("postedBy", "_id name Photo")
    .then((result,err)=>{  
        if(err){
            return res.status(422).json({error:err})
        } else{
            res.json(result)
        }
    }).catch((err) => {
        console.log(err)
      });
})

postRouter.put("/comment",requireLogin,(req,res)=>{
    const comment={
        comment:req.body.text,
        postedBy:req.user._id
    }
    PostModel.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name Photo")
   
    .then((result,err)=>{  
        if(err){
            return res.status(422).json({error:err})
        } else{
            res.json(result)
        }
    }).catch((err) => {
        console.log(err)
      });
})

 // Delete Post //
postRouter.delete("/deletepost/:postId",requireLogin,async(req,res)=>{
    const id=req.params.postId
    // console.log(id)
   await PostModel.findById(id)
  //  .populate("postedBy", "_id")
    .then((post,err)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
     //  console.log(post.postedBy.toString(), req.user._id.toString())
        if(post.postedBy.toString()==req.user._id.toString()){
         // post.remove()
         PostModel.findByIdAndDelete(id)
          .then(result=> {
            return res.json({msg:"Successfully DELETED"})
          }).catch((err)=> {
           console.log(err)
          })
        } else{
            return res.status(422).json({msg:"You are not Authorised to delete This Post"})
        }
    })
    .catch((err) => {
        console.log(err)
      });
})


// to show following posts

postRouter.get("/myfollowingposts",requireLogin,(req,res)=>{
    PostModel.find({postedBy:{$in:req.user.following}})
   // .populate("postedBy","_id name")
   // .populate("comments.postedBy","_id name")
    .then(posts=>{
        return res.json(posts)
    })
    .catch(err=> console.log(err))
})
 

module.exports=postRouter