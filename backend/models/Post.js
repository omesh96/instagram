 const mongoose=require("mongoose")
const { UserModel } = require("./model")
 const {ObjectId}=mongoose.Schema.Types

 const postSchema=new mongoose.Schema({
   
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    postedBy:{
        type:ObjectId,
        ref:"USER"
    },
    likes:[{
        type:ObjectId,
        ref:"InstaUser"  // same name hona chaiye jo model ka naam hai
    }],
    userName:{
        type:String,
        required:true
    }
 })

 const PostModel=mongoose.model("InstaPost",postSchema)

module.exports={PostModel}