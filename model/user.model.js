const mongoose=require('mongoose');
const shema=mongoose.Schema({
Profile:String,
 Name:String,
 Bio:String,
 Phone:Number,
 Email:String,
 Password:String
})

const UserModel=mongoose.model("authusers",shema);
module.exports={UserModel}