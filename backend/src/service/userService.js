import { addUserRepo, findUserRepo, saveResetTokenRepo, findUserByResetTokenRepo } from "../repository/userRepo.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import crypto from 'crypto';
import { sendEmail } from "../utils/sendEmail.js";
import { JWT_EXPIRY, JWT_SECRET, FRONTEND_URL } from "../config/serverConfig.js";

export const addUser= async (userDetails)=>{
    //1.check the user already exits 
    const user= await findUserRepo(userDetails.email);
    console.log(user)

    //2. if user exists throw an error
    if(user){
        throw ['user already exits'];
    }

    const newUser= await addUserRepo(userDetails);

    return newUser;
}

export const loginUserService= async (userDetails)=>{
    const user= await findUserRepo(userDetails.email);

    if(!user){
        throw ['user doesnt exits'];
    }

    const isValidate= await bcrypt.compare(userDetails.password,user.password);

    if(!isValidate){
        throw ['invalid password'];
    }

    const token= jwt.sign({email:user.email,role:user.role,id:user._id}, JWT_SECRET, {expiresIn:JWT_EXPIRY});

    return token;
}

export const getUserDetails= async (email)=>{
    const user= await findUserRepo(email);
    return user;
}

const hashToken= (token)=> crypto.createHash('sha256').update(token).digest('hex');

export const forgotPasswordService= async (email)=>{
    const user= await findUserRepo(email?.trim().toLowerCase());

    // do not reveal whether the email exists
    if(!user) return;

    const resetToken= crypto.randomBytes(32).toString('hex');
    const expires= new Date(Date.now()+15*60*1000); // 15 minutes

    // only the hash is stored in the db
    await saveResetTokenRepo(user._id, hashToken(resetToken), expires);

    const resetUrl= `${FRONTEND_URL}/reset-password/${resetToken}`;

    await sendEmail({
        to:user.email,
        subject:'Reset your password - Tank Clean Services',
        text:`Hi ${user.name},\n\nUse the link below to reset your password. It is valid for 15 minutes.\n${resetUrl}\n\nIf you did not request this, you can ignore this email.`,
        html:`<p>Hi ${user.name},</p><p>Click the button below to reset your password. This link is valid for <b>15 minutes</b>.</p><p><a href="${resetUrl}" style="background:#2563eb;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none">Reset Password</a></p><p>Or copy this link: ${resetUrl}</p><p>If you did not request this, you can ignore this email.</p>`
    });
}

export const resetPasswordService= async (token,newPassword)=>{
    if(!newPassword || newPassword.length<5){
        throw ['password should be atleat 5 characters'];
    }

    const user= await findUserByResetTokenRepo(hashToken(token));

    if(!user){
        throw ['reset link is invalid or has expired'];
    }

    user.password= newPassword; // hashed by the pre-save hook
    user.resetPasswordToken= undefined;
    user.resetPasswordExpires= undefined;
    await user.save();
}