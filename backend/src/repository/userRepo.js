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
        const user= await User.create(userDetails);
        return user;
    }catch(error){
        console.log("user not created at repo layer",error);
    }
}

export const saveResetTokenRepo= async (userId, hashedToken, expires)=>{
    return await User.updateOne(
        {_id:userId},
        {$set:{resetPasswordToken:hashedToken, resetPasswordExpires:expires}}
    );
}

export const findUserByResetTokenRepo= async (hashedToken)=>{
    return await User.findOne({
        resetPasswordToken:hashedToken,
        resetPasswordExpires:{$gt:Date.now()}
    }).select('+resetPasswordToken +resetPasswordExpires');
}

export const findUserByIdRepo= async (id)=>{
    return await User.findById(id);
}