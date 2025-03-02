import React from 'react'
import Link from 'next/link'
const Navbar = () => {
  return (
    <div className='nav-holder'>
      <div className='nav-wrapper'>
        <div><Link href='/home'>logo</Link></div>
        <div className='links'>
            <div><Link href='/blog'>Blog</Link></div>
            <div><Link href='/product'>Product</Link></div>
            <div><Link href='/contact'>Contact</Link></div>
            <div><Link href='/about'>About</Link></div>
            <div><Link href='/login'>Login</Link></div>
            <div><Link href='/signup'>Signup</Link></div>
        </div>
      </div>
    </div>
  )
}

export default Navbar