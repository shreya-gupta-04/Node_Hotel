const mongoose= require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");

//define the person schema
const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        required:true,
        type:String,
    },
    password:{
        required:true,
        type:String,
    }
});

  personSchema.pre('save',async function (next) {//next-> db mein save krdo
    const person=this;
     // hash the password only if modified
    if(!person.isModified('password')) return next();
    try{
         // hash password generation
        const salt=await bcrypt.genSalt(10);
        // override the plain password with hashed password
        person.password=await bcrypt.hash(person.password,salt);
    }catch(err){
       return next(err);
    }
  });
  personSchema.methods.comparePassword=async function (candidatePassword) {
    try{
        // use bcrypt to compare password provided with hashed password
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
  };

  // shreya----> nfhbehuswhwuwjnduue
  // login-----> gupta
  // nfhbehuswhwuwjnduue-----> extract salt
  // salt+ gupta-----> hash -----> ndhufhejdoekwojduwhd

//create person model
const Person= mongoose.model('Person',personSchema);

module.exports=Person;