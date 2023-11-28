import Image from 'next/image'
import React from 'react'
import homeBg from '~/img/rockstorebg.png'
import { Carousel } from '@/components/carousel/carousel'

export default function MainSection() {
  return (
    <div className='w-full h-[700px] relative pb-10 flex justify-center items-center'>
      <Image className='w-full h-full object-fill absolute' priority src={homeBg} alt="Rock 'N' Roll Store background" fill/>
      <div className="relative w-full flex flex-col justify-center gap-5 items-center py-5">
        <Carousel/>
      </div>
    </div>
  )
}
