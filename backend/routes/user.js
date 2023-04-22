const express=require("express")
const mongoose=require("mongoose");
const { UserModel } = require("../models/model");
const { PostModel } = require("../models/Post");
const profileRouter=express.Router()

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




module.exports=profileRouter