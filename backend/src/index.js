import express from 'express';
import cors from 'cors';
import { PORT } from './config/serverConfig.js';
import { connectDB } from './config/dbConfig.js';
import userRouter from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import reqRouter from './routes/requestRoute.js';
import paymentRouter from './routes/paymentRoute.js';

const app= express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/users',userRouter);
app.use('/requests',reqRouter);
app.use('/payments',paymentRouter);

app.listen(PORT,()=>{
    connectDB();
    console.log(`server started at port ${PORT}`);
    
});