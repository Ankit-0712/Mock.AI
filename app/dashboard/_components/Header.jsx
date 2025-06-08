"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'

function Header() {
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, []);

  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-md'>
      <Image src={'/logo.svg'} width={160} height={100} alt='logo' />
      <ul className='hidden md:flex gap-6'>
        <li>
          <Link
            href="/dashboard"
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path === '/dashboard' ? 'text-primary font-bold' : ''
            }`}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/Question"
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path === '/dashboard/Questions' ? 'text-primary font-bold' : ''
            }`}
          >
            Questions
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/upgrade"
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path === '/dashboard/upgrade' ? 'text-primary font-bold' : ''
            }`}
          >
            Upgrade
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/howItWorks"
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path === '/dashboard/howItWorks' ? 'text-primary font-bold' : ''
            }`}
          >
            How it Works?
          </Link>
        </li>
      </ul>
      <UserButton />
    </div>
  )
}

export default Header
