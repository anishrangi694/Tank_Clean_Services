import { getPaymentByReqService, verifyBookingPaymentService } from "../service/paymentService.js";

export const verifyBookingPayment= async (req,res)=>{
    try{
        const {razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentId }= req.body;

        const response= await verifyBookingPaymentService({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            paymentId
        });

        res.status(200).json({
            message:"booking confirmed successfully",
            data:response,
            error:{},
            success:true
        })
    }catch(error){
        res.status(400).json({
            message:"booking verification failed",
            data:{},
            error:error.message,
            sucess:false
        })
    }
}



export  const getPaymentByRequest= async (req,res)=>{
    try{
        const payment= await getPaymentByReqService(req.params.requestId);

        res.status(200).json({
            message: "payment fetched successfully",
            data: payment,
            error: {},
            success: true
        });
    } catch (error) {
        res.status(404).json({
            message: "payment not fetched",
            data: {},
            error: error.message,
            success: false
        });
    }
}