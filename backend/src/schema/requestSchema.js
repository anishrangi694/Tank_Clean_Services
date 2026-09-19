import mongoose from 'mongoose';

const requestSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    tankType:{
        type:String,
        enum:["Water Tank", "Overhead Tank", "Underground Tank", "Septic Tank", "Other"],
        required:[true,'Tank type is required']
    },

    tankSize:{
        type:String,
        enum: ["Small", "Medium", "Large", "Extra Large"],
        required:[true,'Tank Size is required']
    },

    address:{
        type:String,
        required:[true,'address is required'],
        trim:true
    },

    contact:{
        type:String,
        trim:true,
        unique:false,
        match: [/^\d{10}$/, "Mobile number must be exactly 10 digits"],
    },

    preferredDate:{
        type:Date,
        required:[true, 'preferred date is required']
    },

    notes:{
        type:String,
        trim:true,
        maxlength:[300,"notes should in 300 words"]
    },

    image:{
        type:String,
        default:null
    },

    estimatePrice:{
        type:Number,
        default:0
    },

    status:{
        type:String,
        enum:["Pending","Confirmed", "In Progress", "Completed", "Cancelled"],
        default:"Pending"
    },

    adminNote:{
        type:String,
        trim:true,
        default:""
    },

    payment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Payment",
        default:null
    }

},{
    timestamps:true
})

const Request= mongoose.model("Request",requestSchema);

export default Request;