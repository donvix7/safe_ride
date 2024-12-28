import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Nav = () => {
  return (
    <nav className='bg-blue-800 text-white flex justify-between items-center py-4 px-8 text-sm'>

      <Link href="/">
        <Image src="/safe.png" alt="logo" height={100} width={100} />

      </Link>
        
      <Link className='font-bold text-xl'href="/api/auth/signout">Sign out</Link>

    </nav>
  )
}

export default Nav