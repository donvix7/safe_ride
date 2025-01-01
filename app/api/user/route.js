import User from "@/models/user";
import connectToDb from "@/utils/connection";
import { NextResponse } from "next/server";

import bcrypt from 'bcrypt';

export async function POST(request) {
    const {email, password} = await request.json();  
    await connectToDb();

    try {

        const newUser = new User({email, password});
        await newUser.save();
        return NextResponse.json({message:"User added successfully"}, {status:201})
    
    }
    catch (error) {
        console.log(error);

        return NextResponse.json({message:error.message}, {status:400});

    }


}

export async function GET() {
    
    try {
        await connectToDb();
        const user = await User.find();
        if (!user) {
            return NextResponse.json({message: "User not found"}, {status: 404});
        }
        return NextResponse.json({user}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error fetching user", error: error.message}, {status: 500});
    }
}

export async function DELETE(request) {
   
    await connectToDb();
    try {
        const user = await User.find();

        if (!user) {
            return NextResponse.json({message: "User not found"}, {status: 404});
        }

        await User.deleteMany({});

        return NextResponse.json({message: "User deleted successfully"}, {status: 200});


    }
    catch (error) {
        return NextResponse.json({message: "Error deleting user", error: error.message}, {status: 500});
    }
}
