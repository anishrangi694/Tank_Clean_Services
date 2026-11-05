import { addUser, getUserDetails, loginUserService, forgotPasswordService, resetPasswordService } from "../service/userService.js"

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

export const logoutUser= async (req,res)=>{
    try{
        res.clearCookie("authToken",{
            httpOnly:true,
            secure:false
        });

        res.status(201).json({
            message:"logout successfully from account",
            error:{},
            success:true
        })
    }catch(error){
        res.status(401).json({
            message:"user not logged Out",
            error:error.message,
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

export const forgotPassword= async (req,res)=>{
    try{
        await forgotPasswordService(req.body.email);

        // same response whether or not the email exists
        res.status(200).json({
            message:"If an account with that email exists, a reset link has been sent",
            data:{},
            error:{},
            success:true
        })
    }catch(error){
        console.log('forgot password error',error);
        res.status(500).json({
            message:"could not send reset email",
            data:{},
            error:{},
            success:false
        })
    }
}

export const resetPassword= async (req,res)=>{
    try{
        await resetPasswordService(req.params.token, req.body.password);

        res.status(200).json({
            message:"password reset successfully",
            data:{},
            error:{},
            success:true
        })
    }catch(error){
        res.status(400).json({
            message:Array.isArray(error)?error[0]:"password not reset",
            data:{},
            error:error,
            success:false
        })
    }
}