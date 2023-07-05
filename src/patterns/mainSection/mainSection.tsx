import Image from 'next/image'
import React from 'react'
import homeBg from '~/img/rockstorebg.png'
import palheta from '~/img/palheta.png'

export default function MainSection() {
  return (
    <div className='w-full h-[600px] relative bg-red-500'>
      <Image className='w-full h-full object-cover absolute' priority src={homeBg} alt="Rock 'N' Roll Store background" fill/>
      <div className="relative h-full flex flex-col justify-around items-center">
        <h1 className="text-Project-red-fist text-[2.5rem] font-rock maintitle text-center ">Rock &#39;N&#39; Roll Store</h1>
        <Image src={palheta} alt="palheta" className="w-24 h-24"/>
      </div>
    </div>
  )
}
