const jwt= require('jsonwebtoken');

const jwtAuthMiddleware=(req,res,next)=>{
    //Check if there is authorization or not
    const authorization=req.headers.authorization;
    if(!authorization) return res.status(401).json({error:"Token not found"});

    //Extract token from request headers
    const token=req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({error:"Unauthorized"});
    }
    try{
        //Verify JWT token
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        //Attach user information to take the request object
        req.user=decoded;
        next();
    }catch(err){
        console.error(err);
        res.status(401).json({error:"Invalid Token"});
    }
}
//Function to generate token
const generateToken=(userData)=>{

    return jwt.sign(userData,process.env.JWT_SECRET);
}

module.exports={jwtAuthMiddleware,generateToken}