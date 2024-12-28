import User from "@/models/user";
import connectToDb from "@/utils/connection";
import { NextResponse } from "next/server";

export async function PUT(request, {params}) {
    const {id} = params;
    const{newName: name, newEmail: email, newPhone: phone, newPassword: password, newGender: gender, newDateOfBirth: dateOfBirth} = await request.json();

    try {
        await connectToDb();
        await User.findByIdAndUpdate(id, {name, phone, email, password, gender, dateOfBirth});
        return NextResponse.json({message: "Profile updated"}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error updating profile", error: error.message}, {status: 500});
    }
}

export async function GET(request, {params}) {

    const {id} = params;

    try {

        await connectToDb();
        const user = await User.findOne({email: id});
        if (!user) {
            return NextResponse.json({message: "User not found"}, {status: 404});
        }
        return NextResponse.json({user}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error fetching user", error: error.message}, {status: 500});
    }
}
export async function DELETE(request, { params }) {
    const { id } = params;
    await connectToDb();
    try {
        const result = await User.findByIdAndDelete(id);
        if (!result) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        await User.findByIdAndDelete(id);

        return NextResponse.json({ message: "User deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error deleting user", error: error.message }, { status: 500 });
    }
}
