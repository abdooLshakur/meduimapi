import React from 'react'
import Link from 'next/link'
const notFound = () => {
  return (
    <div className='content-holder'>
        <div>
      <h1>404 || <span>page not found</span></h1>
      <div className='back-home'><Link href='/home'>return home</Link></div>
    </div>
    </div>
  )
}

export default notFound
