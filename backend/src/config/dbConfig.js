import mongoose from 'mongoose';
import { MONGO_URL } from './serverConfig.js';

export const connectDB= async ()=>{
    try{
        await mongoose.connect(MONGO_URL);
        console.log('database connected successfully');
    }catch(error){
        console.log('database not connected');
        throw error;
    }
}