const express=require('express');
const router=express.Router();
const person= require('./../models/person');

router.post('/', async (req, res)=>{
    try{
      const data = req.body//assuming the request body contains the person data
  
      //creata a new person document using the Mongoose model
      const newPerson=new person(data);
    
      //save the person document to the database
      const response=await newPerson.save();
      console.log("data saved");
      res.status(200).json(response);
    }
  catch(err)
  {
  console.log(err);
  res.status(500).json(err);
  }
    
  });
  //GET
router.get('/', async (req, res)=>{
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