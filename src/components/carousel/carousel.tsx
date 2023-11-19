'use client'

import useEmblaCarousel from "embla-carousel-react"
import { EmblaCarouselType } from "embla-carousel-react"
import Image from "next/image"
import Autoplay from 'embla-carousel-autoplay'

import imageOne from '~/img/gunsNRosesShirt.png'
import imageTwo from '~/img/slipknotShirt.png'
import imageThree from '~/img/ledZeppelinShirt.png'
import { useCallback, useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import plugin from "tailwindcss"

export function Carousel() {
    const [ emblaRef, emblaApi ] = useEmblaCarousel({loop: true}, [Autoplay({stopOnInteraction: false})])
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    const scrollTo = useCallback(
        (index: number) => emblaApi && emblaApi.scrollTo(index),
        [emblaApi]
      )

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [])

    const onInit = useCallback((emblaApi: EmblaCarouselType) => {
        setScrollSnaps(emblaApi.scrollSnapList())
    }, [])

    useEffect(() => {
        if (!emblaApi) return
    
        onInit(emblaApi)
        onSelect(emblaApi)
        emblaApi.on('reInit', onInit)
        emblaApi.on('reInit', onSelect)
        emblaApi.on('select', onSelect)
      }, [emblaApi, onInit, onSelect])

      console.log(selectedIndex)
    return(
        <>
            <div className="embla overflow-hidden w-full h-[300px]" ref={emblaRef}>
                <div className="embla__container flex h-full">
                    <div className="embla__slide relative w-full h-full min-w-full">
                        <Image src={imageOne} alt="banner carousel" fill/>
                    </div>
                    <div className="embla__slide relative  w-full h-full min-w-full">
                        <Image src={imageTwo} alt="banner carousel" fill/>
                    </div>
                    <div className="embla__slide relative  w-full h-full min-w-full">
                        <Image src={imageThree} alt="banner carousel" fill/>
                    </div>
                </div>
            </div>
            <div className="embla__dots w-full flex justify-center gap-2">
                {scrollSnaps.map((_, index) => {
                    console.log(index, selectedIndex)
                    return (
                        <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={twMerge('embla__dot w-8 h-2 rounded-md bg-project-secondary-400', `${index === selectedIndex ? 'embla__dot--selected bg-project-primary-500' : ''}`)}
                        />
                    )
                })}
            </div>
        </>
    )
}