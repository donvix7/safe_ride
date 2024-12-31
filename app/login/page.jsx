"use client"
import Link from 'next/link'
import React from 'react'

const page = () => {

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted')
  }


  return (
    <div className='bg-blue-950 text-white py-10 px-4 h-screen bg-cover bg-no-repeat bg-center bg-fixed'   style={{backgroundImage: `url("/wallpaper2.jpg")`}}>
        <div className='flex flex-col justify-center items-center gap-4'>
            <h1 className='text-center font-bold text-2xl'>Login here</h1>
            <p className='font-bold text-sm text-gray-300'>Welcome back you've been missed!</p>
        </div>
        <form action="" onSubmit={handleSubmit} className='form flex flex-col justify-center max-w-lg mx-auto mt-10  gap-4 p-4'>
            <input type="text"
             className='form-control text-black' 
             placeholder="email" />
            <input type="password"
             className='form-control text-black' 
             placeholder="password" />
            <button type='submit' className=' bg-yellow-500 text-white font-bold py-2 px-20 rounded-lg'>Sign in</button>
            <Link href='/createAccount'className='text-gray-300 font-bold text-sm hover:text-green-500'>Create new account</Link>
        
        </form>
    </div>
  )
}

export default page