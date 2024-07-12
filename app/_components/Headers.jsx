"use client"
import React from 'react'
import { SignedIn, SignedOut, UserButton, useUser, isSignedIn } from '@clerk/clerk-react'
import Image from 'next/image'
import Link from 'next/link';


function Headers() {
    const {user, isSignedIn} = useUser();

    return (
        <div className='flex items-center justify-between p-6 mt-2 shadow-sm border-tertiary md:px-20'>
            <div>
                <Link href={'/'}><Image src='/logo.png' alt='logo' width={200} height={50} /></Link>
            </div>
           <div>
                {isSignedIn ? 
                <SignedIn>
                     <UserButton />
                </SignedIn>
                :
                <div className='flex gap-6'>
                <Link href={'/sign-up'}><h2 className='p-2 border border-orange-300 rounded-md cursor-pointer hover:bg-primary hover:text-white hover:scale-110'>Register</h2></Link>
                <Link href={'/sign-in'}><h2 className='p-2 border border-orange-300 rounded-md cursor-pointer hover:bg-primary hover:text-white hover:scale-110'>Login</h2></Link>
                </div>
                }
           </div>
            
        </div>
    )
}

export default Headers;