import { User } from "@/lib/database/models/user";
import { connectDB } from "@/lib/database/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try{

        const {email}=await req.json();
        await connectDB();
        const user=await User.findOne({email}).select('_id');
        return NextResponse.json({user})
    }catch(error){
return NextResponse.json(error)
    }
    
}