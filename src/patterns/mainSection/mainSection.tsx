import Image from 'next/image'
import React from 'react'
import homeBg from '~/img/rockstorebg.png'
import palheta from '~/img/palheta.png'
import { MyCarousel } from '@/components/carousel'

export default function MainSection() {
  return (
    <div className='w-full h-[600px] relative bg-red-500'>
      <Image className='w-full h-full object-cover absolute' priority src={homeBg} alt="Rock 'N' Roll Store background" fill/>
      <div className="relative h-full flex flex-col justify-center gap-5 items-center">
        <MyCarousel/>
      </div>
    </div>
  )
}
