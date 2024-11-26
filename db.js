const mongoose= require('mongoose');

//define mongodb connection URL
//const mongoURL= process.env.MONGODB_URL_local;//Local URL
const mongoURL= process.env.MONGODB_URL;

// Setup mongodb connection
mongoose.connect(mongoURL,{
    //useNewUrlparser:true,
    //useUnifiedTopology:true
});

// Get the default connection
// mongoose maintains a default connection object representing the mongodb connection.
const db=mongoose.connection;

//define event listeners for database connection

db.on('connected',()=>{
     console.log('connected to mongodb server');
});

db.on('error',(err)=>{
    console.log(' Mongodb connection error');
});

db.on('disconnected',()=>{
    console.log('disconnected to mongodb server');
});

// export the database connection
module.exports = db;


