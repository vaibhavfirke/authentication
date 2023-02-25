const { UserModel } = require("../model/user.model")
const express =require('express')
const UserRout=express.Router();

UserRout.get('/',(req,res)=>{
    res.send("hello")
})

UserRout.post("/register",(req,res)=>{
    
})

module.exports={UserRout}