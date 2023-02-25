
const express=require('express');
const cors=require('cors')
const { connection } = require('./config/db');
const { UserRout } = require('./routes/user.routes');
const app=express();
app.use(cors)
app.use(express.json());
app.use("/api",UserRout)

app.listen(3001,async()=>{
try{
    await connection;
    console.log('Data base connected')

}catch(err){
    console.log('Database not connnected')
    console.log(err)
}
console.log('Port is running on 3001')
})