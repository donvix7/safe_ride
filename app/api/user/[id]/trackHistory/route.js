import User from "@/models/user";
import connectToDb from "@/utils/connection";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
    const {id} = params;

    await connectToDb();

    const result = await User.findOne({email:id});

    console.log(result);

    const rides = result.tracked;
    console.log(rides);

    if (!rides) {
        return NextResponse.json({message: "Ride not found"}, {status: 404});
    }

    return NextResponse.json({rides}, {status:200});
}

export async function POST(request, {params}) {
    const {id} = params
    const {data} = await request.json();  
    await connectToDb();
    const user = await User.findOne({email:id});
    // Check if the post exists and return an error if it does not
if (!user) {
    return NextResponse.json({message: "User not found"}, {status: 404});
}

// Validate the structure of the review object
if (!data) {
    return NextResponse.json({message: "A data with valid content is required"}, {status: 400});
}

// Add the new review to the reviews array
user.tracked.push(data);

try {
    const id = user._id;
    await User.findByIdAndUpdate(id, {tracked: user.tracked}); // Directly using post.review
    
    console.log(user.tracked);
    
    // Return the updated reviews
    return NextResponse.json({message: "tracked ride added", tracked: user.tracked}, {status: 201});
} catch (error) {
    console.error("Error adding ride:", error.message); // Log the error
    return NextResponse.json({message: "An error occurred while adding the ride"}, {status: 500});
}

}



export async function DELETE(request, {params}) {

    const {id} = params;

    await connectToDb();

    const post = await Post.findOne({_id:id});

    post.review.shift();

    await Post.findByIdAndUpdate(id, {review: post.review});

    console.log(post.review);

    return NextResponse.json({message: "review deleted"}, {status:200});
}
