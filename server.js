// function callback()
// {
//     console.log('server is running');

// }

// const add=function(a,b,callback)
// {
//     var r=a+b;
//     console.log(r);
//     callback();
// }
// add(4,8,callback);

// var fs=require('fs');
// var os= require('os');

// var user= os.userInfo();
// console.log(user.username);

// fs.appendFile('greeting.txt', 'Hi ' + user.username + '!\n',()=>{
//     console.log('file is created');
// });

// console.log(fs);
// var _=require('lodash');
// const notes= require('./notes');
// console.log('server file is available');

// var age=notes.age;
// console.log(age);
// console.log(notes.addnum(age+18,10));


// var data=["person","person",1,2,1,2,'name','age','2'];
// var filter=_.uniq(data);

// console.log(filter);

// console.log(_.isString(true));

// const jsonstring='{"name":"john","age":30}';
// const jsonobj= JSON.parse(jsonstring);
// console.log(jsonobj.name);


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
const PORT= process.env.PORT || 3000;

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