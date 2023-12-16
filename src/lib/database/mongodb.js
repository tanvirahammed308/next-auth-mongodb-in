import mongoose from "mongoose";

export const connectDB=async()=>{
    try{
await mongoose.connect(process.env.MONGO_URL);
console.log('connected to the mongodb');
    }catch(error){
console.log('failed to connect mongodb');
    }
}