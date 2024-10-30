"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';


function Headers() {

    return (
        <div className='flex items-center justify-between p-6 mt-2 shadow-sm border-tertiary md:px-20'>
            <div>
                <Link href={'/'}><Image src='/logo.webp' alt='logo' width={200} height={50} /></Link>
            </div>            
        </div>
    )
}

export default Headers;