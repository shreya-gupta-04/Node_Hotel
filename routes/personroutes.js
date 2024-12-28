const express=require('express');
const router=express.Router();
const person= require('./../models/person');
const {jwtAuthMiddleware,generateToken}=require('./../jwt');


router.post('/signup', async (req, res)=>{
    try{
      const data = req.body//assuming the request body contains the person data
  
      //creata a new person document using the Mongoose model
      const newPerson=new person(data);
    
      //save the person document to the database
      const response=await newPerson.save();
      console.log("data saved");

      const payload={
        id:response.id,
        username:response.username
      }
      console.log(JSON.stringify(payload));
      const token=generateToken(payload);
      console.log('Token is:',token);

      res.status(200).json({response:response,token:token});

    
    }
  catch(err)
  {
  console.log(err);
  res.status(500).json(err);
  }
    
  });

  //Login route
  router.post('/login',async(req,res)=>{
    try{
      //Extract username and password
      const {username,password}=req.body;

      //Find user by username
      const user=await person.findOne({username: username});

      //If username not found or sword doesnot exist
      if(!user || !(await user.comparePassword(password))){
        return res.status(401).json({error:"Invalid username or password"});
       }
         //Generate tokens
         const payload={
          id:user.id,
          username:user.username
        }
        const token=generateToken(payload);
        //return token as response 
        res.json({token});
     }catch(err){
      console.error(err);
      res.status(500).json({error:"Internal server error"});
     }
    });
// PROFILE ROUTE
router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
  try{
    const userData=req.user;
    console.log(userData);

    const userId=userData.id;
    const user=await person.findById(userId);

    res.status(500).json({user});
  }catch(err){
    console.error(err);
    res.status(500).json({error:"Internal server error"});
  }
})
//GET
router.get('/',jwtAuthMiddleware, async (req, res)=>{
    try{
      const data = await person.find();
  
      console.log('data Fetched');
      res.status(200).json(data);
    }
  catch(err)
  {
  console.log(err);
  res.status(500).json({error:"Internal server error"});
  }
    
  })

  router.get('/:work',async (req,res)=>{
    try{
      const work= req.params.work;
      if(work=='chef'|| work=='waiter'|| work=='manager') 
      {
        const response= await person.find({work:work});
        res.status(200).json(response);
      }
      else{
        res.status(404).json({error:"Invalid work type"});
      }
    }
    catch(err)
    {
      console.log(err);
      res.status(500).json({error:"Internal server error"});
      }
  })
  router.put('/:id',async(req,res)=>{
    try{
        const personid=req.params.id;
        const updatedata=req.body;

        const response=await person.findByIdAndUpdate(personid,updatedata,{
            new:true,
            runValidators:true
        });

        if(!response)
        {
            return res.status(404).json({error:"Person not found"});
        }
        console.log("data updated");
        res.status(200).json(response);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
  })
 module.exports=router;