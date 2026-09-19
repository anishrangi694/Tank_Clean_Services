import Razorpay from 'razorpay';
import { RAZORPAY_API_KEY, RAZORPAY_API_SECRET } from '../config/serverConfig.js';
import { getPaymentByReqRepo, updatePaymentByIdRepo } from '../repository/paymentRepo.js';
import { request } from 'express';

const razorpay= new Razorpay({
    key_id:RAZORPAY_API_KEY,
    key_secret:RAZORPAY_API_SECRET
})

// ---------- CREATE RAZORPAY ORDER ----------

export const createRazorpayOrder= async ({amount,receipt})=>{
    const order= await razorpay.orders.create({
        amount:amount*100,
        currency:"INR",
        receipt})
    
        return order;
}

//-----------Verify Signature--------

const verifySignature= (orderId,paymentId,signature)=>{
    const sign= orderId + "|" + paymentId;
    const expectedSign= crypto.createHmac("sha256",RAZORPAY_API_SECRET)
                              .update(sign)
                              .digest("hex");

    return signature===expectedSign;
}


//--------Verify Booking Payment---------

export const verifyBookingPaymentService= async (data)=>{
    const {razorpay_order_id, razorpay_payment_id,razorpay_signature,paymentId}= data;
    
    const isValid= verifySignature(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    );

    if(!isValid){
        await updatePaymentByIdRepo(paymentId,{paymentStatus:"Failed"});
        throw new Error("Invalid payment signature");
    }

    const payment= await updatePaymentByIdRepo(paymentId,{
        paymentStatus:"Paid",
        razorpayPaymentId:razorpay_payment_id,
        paidAt:new Date()
    });

    if(!payment){
        request.status="Confirmed";
        await request.save();
    }

    return payment;
}

export const getPaymentByReqService= async (reqId)=>{
    const payment= await getPaymentByReqRepo(reqId);
    if(!payment){
        throw new Error("payment not ffound in this request");
    }

    return payment;
}