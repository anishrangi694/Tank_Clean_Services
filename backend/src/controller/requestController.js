import { createReqService, getMyReqService, getReqService, getRequestsService, updateStatusService } from "../service/requestService.js";

export const createRequest= async (req,res)=>{
    console.log("hitting controller")
    try{
        const imageUrl= req.file?.path;
        const response= await createReqService({
            user:req.user.id,
            tankType:req.body.tankType,
            tankSize:req.body.tankSize,
            address:req.body.address,
            contact:req.body.contact,
            preferredDate:req.body.preferredDate,
            notes:req.body.notes,
            image:imageUrl,
        })        

        res.status(201).json({
            message:"request is initiate successfully",
            data:response,
            error:{},
            success:true
        })
    }catch(error){
        res.status(500).json({
            message:"request is not initiated",
            data:{},
            error:error.message,
            success:false
        })
    }
}

export const getMyRequest= async (req,res)=>{
    try{
        const request= await getMyReqService(req.user.id);

        res.status(201).json({
            message:"request fetched successfully",
            data:request,
            error:{},
            success:true
        })
    }catch(error){
        res.status(201).json({
            message:"request not  fetched ",
            data:{},
            error:error,
            success:false
        })
    }
}

export const getRequests= async (req,res)=>{
    try{
        const request= await getRequestsService();

        res.status(201).json({
            message:"all requests fetched successfully",
            data:request,
            error:{},
            success:true
        })
    }catch(error){
        res.status(201).json({
            message:"requests not  fetched ",
            data:{},
            error:error,
            success:false
        })
    }
}

export const updateRequests= async (req,res)=>{
    try{
        const request= await updateStatusService(req.params.id,req.body);
        
        res.status(201).json({
            message:"request updated successfully",
            data:request,
            error:{},
            success:true
        })
    }catch(error){
        res.status(201).json({
            message:"request not  updated ",
            data:{},
            error:error,
            success:false
        })
    }
}

export const getRequest= async (req,res)=>{
    try{
        const request= await getReqService(req.params.id);

        res.status(201).json({
            message:" request fetched successfully",
            data:request,
            error:{},
            success:true
        })
    }catch(error){
        res.status(201).json({
            message:"request not  fetched ",
            data:{},
            error:error,
            success:false
        })
    }
}


export const getPricing= async (req,res)=>{
    try{
        const {tankType,tankSize}=req.query;
        const response= await getPricingService(tankType,tankSize);
        res.status(200).json({
            message:"pricing fetched successfully",
            data:response,
            error:{},
            success:true
        })
    }catch(error){
        res.status(500).json({
            message:"pricing not fetched",
            data:{},
            error:error,
            success:false
        })
    }
}