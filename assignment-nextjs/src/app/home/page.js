import Image from 'next/image'
import React from 'react'

const homepage = () => {
  return (
    <>
    <div style={{display:"grid", gridTemplateColumns:"repeat(2, 1fr)"}}>
    <Image
      src="/images/dragon-tbrh9smwrlaa1cr9.jpg"
      alt='dragon'
      width={500}
      height={500}
    />
    <Image
      src="/images/duck-px752pz3biq4fs4f.jpg"
      alt='dragon'
      width={500}
      height={500}
    />
    <Image
      src="/images/eagles-zwxgd5a9b2exg53h.jpg"
      alt='dragon'
      width={500}
      height={500}
    />
    <Image
      src="/images/horse-h3azzzaaorg8c9ay.jpg"
      alt='dragon'
      width={500}
      height={500}
    />
    </div>
    <a href="document/resume.pdf" download>download resume</a>
    </>
  )
}

export default homepage
