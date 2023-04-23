 const mongoose=require("mongoose")
 const {ObjectId}=mongoose.Schema.Types

 const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Photo:{
       type:String
       
    },
    followers:[{type:ObjectId,ref:"InstaUser"}],
    following:[{type:ObjectId,ref:"InstaUser"}]
 })

 const UserModel=mongoose.model("InstaUser",userSchema)

module.exports={UserModel}