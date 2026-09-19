import Request from "../schema/requestSchema.js"

export const createReqRepo= async (reqDetails)=>{

    try{
        console.log(reqDetails);
        const request= await Request.create(reqDetails);
        return request;
    }catch(error){
        console.log('request not created at repo',error);
    }
}

export const getMyReqRepo= async (userId)=>{
    try{
        const request= await Request.find({user:userId});
        return request;
    }catch(error){
        console.log("request is not fetched at repo layer");
        throw error;
    }
}

export const getRequestsRepo= async ()=>{
    try{
        const requests= await Request.find();
        return requests;
    }catch(error){
        throw error;
    }
}

export const updateStatusRepo= async (reqId,updates)=>{
    try{
        const requests= await Request.findByIdAndUpdate(reqId, updates, {new:true});
        return requests;
    }catch(error){
        console.log("status is not updated at repo layer");
        throw error;
    }
}

export const getRequestRepo= async (reqId)=>{
    try{
        const req= await Request.findById(reqId);
        return req;
    }catch(error){
        throw error;
    }
}

export const linkPaymentToReqRepo= async (reqId,paymentId)=>{
    try{
        const response= await Request.findByIdAndUpdate(reqId,{payment:paymentId},{new:true});
        return response;
    }catch(error){
        console.log("not link req to payment at repo");
        throw error;
    }
}