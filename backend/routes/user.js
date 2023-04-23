const express=require("express")
const mongoose=require("mongoose");
const { UserModel } = require("../models/model");
const { PostModel } = require("../models/Post");
const userRouter = require("./auth");
const requireLogin = require("../middlewares/requireLogin");
const profileRouter=express.Router()


// to get user profile //
profileRouter.get("/user/:id",(req,res)=>{
 const id=req.params.id
    UserModel.findById(id)
    .select("-password")   // password hatane k liye
    .then(user=>{
      PostModel.find({postedBy:id})
     // .populate("postedBy", "_id") 
      .then((post,err)=>{
       
        if(err){
            return res.status(422).json({error:err})
        }
         res.status(200).json({user,post})
      })
      .catch(err=>{
        return res.status(422).json({error:"User Not Found"})
      })

    })
})

// to follow user //

// profileRouter.put("/follow",requireLogin,(req,res)=>{
//     UserModel.findByIdAndUpdate(req.body.followId,{
//         $push:{follower:req.user._id}  // will come from middleware
//     },{
//         new:true
//     },(err,result)=>{
//        if(err){
//         return res.status(422).json({error:err})
//        }
//        UserModel.findByIdAndUpdate(req.user._id,{
//         $push:{following:req.body.followId}
//        },{
//         new:true
//        }).then(result=> res.json(result))
//        .catch(err=> {
//         return res.status(422).json({error:err})
//        })
//     })

// })

profileRouter.put("/follow",requireLogin,async(req,res)=>{  
  try{
 const f1=await UserModel.findByIdAndUpdate(req.body.followId,{
    $push:{followers:req.user._id}
 })
 if(f1){
   let f2=  await UserModel.findByIdAndUpdate(req.user._id,{
        $push:{following:req.body.followId}
     })
     res.json(f2)
 }
  }
  catch(err)
  {
      res.send({message : "Something went Wrong!"});
  }
})

// to Unfollow user //

// profileRouter.put("/unfollow",requireLogin,(req,res)=>{
//     UserModel.findByIdAndUpdate(req.body.followId,{
//         $pull:{follower:req.user._id}  // will come from middleware
//     },{
//         new:true
//     },(err,result)=>{
//        if(err){
//         return res.status(422).json({error:err})
//        }
//        UserModel.findByIdAndUpdate(req.user._id,{
//         $pull:{following:req.body.followId}
//        },{
//         new:true
//        }).then(result=> res.json(result))
//        .catch(err=> {
//         return res.status(422).json({error:err})
//        })
//     })

// })

profileRouter.put("/unfollow",requireLogin,async(req,res)=>{
    try{
   const f1=await UserModel.findByIdAndUpdate(req.body.followId,{
      $pull:{followers:req.user._id}
   })
   if(f1){
     let f2=  await UserModel.findByIdAndUpdate(req.user._id,{
          $pull:{following:req.body.followId}
       })
       res.json(f2)
   }
    }
    catch(err)
    {
        res.send({message : "Something went Wrong!"});
    }
  })
  

  // upload profile pic //

  profileRouter.put("/uploadprofilepic",requireLogin,async(req,res)=>{
  try{
    let updated= await UserModel.findByIdAndUpdate(req.user._id,{
      $set:{Photo:req.body.photo}  // k=jitni bar link dalnge purani wali overwrite ho jaygi push use nhi kr skte
    })
   // console.log(updated)
   res.json(updated)
  }
  catch(err){
      res.status(422).json({message : "Something went Wrong!"});
  }

  })




module.exports=profileRouter