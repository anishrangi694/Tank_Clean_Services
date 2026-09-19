import mongoose from "mongoose";

const paymentSchema= new mongoose.Schema({
    request:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Request",
        required:true
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },

    bookingFee:{
        type:Number,
        default:200,
        required:true
    },

    paymentStatus:{
        type:String,
        enum:["Pending","Paid","Failed"],
        default:"Pending"
    },

    razorpayOrderId: {
        type: String,
        default: null
    },

    razorpayPaymentId: {
        type: String,
        default: null
    },

    paidAt: {
        type: Date,
        default: null
    }
},{
    timestamps:true
})

const Payment= mongoose.model("Payment",paymentSchema);

export default Payment;