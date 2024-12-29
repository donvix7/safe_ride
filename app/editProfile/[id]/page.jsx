
import Nav from '@/components/nav'
import ProfileForm from '@/components/ProfileForm';
import Image from 'next/image'
import React from 'react'

const page = async ({params}) => {

    const {id} = params;
    const getProfile = async () => {

        const response = await fetch(`http://localhost:3000/api/user/${id}`)
        const data = await response.json();
        return data;
    }

    const user = await getProfile();
    console.log(user.user);
  return (
    <div className=" flex flex-col gap-4 bg-blue-950 bg-cover bg-no-repeat bg-center bg-fixed"   style={{backgroundImage: `url("/wallpaper2.jpg")`}}>
    <Nav/>
    <ProfileForm email={user.user.email} name={user.user.name} phone={user.user.phone} address={user.user.address} city={user.user.city} state={user.user.state}/>
    </div>
  )
}

export default page