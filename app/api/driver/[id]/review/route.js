import Post from "@/models/posts";
import connectToDb from "@/utils/connectToDb";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
    const {id} = params;

    await connectToDb();

    const post = await Post.findOne({_id:id});


    console.log(post.review);

    if (!post) {
        return NextResponse.json({message: "Post not found"}, {status: 404});
    }

    // Ensure reviews exist
     var reviews = post.review ;
    if (!reviews) {
        reviews = [];
    }
    return NextResponse.json({reviews}, {status:200});
}

export async function POST(request, {params}) {
    const {id} = params
    const {review} = await request.json();  
    await connectToDb();
    const post = await Post.findOne({_id:id});
    // Check if the post exists and return an error if it does not
if (!post) {
    return NextResponse.json({message: "Post not found"}, {status: 404});
}

// Validate the structure of the review object
if (!review) {
    return NextResponse.json({message: "A review with valid content is required"}, {status: 400});
}

// Initialize post.review as an array if it is not already
if (!Array.isArray(post.review)) {
    post.review = []; // Initialize it as an empty array
}

// Add the new review to the reviews array
post.review.push(review);

try {
    await Post.findByIdAndUpdate(id, {review: post.review}); // Directly using post.review
    
    console.log(post.review);
    
    // Return the updated reviews
    return NextResponse.json({message: "Review added", review: post.review}, {status: 201});
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
