"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useReducer, useState } from "react";

export default function ProfileForm({ nextOfKin, profileImage, email, name, phone, address, city, state}) {
    
    const {data:session} = useSession();
    
    const [newName, setNewName] = useState(name);
    const [newEmail, setNewEmail] = useState(email);
    const [newPhone, setNewPhone] = useState(phone);
    const [newAddress, setNewAddress] = useState(address);
    const [newCity, setNewCity] = useState(city);
    const [newState, setNewState] = useState(state);
    const [newNextOfKin, setNewNextOfKin] = useState(nextOfKin);

    const [image, setImage] = useState(profileImage);
    const [error, setError] = useState('');

    const router = useRouter();
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(image);
    try {


      const res = await fetch(`http://localhost:3000/api/user/${email}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            },
          body: JSON.stringify({
            image :image.name,
            newName,
            newEmail,
            newPhone,
            newAddress,
            newCity,  
            newState,
            newNextOfKin
          })
        }
      )
      if(res.ok) {
        router.refresh();
      }
      }
      catch {
        console.log(error);
      }
    }

  return (
    
    <form action="" onSubmit={handleSubmit} className="form flex flex-col p-8 max-w-lg mx-auto">
            
    <div className='flex justify-center items-center gap-2 flex-col'>
        <div className='rounded-full w-40 h-40 flex justify-center items-center'>
            <Image src={`/${profileImage}`} alt="profile" width={100} height={100} />
        </div>
    
        <input type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className='form-control  text-white bg-transparent'/>
    </div>
    <div className='flex justify-between gap-4 '>
        <div>
            <label
            className='text-white text-sm font-bold'>Surname:</label>    
            <input 
            type="text" 
            name="name" 
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder={"surname" }
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
    value={newEmail}
    onChange={(e) => setNewEmail(e.target.value)}
    placeholder="Email" 
    className='form-control text-white bg-transparent'/>
    <br />
    <label
    className='text-white text-sm font-bold'>Phone:</label>    
    <input 
    type="tel" 
    name="phone"
    value={newPhone}
    onChange={(e) => setNewPhone(e.target.value)}
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
    value={newAddress}
    onChange={(e) => setNewAddress(e.target.value)}
    className='form-control  text-white bg-transparent'/>
    <br />
    <label
    className='text-white text-sm font-bold bg-transparent'>
        City:</label>    
    <input 
    type="text" 
    name="city" 
    placeholder="City" 
    value={newCity}
    onChange={(e) => setNewCity(e.target.value)}
    className='form-control  text-white bg-transparent'/>
    <br />
    <label 
    className='text-white text-sm font-bold bg-transparent'>
        State:</label>    
    <input 
    type="text" 
    name="state"
    placeholder="State" 
    value={newState}
    onChange={(e) => setNewState(e.target.value)}
    className='form-control  text-white bg-transparent'/>
    <br />
    <label 
    className='text-white text-sm font-bold bg-transparent'>
        NextOfKin:</label>    
    <input 
    type="text" 
    name="state"
    placeholder="email of next of kin" 
    value={newNextOfKin}

    onChange={(e) => setNewNextOfKin(e.target.value)}
    className='form-control  text-white bg-transparent'/>
    <br />
   < button type="submit" className=" w-full m-auto bg-yellow-500 text-white rounded-lg py-2 ">Update</button>
</form>
  );
}