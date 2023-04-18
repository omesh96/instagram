// creating server by simple pure Node js

// const http=require("http");  

// const server=http.createServer((req,res) =>{
//    console.log("Server Created")
//    res.end("Working")
// })

// server.listen(5000,"localhost",()=>{
//     console.log("server is running at 5000")
// }) 

// now use express js

const express=require("express")
const app=express()
const PORT=5000;
const mongoose=require("mongoose");
const mongoURL = require("./keys");
const userRouter = require("./routes/auth.js");

app.use(express.json())

app.use("/user",userRouter)

  mongoose.connect(mongoURL)

  mongoose.connection.on("connected",()=>{ // connected same rahega double quote me
    console.log("Connected to Mongo Db")
  }) // check krne k lie ki data base server se connect hua ya nahi

  mongoose.connection.on("error",()=>{  // error bhi same rhega double quote me
    console.log("Not Connected to Mongo Db")
  }) // check krne k lie ki data base server se connect hua ya nahi


app.listen(PORT,()=>{
    console.log('server is running at http://localhost:'+PORT)
})