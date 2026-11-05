import nodemailer from 'nodemailer';
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM } from '../config/serverConfig.js';

const transporter= nodemailer.createTransport({
    host:SMTP_HOST,
    port:Number(SMTP_PORT),
    secure:Number(SMTP_PORT)===465,
    auth:{
        user:SMTP_USER,
        pass:SMTP_PASS
    }
});

export const sendEmail= async ({to,subject,html,text})=>{
    // if SMTP is not configured (local dev), print the mail instead of failing
    if(!SMTP_HOST || !SMTP_USER || !SMTP_PASS){
        console.log('--- SMTP not configured, email not sent. Content: ---');
        console.log(`To: ${to}\nSubject: ${subject}\n${text}`);
        return;
    }

    await transporter.sendMail({from:MAIL_FROM,to,subject,html,text});
}

console.log('SMTP_USER:', SMTP_USER);
console.log('SMTP_PASS length:', SMTP_PASS?.length);