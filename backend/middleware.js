const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require("./config");
const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer '))
    {
        return res.status(403).json({});
    }
    const token =authHeader.split(' ')[1];
    try{
        const decoded=jwt.verify(token,JWT_SECRET);
        // After decoding check that this user id exist 
            req.userId=decoded.userId;
            next();
    }
    catch(err)
    {
        return res.status(403).json({
            message:"Invalid or expired token"
        });
    }
}

module.exports={authMiddleware}