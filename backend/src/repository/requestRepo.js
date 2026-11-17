import Request from "../schema/requestSchema.js"

export const createReqRepo= async (reqDetails)=>{

    try{
        console.log(reqDetails);
        const request= await Request.create(reqDetails);
        return request;
    }catch(error){
        console.log('request not created at repo',error);
        throw error;
    }
}

export const getMyReqRepo = async (userId) => {
  try {
    const request = await Request.find({ user: userId })
      .sort({ createdAt: -1 });

    return request;
  } catch (error) {
    console.log("request is not fetched at repo layer");
    throw error;
  }
};

export const getRequestsRepo = async () => {
  try {
    const requests = await Request.find()
      .populate("user", "name email mobileNumber")
      .sort({ createdAt: -1 });

    return requests;
  } catch (error) {
    throw error;
  }
};

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

// Completed jobs that are 6+ months old, still under the reminder cap, and whose
// last reminder was never sent or was sent 15+ days ago.
// Older records without completedAt fall back to updatedAt.
export const findServiceDueRequestsRepo= async (cutoffDate,gapDate,maxReminders)=>{
    return await Request.find({
        status:"Completed",
        serviceReminderCount:{$not:{$gte:maxReminders}},
        $and:[
            {$or:[
                {completedAt:{$lte:cutoffDate}},
                {completedAt:null, updatedAt:{$lte:cutoffDate}},
            ]},
            {$or:[
                {serviceDueNotifiedAt:null},
                {serviceDueNotifiedAt:{$lte:gapDate}},
            ]},
        ],
    });
}

// Atomically "claim" a reminder so two runs/instances can't both email it.
// Returns null if someone else already claimed it.
export const claimServiceDueRepo= async (reqId,gapDate,maxReminders)=>{
    return await Request.findOneAndUpdate(
        {
            _id:reqId,
            serviceReminderCount:{$not:{$gte:maxReminders}},
            $or:[
                {serviceDueNotifiedAt:null},
                {serviceDueNotifiedAt:{$lte:gapDate}},
            ],
        },
        {$set:{serviceDueNotifiedAt:new Date()}, $inc:{serviceReminderCount:1}},
        {new:true}
    );
}

// Email failed: undo the claim so the next run retries
export const releaseServiceDueClaimRepo= async (reqId,previousDate)=>{
    return await Request.updateOne(
        {_id:reqId},
        {$set:{serviceDueNotifiedAt:previousDate ?? null}, $inc:{serviceReminderCount:-1}}
    );
}

// Customer re-booked: stop all further reminders for this cleaning
export const stopServiceRemindersRepo= async (reqId,maxReminders)=>{
    return await Request.updateOne({_id:reqId},{$set:{serviceReminderCount:maxReminders}});
}

// Has the customer already booked this tank again after the last cleaning?
export const hasNewerBookingRepo= async (request)=>{
    const newer= await Request.exists({
        _id:{$ne:request._id},
        user:request.user,
        tankType:request.tankType,
        address:request.address,
        status:{$ne:"Cancelled"},
        createdAt:{$gt:request.completedAt || request.updatedAt},
    });
    return Boolean(newer);
}