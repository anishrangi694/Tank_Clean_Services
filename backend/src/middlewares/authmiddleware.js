import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/serverConfig.js';

export const isLoggedIn=  (req,res,next)=>{
    const token= req.cookies.authToken;

    if(!token){
        res.status(401).json({
            message:'please login first',
            success:false,
        })
    }

    const decoded=  jwt.verify(token, JWT_SECRET );

    req.user=decoded;

    next();
}

export const isAdmin= (req,res,next)=>{
    if(req.user && req.user.role==='Admin'){
       return next()
    }

    return res.status(403).json({
        message:'Access denied:you are not a admin',
        error:{},
        data:{},
        success:false
    })
}