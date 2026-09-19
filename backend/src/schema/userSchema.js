import mongoose  from "mongoose";
import bcrypt from 'bcrypt';

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:[3,'name must be atleat 3 character'],
        maxlength:[10,'name should be a within 10 character']
    },

    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    },

    mobileNumber:{
        type:String,
        unique:true,
        trim:true,
        match: [/^\d{10}$/, "Mobile number must be exactly 10 digits"],
    },

    password:{
        type:String,
        trim:true,
        required:true,
        minlength:[5,'password should be atleat 5 characters']
    },

    role:{
        type:String,
        enum:["User","Admin"],
        default:"User"
    }
},{
    timestamps:true
});

userSchema.pre('save',async function (){
    const hashedPassword= await bcrypt.hash(this.password,10);
    this.password=hashedPassword;
    
})

const User= mongoose.model("User",userSchema);

export default User;