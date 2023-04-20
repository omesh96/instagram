 
 const jwt=require("jsonwebtoken")
 const {jwt_secret}=require("../keys.js")
 const mongoose=require("mongoose")
const { UserModel } = require("../models/model.js")
 const User=mongoose.model("InstaUser")


 module.exports=(req,res,next)=>{
   const {authorization}=req.headers;
   if(!authorization){
    return res.status(422).json({error:"You must have looged in 1"})
   }
   const token=authorization.replace("Bearer ","") // Bearer aur space ko replace kreaga aur token ko variable me store kr lega
   jwt.verify(token,jwt_secret,(err,payload)=>{
    if(err){
        return res.status(401).json({error:"You must have looged in 2"})
    }
    const { _id }=payload
    UserModel.findById(_id).then((userData)=>{
       // console.log(userData);
        if(userData){
           // console.log("userData",userData)
            req.user=userData
            next()
        }
    })
   })
 }