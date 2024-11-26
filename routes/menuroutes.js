const express=require('express');
const router=express.Router();
const menu= require('./../models/menu');

//POST 
router.post('/',async (req,res)=>{
    try{
      const data=req.body;
      const newMenu=new menu(data);
      const response=await newMenu.save();
      console.log("data saved");
      res.status(200).json(response);
    }
    catch(err)
    {
      console.log(err);
      res.status(500).json(err);
    }
  });
  router.get('/',async (req,res)=>{
    try{
      const data=await menu.find();
      console.log("data fetched");
      res.status(200).json(data);
    }
    catch(err)
    {
      console.log(err);
      res.status(500).json({error:"Internal server error"});
    }
  })
  
 router.get('/:type',async (req,res)=>{
     try{
        const type= req.params.type;
        if(type=='Veg'|| type=='Non-Veg'){
            const response= await menu.find({type:type});
            res.status(200).json(response);
        }
        else{
            console.log("Invalid Type");
            res.status(404).json({error:"Invalid Type"});
        }
     }
     catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
     }
        })
        module.exports=router;
        