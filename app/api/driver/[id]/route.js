import Driver from "@/models/driver";
import Post from "@/models/post";
import connectToDb from "@/utils/connection";
import { NextResponse } from "next/server";


export async function PUT(request, {params}) {
    const {id} = params;
    const{newPlateNumber: plateNumber, newCar: car, newRoute: route, newDriver: driver } = await request.json();

    try {
        await connectToDb();
        await Driver.findByIdAndUpdate(id, {plateNumber, car,  route, driver});
        return NextResponse.json({message: "Driver updated"}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error updating driver", error: error.message}, {status: 500});
    }
}

export async function GET(request, {params}) {
    const {id} = params;
    await connectToDb();
    const driver = await Driver.findOne({plateNumber:id});
    return NextResponse.json({driver}, {status:200})
}


export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectToDb();
    const post = await Post.findOne({_id:id});
    console.log(post);

    await Post.findByIdAndDelete(id);

    return NextResponse.json({message: "Post deleted"}, {status:200});
}
