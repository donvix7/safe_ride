import Driver from "@/models/driver";
import connectToDb from "@/utils/connection";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
    const {id} = params;

    await connectToDb();

    const driver = await Driver.findOne({plateNumber:id});


    console.log(driver.review);

    if (!driver) {
        return NextResponse.json({message: "Driver not found"}, {status: 404});
    }

    // Ensure reviews exist
     var reviews = driver.review ;
    if (!reviews) {
        reviews = [];
    }
    return NextResponse.json({reviews}, {status:200});
}

export async function POST(request, {params}) {
    const {id} = params
    const {review} = await request.json();  

    console.log(review);
    await connectToDb();
    const driver = await Driver.findOne({plateNumber:id});
    // Check if the post exists and return an error if it does not
if (!driver) {
    return NextResponse.json({message: "Post not found"}, {status: 404});
}

// Validate the structure of the review object
if (!review) {
    return NextResponse.json({message: "A review with valid content is required"}, {status: 400});
}

// Initialize post.review as an array if it is not already
if (!Array.isArray(driver.review)) {
    driver.review = []; // Initialize it as an empty array
}

// Add the new review to the reviews array
driver.review.push(review);

try {
    const id = driver._id;
    await Driver.findByIdAndUpdate(id, {review: driver.review}); // Directly using post.review
    
    console.log(driver.review);
    
    // Return the updated reviews
    return NextResponse.json({message: "Review added", review: driver.review}, {status: 201});
} catch (error) {
    console.error("Error adding review:", error.message); // Log the error
    return NextResponse.json({message: "An error occurred while adding the review"}, {status: 500});
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
