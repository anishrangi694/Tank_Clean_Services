import Payment from "../schema/paymentSchema.js"

export const createPaymentRepo= async (paymentDetails)=>{
    try{
        const payment= await Payment.create(paymentDetails);
        return payment;
    }catch(error){
        console.log("payament is not created at repo ")
        throw error;
    }
}

export  const getPaymentByIdRepo= async (paymentId)=>{
    try{
        const payment= await Payment.findById(paymentId);
        return payment;
    }catch(error){
        console.log("payment not get by paymentId at repo");
        throw error;
    }
}

export const getPaymentByReqRepo= async (requestId)=>{
    try{
        const payment= await Payment.findOne({request:requestId});
        return payment;
    }catch(error){
        console.log("payment not get by reqId at repo");
        throw error;
    }
}

export const getPaymentByRazorPayOrderIDRepo= async (orderId)=>{
    try{
        const payment= await Payment.findOne({razorpayOrderId:orderId});
        return payment;
    }catch(error){
        console.log("payment not get by OrderId at repo");
        throw error;
    }
}

export const updatePaymentByIdRepo = async (paymentId, data) => {
    try {
        const payment = await Payment.findByIdAndUpdate(
            paymentId,
            data,
            {
                returnDocument: "after"
            }
        );

        return payment;
    } catch (error) {
        console.log("payment not updated by paymentId at repo");
        throw error;
    }
};

export const updatePaymentByRazorpayOrderIdRepo = async (orderId, data) => {
    try {
        const payment = await Payment.findOneAndUpdate(
            { razorpayOrderId: orderId },
            data,
            {
                returnDocument: "after"
            }
        );

        return payment;

    } catch (error) {
        console.log("payment not updated by Razorpay orderId at repo");
        console.log(error);
        throw error;
    }
};