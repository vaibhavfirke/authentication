const { UserModel } = require("../model/user.model")
const express =require('express')
const UserRout=express.Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const { authenticate } = require("../middlevare/authenticate.middleware");

UserRout.get('/getProfile',authenticate,async(req,res)=>{
   const {userID}=req.body;
   
    const user= await UserModel.find({_id:userID});
    if(user.length>0){

        res.send(user)
    }else{
        res.send({"msg":"User Details Not Found !!"})
    }
})

UserRout.post("/register",async(req,res)=>{
const {Profile,Name,Email,Password,Bio,Phone}=req.body;
const user= await UserModel.find({Email});
if(user.length<=0){
   try{
bcrypt.hash(Password,7,async(err,hash)=>{
    const userDetails=new UserModel({Profile,Name,Email,Bio,Phone,Password:hash});
    await userDetails.save();
    res.send("User Registerd Sucessfull !");
})


   }catch(err){
    
    res.send({"err":err})
   }

}else{
    res.send({"msg":"user allready Exists!!"})
}


});

UserRout.post("/login",async(req,res)=>{
    const {Email,Password}=req.body;
    try{
        const user= await UserModel.find({Email});
        const user_id=user[0]._id;
        if(user.length>0){
            bcrypt.compare(Password,user[0].Password,function (err,data){
             if(data){
                const token=jwt.sign({userID:user_id},"masai");
              
                res.send({msg:"Login Successfull",token:token});
             }else{
                res.send("Wrong Password !")
             }
            })

        }else{
            res.send({"err":"Wrong credentials !!"})
        }

    }catch(err){
        res.send({"err":err})
    }
})

UserRout.patch("/updateProfile/:id",async(req,res)=>{
    const ID=req.params.id;
    const {Profile,Name,Email,Password,Bio,Phone}=req.body;
    const user= await UserModel.find({_id:ID});
    try{
        bcrypt.hash(Password,7,async(err,hash)=>{
            await UserModel.findByIdAndUpdate({_id:ID},{Profile,Name,Email,Bio,Phone,Password:hash});
            
            res.send({"msg":"User Updated Sucessfull !"});
        })
        

       

    }catch(err){
        res.send(err)
    }
})
module.exports={UserRout}

// "Profile":"https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-260nw-1714666150.jpg",
// "Name":"Vaibhav Firke",
// "Phone":1254789653,
// "Email":"Vaibhav1@gmail.com",
// "Password":"vaibhav123",
// "Bio":"full stack web developer"