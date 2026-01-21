import jwt from 'jsonwebtoken';

const adminauth = (req, res, next) => {
  try{
    const token=req.headers.token
    if(!token){
      return res.json({success:false,message:"unauthorized access"})
    }
    const token_decode=jwt.verify(token,process.env.JWT_SECRET);
    if(token_decode !==process.env.ADMIN_EMAIL+ process.env.ADMIN_PASSWORD){
      return res.json({success:false,message:"unauthorized access"})
    } 
    next(); 
  }
  catch(error){
    return res.json({success:false,message:"unauthorized access"});  
  }
}

export default adminauth;