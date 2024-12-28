"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {

    const [plateNumber, setPlateNumber] = useState('');
    const [driverName, setDriverName] = useState('');
    const [driverContact, setDriverContact] = useState('');
    const [route, setRoute] = useState('');
    const [model, setModel] = useState('');

    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!plateNumber || !driverName || !driverContact || !route || !model) {
            alert('Please fill all fields');
            return;
        }

        try{
            const response = await fetch('http://localhost:3000/api/post', {  
                method: 'POST',  
                headers: {  
                    'Content-Type': 'application/json'  
                },
                body: JSON.stringify({
                    plateNumber,
                    driverName,
                    driverContact,
                    route,
                    model
                })
                
            });

            if(response.ok){
                alert('Vehicle added successfully');
                router.push('/');
            }
            else{
                alert('Error adding vehicle');
            }
        }
        catch(error){
            console.log(error);
        }

        // add vehicle to database
        
        
    }
  return (
    <form className='form mt-5 flex flex-col gap-3'
        onSubmit={handleSubmit}>
        <h2 className='text-2xl font-bold'>Add Vehicle</h2>
        <input 
        value={plateNumber}
        onChange={(e) => setPlateNumber(e.target.value)}
        type="text" className='form-control' placeholder='Enter Vehicle plate number'/>
        <input 
        value={driverName}
        onChange={(e) => setDriverName(e.target.value)} 
        type="text" className='form-control' placeholder='Enter Vehicle driver name'/>
        <input 
        value={driverContact}
        onChange={(e) => setDriverContact(e.target.value)} 
        type="text" className='form-control' placeholder='Enter Vehicle driver contact'/>
        <input 
        value={route}
        onChange={(e) => setRoute(e.target.value)} 
        type="text" className='form-control' placeholder='Enter Vehicle route'/>
        <input 
        value={model}
        onChange={(e) => setModel(e.target.value)} 
        type="text" className='form-control' placeholder='Enter Vehicle model'/>

        <button type='submit' className='btn btn-primary w-fit'>Add Vehicle</button>
    </form>
  )
}

export default page