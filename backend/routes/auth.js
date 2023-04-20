
 const express=require("express")
 const userRouter=express.Router()
 const mongoose=require("mongoose")
 const bcrypt=require("bcrypt")
 const jwt=require("jsonwebtoken")
const { UserModel } = require("../models/model.js")
const { jwt_secret } = require("../keys.js")
const requireLogin = require("../middlewares/requireLogin.js")


 userRouter.get("/",(req,res)=>{
   
    res.send("Helow")
 })

 userRouter.post("/signup",(req,res)=>{
  const {name,userName,email,password}=req.body

  if(!name || !userName || !email || !password){
  return   res.status(422).json({error:"Please Add All The Fields"})
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

   userRouter.post("/signin",(req,res)=>{
    const {email,password}=req.body

    if(!email || !password){
      return  res.status(422).json({error:"Please Add email and Password"})
    }

    UserModel.findOne({email}).then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid email"})
        }
        //  console.log(savedUser)
        bcrypt.compare(password,savedUser.password).then((match)=>{
            if(match){
                // return res.status(200).json({msg:"Login Successfull...!"})
                const token=jwt.sign({_id:savedUser._id},jwt_secret)
                const {_id,name,email,userName}=savedUser
              //  console.log(_id,name,email,userName)
             //   console.log(token)
             return res.status(200).json({msg:"Login Successfull...!",token:token,user:{_id,name,email,userName}})
            } else{
                return res.status(422).json({error:"Invalid password...!"})
            }
        })
        .catch(err=> console.log(err))
    })
   })

   
   
 module.exports=userRouter