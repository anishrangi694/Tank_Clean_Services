import User from "../schema/userSchema.js"

export const findUserRepo= async (email)=>{
    try{
        const user= await User.findOne({email});
        return user;
    }catch(error){
        console.log('user not find at repo',error);
    }
}

export const addUserRepo= async (userDetails)=>{
    try{
        console.log(userDetails)
        const user= await User.create(userDetails);
        console.log("user is:",user)
        return user;
    }catch(error){
        console.log("user not created at repo layer",error);
    }
}