
 const express=require("express")
 const userRouter=express.Router()
 const mongoose=require("mongoose")
 const bcrypt=require("bcrypt")
const { UserModel } = require("../models/model.js")


 userRouter.get("/",(req,res)=>{
   
    res.send("Helow")
 })

 userRouter.post("/signup",(req,res)=>{
  const {name,userName,email,password}=req.body

  if(!name || !userName || !email || !password){
    res.status(422).json({error:"Please Add All The Fields"})
  }

  UserModel.findOne({$or:[{email},{userName}]}).then((savedUser)=>{
    if(savedUser){
        return res.status(422).json({error:"User Already Exists with email or username"})
    }

    bcrypt.hash(password,5).then((hashedPassword)=>{
        const user= new UserModel({
            name,
            email,
            userName,
            password:hashedPassword
           })
        
           user.save()
           .then(user=> {res.json({msg:"User SignUp Successfull"})})
           .catch(err=> {console.log(err)})
         })
    })
   
    
  })

   
 module.exports=userRouter