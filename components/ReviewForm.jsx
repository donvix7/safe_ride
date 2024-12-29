"use client";

import { useEffect, useState } from "react";
import { FaAngleDoubleRight, FaList } from "react-icons/fa";

export default function ReviewForm({id}) {
    const [review, setReview] = useState("");
    const [showReview, setShowReview] = useState(false);
    const [reviews, setReviews] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/api/driver/${id}/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                review,
            }),
        });
        const data = await response.json();
        console.log(data);
    };

    const getReviews = async () => {
        const response = await fetch(`http://localhost:3000/api/driver/${id}/reviews`);
        const data = await response.json();
        setReviews(data);
    };

    useEffect(() => {
        getReviews();
    }, [review]);

  return <div className="flex flex-col gap-4">
    <form onSubmit={handleSubmit} className="form flex flex-col gap-4">
                    <textarea
                    value={review}
                     onChange={(e) => setReview(e.target.value)}
                     placeholder="Write an honest review" className="text-black form-control rounded-lg p-4 w-full"></textarea>

                    <button type="submit" className="bg-yellow-500 flex gap-2 items-center rounded-lg py-4 px-8 font-bold text-white align-self-left w-fit">Send Review<FaAngleDoubleRight className='icons' size={20} /></button>

                    </form>

                    <button 
                    onClick={() => {setShowReview(!showReview)}}
                    className="bg-yellow-500 flex gap-2 items-center rounded-lg py-4 px-8 font-bold text-white w-fit mx-auto">View Reviews<FaList className='icons' size={20} /></button>
  
                    <>
    {
        showReview? (
            

            <div className="bg-white text-black p-4 rounded-lg flex flex-col gap-4">
                {reviews.map((review) => (
                    <div key={review._id} className="flex flex-col gap-4">
                        <h2 className="text-xl font-bold">{review.driverName}</h2>
                        <p className="text-gray-500">{review.review}</p>
                    </div>
                ))}
            </div>
        ) : (

            <div>
                <p>Click button to view reviews</p>
            </div>

        )
    }

    </>
  
  </div>;
}