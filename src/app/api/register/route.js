import { User } from "@/lib/database/models/user";
import { connectDB } from "@/lib/database/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
export async function POST(req) {
    try{
const {name,email,password}=await req.json();
await connectDB();
const hasedPassword=await bcrypt.hash(password,10);
await User.create({name,email,password:hasedPassword});
return NextResponse.json({msg:'new user created'},{status:201})
    }catch(error){
        return NextResponse.json({msg:'failed to create new user'},{status:500})

    }
    
}