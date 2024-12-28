import Driver from "@/models/driver";
import Emergency from "@/models/Emergency";
import Post from "@/models/post";
import User from "@/models/user";
import connectToDb from "@/utils/connection";
import { NextResponse } from "next/server";


export async function POST(request) {
    const {user, plateNumber} = await request.json();  
    console.log(user, plateNumber)

    const driver = await Driver.findOne({plateNumber: plateNumber});

    await connectToDb();

    try {
            const newEmergency = new Emergency({user, driver});
        
            await newEmergency.save();
            return NextResponse.json({message:"Emergency added successfully"}, {status:201})
        
    }
    catch (error) {
        return NextResponse.json({message:error.message}, {status:400})
    }


}


export async function GET() {
    
    try {
        await connectToDb();
        const emergency = await Emergency.find();
        if (!emergency) {
            return NextResponse.json({message: "Emergency not found"}, {status: 404});
        }
        return NextResponse.json({emergency}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error fetching emergency", error: error.message}, {status: 500});
    }
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectToDb();
    const user = await User.findByIdAndDelete(id);
    if (!user) {
        return NextResponse.json({message: "User not found"}, {status: 404});
    }
    return NextResponse.json({message: "User deleted"}, {status: 200});
}
