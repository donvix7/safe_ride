
import { NextAuthOptions } from '@/app/api/auth/[...nextauth]/options'
import PageCard from '@/components/pageCard'
import { getServerSession } from 'next-auth'
import React from 'react'
import Preload from '../components/preload'

const page = async () => {
    const session = await getServerSession(NextAuthOptions)
  return (
    <>
    {
        session? (
            
            <PageCard user={session.user.name} userId={session.user._id} pageType="home" />
               
        ) : (
            <Preload/>
        )
    }

    </>
  )
}

export default page