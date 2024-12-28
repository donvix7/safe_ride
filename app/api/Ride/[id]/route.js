import Driver from "@/models/driver";
import User from "@/models/user";
import connectToDb from "@/utils/connectToDb";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {

    const {id} = params;

    try {

        await connectToDb();
        const ride = await Driver.findOne({_id: id});
        if (!ride) {
            return NextResponse.json({message: "Ride not found"}, {status: 404});
        }
        return NextResponse.json({ride}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error fetching ride", error: error.message}, {status: 500});
    }
}
