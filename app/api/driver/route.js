import Driver from "@/models/driver";
import connectToDb from "@/utils/connection";
import { NextResponse } from "next/server";

export async function POST(request) {
    const {plateNumber, pointA , pointB, model, driverName, driverContact, color, license} = await request.json();  
    await connectToDb();

    try {

        const newDriver = new Driver({plateNumber, license, route : {pointA : pointA, pointB : pointB}, car : {model : model, color : color}, driver:{name:driverName, contact:driverContact}});
        await newDriver.save();
        return NextResponse.json({message:"Driver added successfully"}, {status:201})
    
    }
    catch (error) {
        console.log(error);

        return NextResponse.json({message:error.message}, {status:400});

    }


}

export async function GET() {
    await connectToDb();
    const driver = await Driver.find();
    return NextResponse.json({driver})
}

export async function DELETE(request) {
    await connectToDb();

    try {
        const result = await Driver.deleteMany({});
        return NextResponse.json({message:"All Drivers deleted successfully"}, {status:200});
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({message:error.message}, {status:400});
    }
}

