import { addUser, getUserDetails, loginUserService } from "../service/userService.js"

export const registerUser= async (req,res)=>{
    try{
        const user= await addUser(req.body);

        res.status(201).json({
            message:"user created successfully",
            data:user,
            error:{},
            success:true
        })
    }catch(error){
        res.status(500).json({
            message:"user not created",
            data:{},
            error:error,
            success:false
        })
    }
}

export const loginUser= async(req,res)=>{
    try{
        const response= await loginUserService(req.body);

        res.cookie("authToken",response,{
            httpOnly:true,
            secure:false,
            maxAge:2*24*60*60*1000
        })

        res.status(201).json({
            message:'logged in successfully',
            data:{},
            error:{},
            success:true
        })

    }catch(error){
        res.status(500).json({
            message:'login failed',
            data:{},
            error:error,
            success:false
        })
    }
}

export const getUser= async(req,res)=>{
    try{
        const user= await getUserDetails(req.user.email);

        res.status(201).json({
            message:"successfully fetched the userDetails",
            data:user,
            error:{},
            success:true
        })
    }catch(error){
        res.status(401).json({
            message:"user profile not fetched",
            data:{},
            error:error,
            success:false
        })
    }
}