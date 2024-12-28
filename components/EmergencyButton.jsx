"use client"

import { useRouter } from 'next/navigation';
import React from 'react';

const EmergencyButton = ({user, id}) => {

    const router = useRouter();
    const plateNumber = id;
    const handleClick = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/emergency', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: user,
                    plateNumber: plateNumber
                })
            
            });
            if(res.ok) {

                alert('Emergency button pressed');
                router.push('/driverProfile');
            }

        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <button 
            type="button" 
            id='Btn'  
            className="fixed z-50 top-0 right-0 mt-4 mr-4 bg-red-500 text-white font-bold p-4 rounded"
            onClick={handleClick} // Use onClick directly
        >
            Emergency Button
        </button>
    );
}

export default EmergencyButton;
