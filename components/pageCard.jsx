"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import TrackHistory from './trackHistory';
import {FaAngleDoubleRight, FaCar, FaGlobe, FaSearch, FaYoutube} from 'react-icons/fa';

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
    <div className='flex flex-col gap-4  min-h-screen text-white text-sm bg-blue-950 bg-cover bg-no-repeat bg-center bg-fixed'  style={{backgroundImage: `url("/wallpaper2.jpg")`}}>
      <section className=' rounded-lg px-10 py-5 backdrop-blur-xl bg-blue/30'>
        <Link href={`/editProfile/${sessionData.user.email}`} className='flex items-right  w-fit align-self-right'>
          <Image src="/saferide.png" alt="logo" height={50} width={50} className='rounded-full'/>
        </Link>
        <div className='p-5 flex flex-col gap-4 items-center justify-center w-full'>
          <h1 className="text-xl font-bold text-center">Welcome {sessionData.user.email}!</h1> {/* Include user's name in the welcome message */}
        </div>
        <div className='flex flex-col max-w-lg mx-auto items-center gap-4 p-10'>
          <div className='flex'>
            <h1 className="m-auto text-4xl font-bold p-5">Track your Ride</h1>
            <Image src="/safe.png" alt="car" height={200} width={200} />
          </div>
          <div className='flex align-center text-black gap-2 bg-white rounded-md p-2 w-fit'>
            <FaSearch className='icons' size={40} />
            <input
              type="text"
              className="form-control text-center text-black font-bold py-3 px-10 rounded text-lg"
              placeholder="Enter plate number "
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
            />
            <FaCar className='icons' size={40} />
          </div>
          <button
            onClick={handleClick}
            className="bg-yellow-500 hover:bg-yellow-700 font-bold py-3 text-black px-10 rounded text-lg flex items-center justify-center gap-2"
          >
            Track Now <FaAngleDoubleRight className='icons' size={20} />
          </button>
        </div>
      </section>
      <section className='p-10'>
        <h2 className='text-xl font-bold flex items-center gap-2'>Track history <FaGlobe className='icons' /></h2>
      </section>
    </div>
  )
}

}

export default PageCard;
