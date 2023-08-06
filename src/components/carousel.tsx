'use client'

import React, { useEffect } from 'react'
import Image from "next/image";
import shirt1 from "~/img/gunsNRosesShirt.png"
import shirt2 from "~/img/ledZeppelinShirt.png"
import shirt3 from "~/img/pearlJamShirt.png"
import { Carousel } from "@material-tailwind/react"
import seta from '~/img/redArrow.svg'
import { SUPABASE } from '../../utils/supabase';
import { useSession } from 'next-auth/react';
import { createClient } from '@supabase/supabase-js';

const SUPABASEURL = process.env.SUPABASE_URL ?? ''
const SUPABASEANONKEY = process.env.SUPABASE_ANON_KEY ?? ''

export function MyCarousel() {
  const { data: session, status} = useSession()

  async function getUserData(){
    if(session != undefined && status === 'authenticated') {
      console.log(status)
      const { supabaseAccessToken }: any = session
      if(supabaseAccessToken != null && supabaseAccessToken != undefined) {
        const SUPABASECLIENT = createClient(SUPABASEURL, SUPABASEANONKEY, {global: {headers: {Authorization: `Bearer ${supabaseAccessToken}`}}})
        await SUPABASECLIENT
        .from('users')
        .select('*')
        .then(({data})=> console.log(data, 'console no componenteeeeeeeeeeaeeeeaaaeee'))
      }
    }
  }

  useEffect(()=> {
    getUserData()
    console.log(session)
  },[session, status])


  return (
    <>
        <Carousel
            className="h-[400px] overflow-hidden"
            autoplay
            loop
            prevArrow={({ handlePrev }) => (
                <button
                  onClick={handlePrev}
                  className="w-12 h-12 !absolute top-2/4 -translate-y-2/4 left-4"
                >
                  <Image src={seta} alt='seta' fill />
                </button>
              )}
            nextArrow={({ handleNext }) => (
                <button
                  onClick={handleNext}
                  className="w-12 h-12 !absolute top-2/4 -translate-y-2/4 right-4 rotate-180"
                >
                  <Image src={seta} alt='seta' fill />
                </button>
              )}
            navigation={({ setActiveIndex, activeIndex, length }) => (
              <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                {new Array(length).fill("").map((_, i) => (
                  <span
                    key={i}
                    className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] outline ${
                      activeIndex === i ? "bg-Project-red-fist w-8" : "bg-Project-white w-4"
                    }`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            )}
          >
            <div className='w-full h-full relative'>
                <Image className='object-contain' src={shirt1} alt="camisa" fill/>
            </div>
            <div className='w-full h-full relative'>
                <Image className='object-contain' src={shirt2} alt="camisa" fill/>
            </div>
            <div className='w-full h-full relative'>
                <Image className='object-contain' src={shirt3} alt="camisa" fill/>
            </div>
          </Carousel>
    </>
  )
}
