import Nav from '@/components/nav'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className=" flex flex-col gap-4 bg-blue-950 bg-cover bg-no-repeat bg-center bg-fixed"   style={{backgroundImage: `url("/wallpaper2.jpg")`}}>
    <Nav/>
        
        <form action="" className="form flex flex-col p-8 max-w-lg mx-auto">
            
            <div className='flex justify-center items-center gap-2 flex-col'>
                <div className='rounded-full bg-white w-40 h-40 flex justify-center items-center'>

                </div>
            
                <input type="file"  className='text-white text-sm font-bold bg-tramsparent border-none rounded-lg w-fit px-20 py-2 '/>
            </div>
            <div className='flex justify-between gap-4 '>
                <div>
                    <label
                    className='text-white text-sm font-bold'>
                        Surname:</label>    
                    <input 
                    type="text" 
                    name="name" 
                    placeholder="surname" 
                    className='form-control  text-white bg-transparent'/>
                    
                </div>
                <div>
                    <label
                    className='text-white text-sm font-bold'>Other name:</label>    
                    <input 
                    type="text" 
                    name="name" 
                    placeholder="other name" 
                    className='form-control  text-white bg-transparent'/>
                
                </div>
            </div>
            <br/>
            <label
            className='text-white text-sm font-bold'>Email:</label>    
            <input 
            type="email" 
            name="email"
            placeholder="Email" 
            className='form-control text-white bg-transparent'/>
            <br />
            <label
            className='text-white text-sm font-bold'>Phone:</label>    
            <input 
            type="tel" 
            name="phone"
            placeholder="Phone number e.g. 0712345678" 
            className='form-control  text-white bg-transparent'/>
            <br />
            <label
            className='text-white text-sm font-bold bg-transparent'>
                Address:</label>    
            <input 
            type="text" 
            name="address"
            placeholder="Address"
            className='form-control  text-white bg-transparent'/>
            <br />
            <label
            className='text-white text-sm font-bold bg-transparent'>
                City:</label>    
            <input 
            type="text" 
            name="city" 
            placeholder="City" 
            className='form-control  text-white bg-transparent'/>
            <br />
            <label 
            className='text-white text-sm font-bold bg-transparent'>
                State:</label>    
            <input 
            type="text" 
            name="state"
            placeholder="State" 
            className='form-control  text-white bg-transparent'/>
            <br />
           < button type="submit" className=" w-full m-auto bg-yellow-500 text-white rounded-lg py-2 ">Update</button>
        </form>
    </div>
  )
}

export default page