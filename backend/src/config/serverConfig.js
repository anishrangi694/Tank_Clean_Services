import dotenv from 'dotenv';

dotenv.config();

export const PORT= process.env.PORT;
export const MONGO_URL= process.env.MONGO_URL;
export const JWT_SECRET= process.env.JWT_SECRET;
export const JWT_EXPIRY= process.env.JWT_EXPIRY;
export const CLOUD_NAME=process.env.CLOUD_NAME;
export const CLOUD_API_SECRET= process.env.CLOUD_API_SECRET;
export const CLOUD_API_KEY= process.env.CLOUD_API_KEY;
export const RAZORPAY_API_KEY=process.env.RAZORPAY_API_KEY;
export const RAZORPAY_API_SECRET=process.env.RAZORPAY_API_SECRET;