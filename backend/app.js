const express=require("express");

const router = require('./Routes/main-routes')

const  mongoose  = require("mongoose");
const app=express();
require('dotenv').config();

app.use(express.json());


app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,PATCH,DELETE");
    res.setHeader("Access-Control-Allow-Headers","Content-Type,authorization");
    next();
})

app.use(router);

// mongoose.connect("mongodb://127.0.0.1:27017/taskmanagement").then((connected)=>{
//     console.log("Mongodb connected successfully");
// }).catch((err)=>{
//     console.log("error in mongodb connection",err);
// })

mongoose.connect(`${process.env.ATLAS_URL}`).then((connected)=>{
    console.log("Mongodb connected successfully");
}).catch((err)=>{
    console.log("error in mongodb connection",err);
})

const port = process.env.PORT
app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
})