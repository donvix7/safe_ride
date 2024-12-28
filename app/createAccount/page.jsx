"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password!== confirmPassword){
            alert('Passwords do not match');
            return;
        }
        if(!email || !password || !confirmPassword){
            alert('Please fill all fields');
            return;
        }

        try{
            const response = await fetch('http://localhost:3000/api/user', {  
                method: 'POST',  
                headers: {  
                    'Content-Type': 'application/json'  
                },
                body: JSON.stringify({
                   email: email,
                   password: password,
                })
                
            });

            if(response.ok){
                alert('user added successfully');
                router.push('/api/auth/signin');
            }
            else{
                alert('Error adding vehicle');
            }
        }
        catch(error){
            console.log(error);
        }
      }


  return (
    <div className=' px-8 py-10 h-screen text-white text-sm bg-cover bg-no-repeat bg-center bg-fixed'   style={{backgroundImage: `url("/wallpaper2.jpg")`}}>
        <div className='flex flex-col justify-center items-center gap-4'>
            
            <h1 className='text-center font-bold text-2xl '>Create Account</h1>
            <p className=''>Create an account so you can access our services.</p>
        </div>
        <form onSubmit={handleSubmit} className='form flex flex-col justify-center  gap-4 p-4 max-w-lg mx-auto'>
            <input type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
             className='form-control text-black' 
             placeholder="email" />
            <input type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
             className='form-control text-black' 
             placeholder="password" />
            <input type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
             className='form-control text-black' 
             placeholder="comfirm password" />
            <button type='submit' className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-20 rounded-lg'>Sign up</button>
        <Link href='/login' className='hover:text-green-500 ' >Already have an account?</Link>

        </form>
    </div>
  )
}

export default page