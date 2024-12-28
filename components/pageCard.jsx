"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import TrackHistory from './trackHistory';

const PageCard = (

) => {
  const [plateNumber, setPlateNumber] = useState('');
  const router = useRouter();
  const { data: sessionData, status } = useSession(); // Destructure sessionData and status

  const handleClick = async () => {
    if (!plateNumber) {
      alert("Please enter a plate number.");


    }

    try {
      const res = await fetch(`http://localhost:3000/api/driver/${plateNumber}`);

      if (res.ok) {
        const data = await res.json();

        const id = sessionData.user.email;
        console.log(data); // Log the fetched data
        if(data) {
          const response = await fetch(`http://localhost:3000/api/user/${id}/trackHistory`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: data})
          });
        }
        router.push(`/driverProfile/${plateNumber}`);
      } else {
        alert("Ride not found");
        console.error('Fetch error:', res.status, res.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An error occurred while fetching the data.");
    }
  }
  if(status === 'loading') {
    return <div>Loading...</div>

  }
  else {
  return (
    <div className='flex flex-col gap-4  min-h-screen text-white text-sm bg-blue-950 bg-cover  bg-no-repeat bg-center' style={{ backgroundImage: `url("wallpaper2.jpg")` }}>
      <section className='bg-blue-800 rounded px-10 py-5'>
        <Link href={`/editProfile/${sessionData.user.email}`}>
          <Image src="/saferide.png" alt="logo" height={50} width={50} />
        </Link>
        <div className='p-5 flex flex-col gap-4 items-center justify-center w-full'>
          <h1 className="text-xl font-bold text-center">Welcome {sessionData.user.email}!</h1> {/* Include user's name in the welcome message */}
        </div>
        <div className='flex flex-col max-w-lg mx-auto items-center gap-4 p-10'>
          <div className='flex'>
            <h1 className="m-auto text-4xl font-bold p-5">Track your Ride</h1>
            <Image src="/safe.png" alt="car" height={200} width={200} />
          </div>
          <input
            type="text"
            className="form-control text-center text-black font-bold py-3 px-10 rounded text-lg"
            placeholder="Enter plate number"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
          />
          <button
            onClick={handleClick}
            className="bg-yellow-500 hover:bg-yellow-700 font-bold py-3 text-black px-10 rounded text-lg"
          >
            Track Now
          </button>
        </div>
      </section>
      <section className='p-10'>
        {sessionData.user.email}
        <h2 className='text-xl font-bold'>Track history</h2>
      </section>
    </div>
  )
}

}

export default PageCard;
