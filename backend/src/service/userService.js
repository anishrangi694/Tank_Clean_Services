import { addUserRepo, findUserRepo } from "../repository/userRepo.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { JWT_EXPIRY, JWT_SECRET } from "../config/serverConfig.js";

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