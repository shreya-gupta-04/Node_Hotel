const express = require('express');
const app = express();
const connectDB=require('./db');  
require('dotenv').config();
const passport = require('./auth');


//connect to databas
connectDB().then(()=>{
  console.log('database connected');
  
});
const bodyParser=require('body-parser');//not needed
app.use(bodyParser.json());//req.body
const PORT= process.env.PORT || 3000;

//middleware Function
const logRequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request to: ${req.originalUrl}`);
    next();
}

app.use(logRequest);


app.use(passport.initialize());
const localauthmiddleware=passport.authenticate('local',{session:false});
app.get('/',localauthmiddleware,function (req, res) {
  res.send('Welcome to my hotel, How can i help you?')
});

//import the router file
const personroute= require('./routes/personroutes');
const menuroute=require('./routes/menuroutes');

//use route
app.use('/person',personroute);
app.use('/menu',menuroute);


app.listen(PORT,()=>{
  console.log('listening to port 3000');
});
// app.use('/',(req,res)=>{
//   //console.log(req);
//   console.log("request received");
//   res.send({
//     name:"apple",
//     color:"red"
//   });
// });